// ============================================================
// AfriSpeak A1 - ExerciseScreen Component
// Interactive exercises: multiple choice, tap-to-select, listen & repeat
// Shows progress bar, feedback, and final score
// ============================================================

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { AudioButton } from "./AudioButton"
import { CoachAnzimus } from "./CoachAnzimus"
import { useAudio } from "@/hooks/use-audio"
import type { Exercise } from "@/lib/types"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Volume2,
  Loader2,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react"

// Exercise type display config
const EXERCISE_CONFIG = {
  multiple_choice: {
    label: "Choix multiple",
    color: "from-blue-500 to-cyan-500",
    emoji: "📝",
  },
  tap_to_select: {
    label: "Choisis la bonne réponse",
    color: "from-purple-500 to-violet-500",
    emoji: "👆",
  },
  listen_repeat: {
    label: "Écoute et choisis",
    color: "from-orange-500 to-amber-500",
    emoji: "👂",
  },
}

export function ExerciseScreen() {
  const {
    currentLesson,
    exerciseState,
    setExerciseAnswer,
    nextExercise,
    resetExerciseState,
    updateLessonProgress,
    addXP,
    navigate,
    goBack,
    triggerCelebration,
    showCelebration,
    celebrationMessage,
    celebrationXP,
    dismissCelebration,
    saveToCache,
  } = useAppStore()

  const { speak } = useAudio()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [showMidExerciseCoach, setShowMidExerciseCoach] = useState(false)

  const exercises = currentLesson?.exercises || []
  const currentExercise = exercises[exerciseState.currentIndex]
  const progress = ((exerciseState.currentIndex) / exercises.length) * 100

  // Reset state when entering exercise screen
  useEffect(() => {
    if (currentLesson) {
      resetExerciseState()
      setSelectedAnswer(null)
      setShowFeedback(false)
      setShowHint(false)
      setExerciseDone(false)
    }
  }, [currentLesson?.id])

  // Auto-play audio for listen_repeat exercises
  useEffect(() => {
    if (currentExercise?.type === "listen_repeat" && currentExercise.audioText) {
      const timer = setTimeout(() => {
        speak(currentExercise.audioText, `exercise-audio-${currentExercise.id}`)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [exerciseState.currentIndex, currentExercise?.id])

  useEffect(() => {
    if (showMidExerciseCoach) {
      const timer = setTimeout(() => setShowMidExerciseCoach(false), 8000)
      return () => clearTimeout(timer)
    }
  }, [showMidExerciseCoach])

  const handleSelectAnswer = (answer: string) => {
    if (showFeedback) return
    setSelectedAnswer(answer)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !currentExercise || showFeedback) return

    const correct = selectedAnswer === currentExercise.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    // Show coach encouragement every 3 exercises on correct answers
    if (correct && exerciseState.answers.length > 0 && (exerciseState.answers.length + 1) % 3 === 0) {
      setShowMidExerciseCoach(true)
    }

    setExerciseAnswer(currentExercise.id, selectedAnswer, correct)
  }

  const handleNext = () => {
    const isLastExercise = exerciseState.currentIndex >= exercises.length - 1

    if (isLastExercise) {
      // All exercises done - show results
      setExerciseDone(true)
    } else {
      // Move to next exercise
      nextExercise()
      setSelectedAnswer(null)
      setShowFeedback(false)
      setShowHint(false)
    }
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    const score = exerciseState.score
    const xpEarned = Math.round((score / 100) * (currentLesson?.xpReward || 20))
    const completed = score >= 50 // Pass at 50%

    try {
      // Save progress to server
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "guest-default",
          lessonId: currentLesson?.id,
          score,
          xpEarned: completed ? xpEarned : 0,
          completed,
        }),
      })

      // Update local state
      if (completed) {
        updateLessonProgress(currentLesson!.id, {
          completed: true,
          score,
          xpEarned,
          bestScore: Math.max(score, useAppStore.getState().lessonsProgress[currentLesson!.id]?.bestScore || 0),
          attempts: (useAppStore.getState().lessonsProgress[currentLesson!.id]?.attempts || 0) + 1,
        })
        addXP(xpEarned)

        // Trigger celebration
        triggerCelebration(
          score >= 90 ? "Perfect score! You're amazing! 🌟" :
          score >= 70 ? "Great job! Keep learning! 🎉" :
          "Lesson completed! Well done! ✨",
          xpEarned
        )
      }

      saveToCache()
    } catch (error) {
      console.error("Failed to save progress:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    resetExerciseState()
    goBack()
  }

  // Exercise Complete Screen
  if (exerciseDone) {
    const score = exerciseState.score
    const xpEarned = Math.round((score / 100) * (currentLesson?.xpReward || 20))
    const completed = score >= 50

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-5">
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          {/* Result Icon */}
          <motion.div
            className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center
                        ${completed
                          ? "bg-gradient-to-br from-green-400 to-emerald-500"
                          : "bg-gradient-to-br from-orange-400 to-amber-500"
                        }`}
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {completed ? (
              <Trophy size={48} className="text-white" />
            ) : (
              <Star size={48} className="text-white" />
            )}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {completed ? "🎉 Lesson Complete!" : "💪 Keep Trying!"}
          </h2>
          <p className="text-gray-500 mb-6">
            {completed
              ? "You did great! Keep practicing to improve."
              : "You need 50% to pass. Try again!"
            }
          </p>

          {/* Score */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">{score}%</p>
              <p className="text-xs text-gray-500">Score</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <p className="text-2xl font-bold text-gray-900">+{completed ? xpEarned : 0}</p>
              </div>
              <p className="text-xs text-gray-500">XP Earned</p>
            </div>
          </div>

          {/* Answer Summary */}
          <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-500 font-medium mb-2">Answer Summary</p>
            <div className="space-y-1.5">
              {exerciseState.answers.map((answer, i) => (
                <div key={i} className="flex items-center gap-2">
                  {answer.isCorrect ? (
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-500 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-700 truncate">
                    Q{i + 1}: {answer.isCorrect ? "Correct" : answer.selectedAnswer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleBack}
              className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-2xl
                         active:scale-[0.98] transition-all duration-150"
            >
              Back to Lesson
            </button>
            {!completed && (
              <button
                onClick={() => {
                  resetExerciseState()
                  setSelectedAnswer(null)
                  setShowFeedback(false)
                  setShowHint(false)
                  setExerciseDone(false)
                }}
                className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                           font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all duration-150"
              >
                Try Again
              </button>
            )}
            {completed && (
              <button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                           font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all duration-150
                           disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Continue"}
                {!isSubmitting && <ChevronRight size={18} />}
              </button>
            )}
          </div>

          <CoachAnzimus
            context={completed ? "lesson_complete" : "lesson_complete_low"}
            show={exerciseDone}
            position="floating"
            autoDismiss={0}
            onDismiss={() => setShowMidExerciseCoach(false)}
            userData={{
              userName: useAppStore.getState().user?.name || "L'apprenant",
              currentScore: score,
              currentLessonTitle: currentLesson?.title,
            }}
          />
        </motion.div>
      </div>
    )
  }

  // Loading or no exercise
  if (!currentExercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-green-500 mb-4" />
        <p className="text-gray-500">Loading exercise...</p>
      </div>
    )
  }

  const config = EXERCISE_CONFIG[currentExercise.type as keyof typeof EXERCISE_CONFIG]

  return (
    <div className="pb-8">
      {/* Top Bar */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-gray-500">
          {exerciseState.currentIndex + 1}/{exercises.length}
        </span>
      </div>

      {/* Exercise Type Badge */}
      <div className="px-5 mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.color} text-white text-xs font-medium`}>
          <span>{config.emoji}</span>
          <span>{config.label}</span>
        </div>
      </div>

      {/* Question */}
      <div className="px-5 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3 leading-relaxed">
              {currentExercise.question}
            </h2>

            {/* Audio Button for listen_repeat */}
            {currentExercise.type === "listen_repeat" && currentExercise.audioText && (
              <button
                onClick={() => speak(currentExercise.audioText, `exercise-audio-${currentExercise.id}`)}
                className="flex items-center gap-2 px-4 py-3 bg-orange-50 text-orange-600
                           rounded-2xl mb-4 hover:bg-orange-100 active:scale-[0.98] transition-all"
              >
                <Volume2 size={20} />
                <span className="font-medium">Play Again</span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="px-5 space-y-3 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id + "-options"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {(currentExercise as Exercise).options.map((option, i) => {
              const isSelected = selectedAnswer === option
              const isCorrectOption = option === currentExercise.correctAnswer

              let optionStyle = "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              if (showFeedback && isSelected && isCorrectOption) {
                optionStyle = "bg-green-50 border-green-400"
              } else if (showFeedback && isSelected && !isCorrectOption) {
                optionStyle = "bg-red-50 border-red-400"
              } else if (showFeedback && isCorrectOption) {
                optionStyle = "bg-green-50 border-green-300"
              } else if (isSelected) {
                optionStyle = "bg-green-50 border-green-400"
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border-2
                             transition-all duration-200 active:scale-[0.98]
                             ${optionStyle}`}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    {/* Option Letter */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                  flex-shrink-0 ${
                                    showFeedback && isSelected && isCorrectOption
                                      ? "bg-green-500 text-white"
                                      : showFeedback && isSelected && !isCorrectOption
                                      ? "bg-red-500 text-white"
                                      : showFeedback && isCorrectOption
                                      ? "bg-green-500 text-white"
                                      : isSelected
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>

                    {/* Option Text */}
                    <span className="text-sm font-medium text-gray-800 flex-1">{option}</span>

                    {/* Feedback Icons */}
                    {showFeedback && isSelected && isCorrectOption && (
                      <CheckCircle2 size={20} className="text-green-500" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint */}
      {!showHint && currentExercise.hint && !showFeedback && (
        <div className="px-5 mb-4">
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700"
          >
            <Lightbulb size={16} />
            Show Hint
          </button>
        </div>
      )}

      {showHint && currentExercise.hint && (
        <motion.div
          className="mx-5 mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-700">{currentExercise.hint}</p>
          </div>
        </motion.div>
      )}

      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="mx-5 mb-4 p-4 rounded-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div
              className={`flex items-center gap-2 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 size={20} />
                  <span className="font-semibold">Correct! Well done! 🎉</span>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <span className="font-semibold">Not quite. The answer is:</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="text-sm mt-1 ml-7 text-gray-700 font-medium">
                {currentExercise.correctAnswer}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <CoachAnzimus
        context="exercise_encouragement"
        show={showMidExerciseCoach}
        position="floating"
        autoDismiss={8000}
        onDismiss={() => setShowMidExerciseCoach(false)}
      />
      <div className="px-5">
        {!showFeedback ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                       font-bold rounded-2xl text-base shadow-lg disabled:opacity-40
                       disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-150"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                       font-bold rounded-2xl text-base shadow-lg active:scale-[0.98]
                       transition-all duration-150"
          >
            {exerciseState.currentIndex >= exercises.length - 1
              ? "See Results"
              : "Continue"}
          </button>
        )}
      </div>
    </div>
  )
}
