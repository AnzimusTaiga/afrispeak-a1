// ============================================================
// AfriSpeak A1 - TypeScript Type Definitions
// ============================================================

// --- Lesson Types ---

export interface Vocabulary {
  id: string
  word: string
  translation: string
  pronunciation: string
  example: string
  lessonId: string
  order: number
}

export interface ExampleSentence {
  id: string
  english: string
  context: string
  lessonId: string
  order: number
}

export interface Exercise {
  id: string
  type: "multiple_choice" | "tap_to_select" | "listen_repeat"
  question: string
  options: string[]
  correctAnswer: string
  hint: string
  audioText: string
  lessonId: string
  order: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  topic: string
  icon: string
  color: string
  order: number
  xpReward: number
  vocabulary?: Vocabulary[]
  sentences?: ExampleSentence[]
  exercises?: Exercise[]
  // Progress info (joined from API)
  progress?: LessonProgress
}

export interface LessonSummary {
  id: string
  title: string
  description: string
  topic: string
  icon: string
  color: string
  order: number
  xpReward: number
  progress?: LessonProgress
}

// --- User Types ---

export interface LessonProgress {
  id?: string
  userId?: string
  lessonId: string
  completed: boolean
  score: number
  xpEarned: number
  attempts: number
  bestScore: number
  completedAt?: string
}

export interface User {
  id: string
  name: string
  email: string | null
  isGuest: boolean
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
}

export interface UserStats {
  user: User
  totalLessons: number
  completedLessons: number
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  nextLevelXP: number
}

// --- App Navigation ---

export type AppScreen = "home" | "lesson" | "exercise" | "progress"

// --- Exercise State ---

export interface ExerciseState {
  currentIndex: number
  answers: { exerciseId: string; selectedAnswer: string; isCorrect: boolean }[]
  isCompleted: boolean
  score: number
}
