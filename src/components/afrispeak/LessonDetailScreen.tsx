// ============================================================
// AfriSpeak A1 - LessonDetailScreen Component
// Shows vocabulary, example sentences, and start exercises button
// ============================================================

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { VocabCard } from "./VocabCard"
import { SentenceCard } from "./SentenceCard"
import { AudioButton } from "./AudioButton"
import type { Lesson } from "@/lib/types"
import {
  ArrowLeft,
  BookOpen,
  MessageCircle,
  PlayCircle,
  Star,
  CheckCircle2,
  RotateCcw,
  Loader2,
} from "lucide-react"
import { useAudio } from "@/hooks/use-audio"

type TabType = "vocabulary" | "sentences" | "exercises"

export function LessonDetailScreen() {
  const {
    currentLessonId,
    currentLesson,
    setCurrentLesson,
    clearCurrentLesson,
    navigate,
    goBack,
    lessonsProgress,
    setLoading,
    isLoading,
  } = useAppStore()

  const [activeTab, setActiveTab] = useState<TabType>("vocabulary")
  const [lessonData, setLessonData] = useState<Lesson | null>(currentLesson)
  const { speak } = useAudio()

  // Fetch full lesson data if not already loaded
  useEffect(() => {
    async function fetchLesson() {
      if (currentLesson?.id === currentLessonId && currentLesson?.vocabulary) {
        setLessonData(currentLesson)
        return
      }

      if (!currentLessonId) return

      setLoading(true)
      try {
        const res = await fetch(`/api/lessons/${currentLessonId}?userId=guest-default`)
        if (res.ok) {
          const data = await res.json()
          setLessonData(data.lesson)
          setCurrentLesson(data.lesson)
        }
      } catch (error) {
        console.error("Failed to fetch lesson:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [currentLessonId])

  const handleBack = () => {
    clearCurrentLesson()
    goBack()
  }

  const startExercises = () => {
    if (lessonData) {
      navigate("exercise")
    }
  }

  const progress = lessonData ? lessonsProgress[lessonData.id] : null
  const isCompleted = !!progress?.completed

  if (!lessonData && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
        <p className="text-gray-500 mb-4">Lesson not found</p>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-green-500 text-white rounded-2xl font-semibold"
        >
          Go Back
        </button>
      </div>
    )
  }

  if (!lessonData || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-green-500 mb-4" />
        <p className="text-gray-500">Loading lesson...</p>
      </div>
    )
  }

  const tabs: { key: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    {
      key: "vocabulary",
      label: "Words",
      icon: <BookOpen size={16} />,
      count: lessonData.vocabulary?.length || 0,
    },
    {
      key: "sentences",
      label: "Sentences",
      icon: <MessageCircle size={16} />,
      count: lessonData.sentences?.length || 0,
    },
    {
      key: "exercises",
      label: "Practice",
      icon: <PlayCircle size={16} />,
      count: lessonData.exercises?.length || 0,
    },
  ]

  return (
    <div className="pb-32">
      {/* Header */}
      <motion.div
        className="px-5 pt-4 pb-4 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={handleBack}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{lessonData.icon}</span>
            <h1 className="text-lg font-bold text-gray-900 truncate">{lessonData.title}</h1>
            {isCompleted && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{lessonData.topic}</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold">{lessonData.xpReward} XP</span>
        </div>
      </motion.div>

      {/* Lesson Description */}
      <motion.div
        className="mx-5 mb-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-sm text-gray-700 leading-relaxed">{lessonData.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <AudioButton text={lessonData.title} id="lesson-title" size="sm" />
          <button
            onClick={() => speak(lessonData.description, "lesson-desc")}
            className="text-xs text-green-600 font-medium"
          >
            Écouter la description
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         text-sm font-medium transition-all duration-200
                         ${activeTab === tab.key
                           ? "bg-white text-green-600 shadow-sm"
                           : "text-gray-500 hover:text-gray-700"
                         }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        className="px-5"
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Vocabulary Tab */}
        {activeTab === "vocabulary" && lessonData.vocabulary && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
              Appuie sur le bouton vert pour entendre chaque mot
            </p>
            {lessonData.vocabulary.map((vocab, i) => (
              <VocabCard key={vocab.id} vocab={vocab} index={i} />
            ))}
          </div>
        )}

        {/* Sentences Tab */}
        {activeTab === "sentences" && lessonData.sentences && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
              Example sentences in context
            </p>
            {lessonData.sentences.map((sentence, i) => (
              <SentenceCard key={sentence.id} sentence={sentence} index={i} />
            ))}
          </div>
        )}

        {/* Exercises Tab */}
        {activeTab === "exercises" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
              <PlayCircle size={48} className="mx-auto text-green-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Practice?</h3>
              <p className="text-sm text-gray-500 mb-1">
                {lessonData.exercises?.length || 0} exercises to complete
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Earn <span className="font-bold text-yellow-600">{lessonData.xpReward} XP</span> on completion
              </p>
              {progress && (
                <div className="flex items-center justify-center gap-3 mb-4 text-sm">
                  <span className="text-gray-500">
                    Best: <span className="font-bold text-green-600">{progress.bestScore}%</span>
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">
                    Attempts: <span className="font-bold">{progress.attempts}</span>
                  </span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={startExercises}
                  className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                             font-bold rounded-2xl text-base shadow-lg hover:shadow-xl
                             active:scale-[0.98] transition-all duration-150"
                >
                  {isCompleted ? (
                    <span className="flex items-center justify-center gap-2">
                      <RotateCcw size={18} />
                      Try Again
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <PlayCircle size={18} />
                      Start
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
