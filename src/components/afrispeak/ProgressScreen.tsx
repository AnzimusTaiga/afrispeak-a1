// ============================================================
// AfriSpeak A1 - ProgressScreen Component
// Shows user stats, achievements, XP progress, streak info
// ============================================================

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import type { User, Lesson } from "@/lib/types"
import {
  Star,
  Flame,
  Trophy,
  Target,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  Zap,
} from "lucide-react"

interface UserStatsData {
  totalLessons: number
  completedLessons: number
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  nextLevelXP: number
}

export function ProgressScreen() {
  const { user, setUser, lessons, setLessons, lessonsProgress, setLessonsProgress, setLoading } =
    useAppStore()
  const [stats, setStats] = useState<UserStatsData | null>(null)

  // Load fresh data
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const res = await fetch("/api/user?userId=guest-default")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setStats(data.stats)
        }

        // Also refresh lessons
        const lessonsRes = await fetch("/api/lessons?userId=guest-default")
        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json()
          setLessons(lessonsData.lessons as Lesson[])
          const progressMap: Record<string, any> = {}
          for (const lesson of lessonsData.lessons) {
            if (lesson.progress) {
              progressMap[lesson.id] = lesson.progress
            }
          }
          setLessonsProgress(progressMap)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Calculate XP progress
  const currentLevelXP = user ? Math.floor((user.level - 1) * user.level * 50) : 0
  const nextLevelXP = stats?.nextLevelXP || (user ? user.level * (user.level + 1) * 50 : 100)
  const xpInLevel = (user?.xp || 0) - currentLevelXP
  const xpNeeded = nextLevelXP - currentLevelXP
  const xpPercent = Math.min((xpInLevel / xpNeeded) * 100, 100)

  const completedCount = Object.values(lessonsProgress).filter((p) => p.completed).length
  const totalLessons = lessons.length
  const avgScore = Object.values(lessonsProgress).length > 0
    ? Math.round(
        Object.values(lessonsProgress).reduce((sum, p) => sum + p.bestScore, 0) /
          Object.values(lessonsProgress).length
      )
    : 0

  // Achievement levels
  const achievements = [
    {
      icon: "🌱",
      title: "First Steps",
      desc: "Complete your first lesson",
      unlocked: completedCount >= 1,
    },
    {
      icon: "📚",
      title: "Bookworm",
      desc: "Complete 3 lessons",
      unlocked: completedCount >= 3,
    },
    {
      icon: "🔥",
      title: "On Fire",
      desc: "Reach a 3-day streak",
      unlocked: (user?.currentStreak || 0) >= 3,
    },
    {
      icon: "⭐",
      title: "High Scorer",
      desc: "Get 100% on any lesson",
      unlocked: Object.values(lessonsProgress).some((p) => p.bestScore === 100),
    },
    {
      icon: "🏆",
      title: "Champion",
      desc: "Complete 5 lessons",
      unlocked: completedCount >= 5,
    },
    {
      icon: "🎯",
      title: "Perfectionist",
      desc: "Get 100% on 3 lessons",
      unlocked: Object.values(lessonsProgress).filter((p) => p.bestScore === 100).length >= 3,
    },
  ]

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

  return (
    <div className="pb-24">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-br from-amber-500 to-orange-600 px-5 pt-6 pb-8 rounded-b-3xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Your Progress 📊</h1>
            <p className="text-amber-100 text-sm mt-0.5">Keep learning every day!</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Trophy size={28} className="text-white" />
          </div>
        </div>

        {/* Level Display */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-yellow-300" />
              <span className="text-white font-bold text-lg">Level {user?.level || 1}</span>
            </div>
            <span className="text-amber-100 text-sm">
              {xpInLevel} / {xpNeeded} XP
            </span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-white rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="px-5 mt-4 grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star size={16} className="text-yellow-500" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Total XP</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user?.xp || 0}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame size={16} className="text-orange-500" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Current Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user?.currentStreak || 0} days</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-green-500" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {completedCount}<span className="text-sm font-normal text-gray-400">/{totalLessons}</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp size={16} className="text-blue-500" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Avg. Score</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
        </motion.div>
      </motion.div>

      {/* Lesson Progress Overview */}
      <motion.div
        className="px-5 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen size={14} />
          Lesson Progress
        </h2>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-green-600">
              {Math.round((completedCount / totalLessons) * 100)}%
            </span>
          </div>
          <div className="bg-gray-100 rounded-full h-4 overflow-hidden mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalLessons) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Individual Lesson Scores */}
          <div className="space-y-2">
            {lessons.map((lesson) => {
              const progress = lessonsProgress[lesson.id]
              return (
                <div key={lesson.id} className="flex items-center gap-3">
                  <span className="text-lg w-7 text-center">{lesson.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{lesson.title}</p>
                    <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mt-0.5">
                      <div
                        className={`rounded-full h-full transition-all duration-500 ${
                          progress?.completed
                            ? "bg-green-500"
                            : progress
                            ? "bg-yellow-400"
                            : "bg-gray-300"
                        }`}
                        style={{ width: `${progress?.score || 0}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 w-8 text-right">
                    {progress?.score || 0}%
                  </span>
                  {progress?.completed && <CheckCircle2 size={14} className="text-green-500" />}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="px-5 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award size={14} />
          Achievements
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`rounded-2xl p-4 text-center border transition-all ${
                achievement.unlocked
                  ? "bg-white shadow-sm border-yellow-200"
                  : "bg-gray-50 border-gray-100 opacity-60"
              }`}
            >
              <div className={`text-3xl mb-2 ${!achievement.unlocked ? "grayscale" : ""}`}>
                {achievement.icon}
              </div>
              <p className="text-sm font-bold text-gray-900">{achievement.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{achievement.desc}</p>
              {achievement.unlocked && (
                <p className="text-xs text-green-600 font-medium mt-1">✅ Unlocked</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Best Streak */}
      <motion.div
        className="px-5 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Longest Streak</p>
              <p className="text-xs text-gray-500">
                {user?.longestStreak || 0} days 🔥 — {(user?.currentStreak || 0) >= 3 ? "Amazing consistency!" : "Keep it going!"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
