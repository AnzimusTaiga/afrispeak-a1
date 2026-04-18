// ============================================================
// AfriSpeak A1 - Zustand State Store
// Manages all client-side application state
// ============================================================

import { create } from "zustand"
import type { AppScreen, Lesson, LessonProgress, User, ExerciseState } from "@/lib/types"

// --- Offline Cache Keys ---
const CACHE_KEY = "afrispeak_cache"
const USER_CACHE_KEY = "afrispeak_user"
const PROGRESS_CACHE_KEY = "afrispeak_progress"
const LESSONS_CACHE_KEY = "afrispeak_lessons"

interface AppState {
  // --- Navigation ---
  currentScreen: AppScreen
  previousScreen: AppScreen | null
  navigate: (screen: AppScreen) => void
  goBack: () => void

  // --- Current Lesson ---
  currentLesson: Lesson | null
  currentLessonId: string | null
  setCurrentLesson: (lesson: Lesson) => void
  clearCurrentLesson: () => void

  // --- Exercise State ---
  exerciseState: ExerciseState
  setExerciseAnswer: (exerciseId: string, selectedAnswer: string, isCorrect: boolean) => void
  nextExercise: () => void
  resetExerciseState: (totalExercises: number) => void

  // --- Lesson Progress ---
  lessonsProgress: Record<string, LessonProgress>
  setLessonsProgress: (progress: Record<string, LessonProgress>) => void
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void

  // --- User Data ---
  user: User | null
  setUser: (user: User) => void
  addXP: (amount: number) => void

  // --- Lessons List ---
  lessons: Lesson[]
  setLessons: (lessons: Lesson[]) => void

  // --- Loading States ---
  isLoading: boolean
  setLoading: (loading: boolean) => void

  // --- Celebration ---
  showCelebration: boolean
  celebrationMessage: string
  celebrationXP: number
  triggerCelebration: (message: string, xp: number) => void
  dismissCelebration: () => void

  // --- Coach Anzimus ---
  coachContext: string
  coachVisible: boolean
  setCoachContext: (context: string) => void
  showCoach: (context: string) => void
  hideCoach: () => void

  // --- Audio ---
  currentlyPlaying: string | null
  setCurrentlyPlaying: (id: string | null) => void

  // --- Offline Cache ---
  saveToCache: () => void
  loadFromCache: () => boolean
}

const defaultExerciseState: ExerciseState = {
  currentIndex: 0,
  answers: [],
  isCompleted: false,
  score: 0,
}

export const useAppStore = create<AppState>((set, get) => ({
  // --- Navigation ---
  currentScreen: "home",
  previousScreen: null,
  navigate: (screen) =>
    set((state) => ({
      currentScreen: screen,
      previousScreen: state.currentScreen,
    })),
  goBack: () =>
    set((state) => {
      if (state.previousScreen) {
        return { currentScreen: state.previousScreen, previousScreen: "home" }
      }
      return { currentScreen: "home", previousScreen: null }
    }),

  // --- Current Lesson ---
  currentLesson: null,
  currentLessonId: null,
  setCurrentLesson: (lesson) =>
    set({ currentLesson: lesson, currentLessonId: lesson.id }),
  clearCurrentLesson: () =>
    set({ currentLesson: null, currentLessonId: null }),

  // --- Exercise State ---
  exerciseState: { ...defaultExerciseState },
  setExerciseAnswer: (exerciseId, selectedAnswer, isCorrect) =>
    set((state) => {
      const newAnswers = [
        ...state.exerciseState.answers,
        { exerciseId, selectedAnswer, isCorrect },
      ]
      const correctCount = newAnswers.filter((a) => a.isCorrect).length
      const score = Math.round((correctCount / newAnswers.length) * 100)
      return {
        exerciseState: {
          ...state.exerciseState,
          answers: newAnswers,
          score,
        },
      }
    }),
  nextExercise: () =>
    set((state) => {
      const lesson = state.currentLesson
      if (!lesson?.exercises) return state
      const nextIndex = state.exerciseState.currentIndex + 1
      const isCompleted = nextIndex >= lesson.exercises.length
      return {
        exerciseState: {
          ...state.exerciseState,
          currentIndex: nextIndex,
          isCompleted,
        },
      }
    }),
  resetExerciseState: () =>
    set({ exerciseState: { ...defaultExerciseState } }),

  // --- Lesson Progress ---
  lessonsProgress: {},
  setLessonsProgress: (progress) => set({ lessonsProgress: progress }),
  updateLessonProgress: (lessonId, progress) =>
    set((state) => ({
      lessonsProgress: {
        ...state.lessonsProgress,
        [lessonId]: {
          ...(state.lessonsProgress[lessonId] || {
            lessonId,
            completed: false,
            score: 0,
            xpEarned: 0,
            attempts: 0,
            bestScore: 0,
          }),
          ...progress,
        },
      },
    })),

  // --- User Data ---
  user: null,
  setUser: (user) => set({ user }),
  addXP: (amount) =>
    set((state) => {
      if (!state.user) return state
      const newXP = state.user.xp + amount
      // Level formula: each level needs level * 100 XP
      let newLevel = state.user.level
      let xpForLevel = newLevel * 100
      while (newXP >= xpForLevel) {
        newLevel++
        xpForLevel = newLevel * 100
      }
      // Update streak
      const today = new Date().toISOString().split("T")[0]
      const lastActive = state.user.lastActiveDate
        ? new Date(state.user.lastActiveDate).toISOString().split("T")[0]
        : null
      let newStreak = state.user.currentStreak
      if (lastActive !== today) {
        // Check if yesterday was active
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split("T")[0]
        if (lastActive === yesterdayStr) {
          newStreak++
        } else if (lastActive !== today) {
          newStreak = 1 // Reset streak
        }
      }
      const newLongest = Math.max(newStreak, state.user.longestStreak)
      return {
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel,
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActiveDate: new Date().toISOString(),
        },
      }
    }),

  // --- Lessons List ---
  lessons: [],
  setLessons: (lessons) => set({ lessons }),

  // --- Loading ---
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // --- Celebration ---
  showCelebration: false,
  celebrationMessage: "",
  celebrationXP: 0,
  triggerCelebration: (message, xp) =>
    set({ showCelebration: true, celebrationMessage: message, celebrationXP: xp }),
  dismissCelebration: () =>
    set({ showCelebration: false, celebrationMessage: "", celebrationXP: 0 }),

  // --- Coach Anzimus ---
  coachContext: "daily_welcome",
  coachVisible: false,
  setCoachContext: (context) => set({ coachContext: context }),
  showCoach: (context) => set({ coachContext: context, coachVisible: true }),
  hideCoach: () => set({ coachVisible: false }),

  // --- Audio ---
  currentlyPlaying: null,
  setCurrentlyPlaying: (id) => set({ currentlyPlaying: id }),

  // --- Offline Cache ---
  saveToCache: () => {
    try {
      const state = get()
      const cacheData = {
        lessons: state.lessons,
        user: state.user,
        lessonsProgress: state.lessonsProgress,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
      localStorage.setItem(LESSONS_CACHE_KEY, JSON.stringify(state.lessons))
      if (state.user) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(state.user))
      localStorage.setItem(PROGRESS_CACHE_KEY, JSON.stringify(state.lessonsProgress))
    } catch (e) {
      console.warn("Failed to save to cache:", e)
    }
  },
  loadFromCache: () => {
    try {
      const lessonsStr = localStorage.getItem(LESSONS_CACHE_KEY)
      const userStr = localStorage.getItem(USER_CACHE_KEY)
      const progressStr = localStorage.getItem(PROGRESS_CACHE_KEY)
      if (lessonsStr) set({ lessons: JSON.parse(lessonsStr) })
      if (userStr) set({ user: JSON.parse(userStr) })
      if (progressStr) set({ lessonsProgress: JSON.parse(progressStr) })
      return true
    } catch (e) {
      console.warn("Failed to load from cache:", e)
      return false
    }
  },
}))
