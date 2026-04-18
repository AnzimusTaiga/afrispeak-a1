// ============================================================
// AfriSpeak A1 - HomeScreen Component
// Displays lesson cards, streak, XP, and welcome message
// ============================================================

"use client"

import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import {
  BookOpen,
  Flame,
  Star,
  Lock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"
import type { LessonSummary } from "@/lib/types"
import { CoachAnzimus } from "./CoachAnzimus"

// Topic colors for visual variety
const TOPIC_COLORS: Record<string, string> = {
  "Everyday Basics": "from-green-400 to-emerald-500",
  Shopping: "from-orange-400 to-amber-500",
  Family: "from-purple-400 to-violet-500",
  Basics: "from-blue-400 to-cyan-500",
  Education: "from-red-400 to-rose-500",
  Health: "from-teal-400 to-cyan-500",
  "Getting Around": "from-pink-400 to-fuchsia-500",
  Food: "from-yellow-400 to-orange-500",
  Time: "from-gray-400 to-slate-500",
}

export function HomeScreen() {
  const { lessons, setLessons, lessonsProgress, setLessonsProgress, user, setUser, navigate, isLoading, setLoading } =
    useAppStore()
  const [isHydrated, setIsHydrated] = useState(false)

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Try loading from cache first for offline support
        const hasCache = useAppStore.getState().loadFromCache()

        // Then fetch fresh data from API
        const [lessonsRes, userRes] = await Promise.all([
          fetch("/api/lessons?userId=guest-default"),
          fetch("/api/user?userId=guest-default"),
        ])

        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json()
          setLessons(lessonsData.lessons as LessonSummary[])

          // Build progress map
          const progressMap: Record<string, any> = {}
          for (const lesson of lessonsData.lessons) {
            if (lesson.progress) {
              progressMap[lesson.id] = lesson.progress
            }
          }
          setLessonsProgress(progressMap)
        }

        if (userRes.ok) {
          const userData = await userRes.json()
          setUser(userData.user)
        }

        // Save to cache
        useAppStore.getState().saveToCache()
      } catch (error) {
        console.warn("Failed to fetch data, using cache if available")
        useAppStore.getState().loadFromCache()
      } finally {
        setLoading(false)
      }
      setIsHydrated(true)
    }
    loadData()
  }, [])

  // Group lessons by topic
  const lessonsByTopic = lessons.reduce<Record<string, LessonSummary[]>>((acc, lesson) => {
    const topic = lesson.topic || "Other"
    if (!acc[topic]) acc[topic] = []
    acc[topic].push(lesson)
    return acc
  }, {})

  // Calculate next level XP
  const currentLevelXP = user ? (user.level - 1) * user.level * 50 : 0
  const nextLevelXP = user ? user.level * (user.level + 1) * 50 : 100
  const xpProgress = user ? ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 0

  // Check if lesson is unlocked (previous lesson completed or first lesson)
  const isLessonUnlocked = (lesson: LessonSummary, index: number) => {
    if (index === 0) return true
    const prevLesson = lessons[index - 1]
    if (!prevLesson) return true
    return !!lessonsProgress[prevLesson.id]?.completed
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Determine coach context based on absence
  const getCoachContext = () => {
    if (!user?.lastActiveDate) return "daily_welcome"
    const lastActive = new Date(user.lastActiveDate)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays >= 7) return "long_absence"
    if (diffDays >= 2) return "welcome_back"
    if (user?.currentStreak && user.currentStreak >= 3) return "streak_celebration"
    return "daily_welcome"
  }

  return (
    <div className="pb-24">
      {/* Header with Welcome */}
      <motion.div
        className="bg-gradient-to-br from-green-500 to-emerald-600 px-5 pt-6 pb-8 rounded-b-3xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">
              {isHydrated ? `Hello, ${user?.name?.split(" ")[0] || "Learner"}! 👋` : "Loading..."}
            </h1>
            <p className="text-green-100 text-sm mt-0.5">Let&apos;s learn English today!</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-200 font-medium">LEVEL</p>
            <p className="text-2xl font-bold text-white">{user?.level || 1}</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 mb-2 overflow-hidden">
          <motion.div
            className="bg-white rounded-full h-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-green-100">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-300 text-yellow-300" />
            {user?.xp || 0} XP
          </span>
          <span>{nextLevelXP - (user?.xp || 0)} XP to Level {user?.level || 1 + 1}</span>
        </div>
      </motion.div>

      <CoachAnzimus
        context={getCoachContext() as any}
        show={isHydrated}
        autoDismiss={12000}
        position="home"
        userData={{
          userName: user?.name || "L'apprenant",
          userLevel: user?.level || 1,
          currentStreak: user?.currentStreak || 0,
          completedLessons: Object.values(lessonsProgress).filter((p) => p.completed).length,
          totalLessons: lessons.length,
          lastActiveDate: user?.lastActiveDate || null,
        }}
      />

      {/* Streak & Stats Row */}
      <motion.div
        className="px-5 mt-4 grid grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-50">
          <div className="w-10 h-10 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-1">
            <Flame size={20} className="text-orange-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">{user?.currentStreak || 0}</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-50">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-1">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {Object.values(lessonsProgress).filter((p) => p.completed).length}
          </p>
          <p className="text-xs text-gray-500">Completed</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-50">
          <div className="w-10 h-10 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-1">
            <Sparkles size={20} className="text-yellow-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">{lessons.length}</p>
          <p className="text-xs text-gray-500">Lessons</p>
        </motion.div>
      </motion.div>

      {/* Lessons by Topic */}
      <div className="px-5 mt-6">
        {Object.entries(lessonsByTopic).map(([topic, topicLessons]) => (
          <div key={topic} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen size={14} />
              {topic}
            </h2>

            <div className="space-y-3">
              {topicLessons.map((lesson) => {
                const lessonIndex = lessons.findIndex((l) => l.id === lesson.id)
                const isUnlocked = isLessonUnlocked(lesson, lessonIndex)
                const progress = lessonsProgress[lesson.id]
                const isCompleted = !!progress?.completed
                const topicGradient = TOPIC_COLORS[topic] || "from-gray-400 to-gray-500"

                return (
                  <motion.button
                    key={lesson.id}
                    onClick={() => {
                      if (!isUnlocked) return
                      navigate("lesson")
                      // We'll fetch full lesson data in LessonDetailScreen
                      // Store the lesson ID for fetching
                      useAppStore.getState().currentLessonId = lesson.id
                    }}
                    disabled={!isUnlocked}
                    className={`w-full bg-white rounded-2xl p-4 shadow-sm border transition-all
                              duration-200 active:scale-[0.98] text-left
                              ${isUnlocked
                                ? "border-gray-100 hover:shadow-md cursor-pointer"
                                : "border-gray-50 opacity-60 cursor-not-allowed"
                              }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lessonIndex * 0.05 }}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      {/* Lesson Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topicGradient}
                                    flex items-center justify-center text-xl flex-shrink-0
                                    ${!isUnlocked ? "grayscale" : ""}`}
                      >
                        {isUnlocked ? lesson.icon : "🔒"}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 truncate text-sm">
                            {lesson.title}
                          </h3>
                          {isCompleted && (
                            <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {lesson.description}
                        </p>

                        {/* Progress Bar */}
                        {progress && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-green-500 rounded-full h-full transition-all duration-500"
                                style={{ width: `${progress.score}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                              {progress.score}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* XP Badge */}
                      <div className="flex-shrink-0 flex items-center gap-1 text-yellow-600">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{lesson.xpReward}</span>
                      </div>

                      {/* Arrow */}
                      {isUnlocked && (
                        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
