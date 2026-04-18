// ============================================================
// AfriSpeak A1 - Coach Anzimus Component
// Wise AI coach that encourages and guides the learner
// Displays as a floating speech bubble with avatar
// ============================================================

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"

interface CoachAnzimusProps {
  context:
    | "daily_welcome"
    | "welcome_back"
    | "lesson_complete"
    | "lesson_complete_low"
    | "exercise_encouragement"
    | "streak_celebration"
    | "new_lesson_unlock"
    | "comeback_after_fail"
    | "long_absence"
  /** Extra data to personalize the message */
  userData?: {
    userName?: string
    userLevel?: number
    currentStreak?: number
    completedLessons?: number
    totalLessons?: number
    lastActiveDate?: string | null
    currentLessonTitle?: string | null
    currentScore?: number | null
  }
  /** Show/hide */
  show?: boolean
  /** Auto-dismiss after ms (0 = manual dismiss only) */
  autoDismiss?: number
  /** Callback when dismissed */
  onDismiss?: () => void
  /** Position variant */
  position?: "home" | "floating"
}

// Anzimus avatar SVG - a wise elder with traditional features
function AnzimusAvatar({ size = 48 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex-shrink-0 flex items-center justify-center shadow-lg"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #DEB887 100%)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size * 0.7}
        height={size * 0.7}
        fill="none"
      >
        {/* Head */}
        <circle cx="50" cy="38" r="22" fill="#8B6914" />
        {/* Face */}
        <circle cx="50" cy="40" r="18" fill="#D2A066" />
        {/* Eyes - wise and kind */}
        <ellipse cx="43" cy="37" rx="2.5" ry="2" fill="#2C1810" />
        <ellipse cx="57" cy="37" rx="2.5" ry="2" fill="#2C1810" />
        {/* Eye shine */}
        <circle cx="44" cy="36" r="0.8" fill="white" />
        <circle cx="58" cy="36" r="0.8" fill="white" />
        {/* Eyebrows - wise, slightly raised */}
        <path d="M38 32 Q43 30 48 32" stroke="#2C1810" strokeWidth="1.5" fill="none" />
        <path d="M52 32 Q57 30 62 32" stroke="#2C1810" strokeWidth="1.5" fill="none" />
        {/* Gentle smile */}
        <path d="M43 46 Q50 52 57 46" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Hat/kufi - traditional cap */}
        <ellipse cx="50" cy="24" rx="20" ry="8" fill="#1a5c2a" />
        <ellipse cx="50" cy="22" rx="16" ry="6" fill="#228B22" />
        {/* Beard - wise elder */}
        <path d="M38 48 Q42 60 50 62 Q58 60 62 48" fill="#8B6914" opacity="0.7" />
        {/* Necklace/pendant */}
        <circle cx="50" cy="65" r="3" fill="#DAA520" />
        <rect x="49" y="62" width="2" height="5" fill="#B8860B" rx="1" />
      </svg>
    </div>
  )
}

export function CoachAnzimus({
  context,
  userData = {},
  show = true,
  autoDismiss = 0,
  onDismiss,
  position = "home",
}: CoachAnzimusProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(show)
  const [source, setSource] = useState<string>("")

  useEffect(() => {
    if (!show) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    setIsLoading(true)

    async function fetchCoachMessage() {
      try {
        const res = await fetch("/api/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context,
            ...userData,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          setMessage(data.message)
          setSource(data.source || "unknown")
        } else {
          // Use a simple fallback
          setMessage("Continue ton apprentissage, mon enfant! Chaque mot est un pas en avant.")
          setSource("error-fallback")
        }
      } catch {
        setMessage("Le savoir est une lumière qui ne s'éteint jamais. Avance avec courage!")
        setSource("error-fallback")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoachMessage()
  }, [context, show])

  // Auto-dismiss
  useEffect(() => {
    if (autoDismiss > 0 && message && !isLoading) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoDismiss)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, message, isLoading])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  // Floating position (bottom-right corner)
  if (position === "floating") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-20 right-4 z-30 max-w-[280px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="relative bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
              {/* Message area */}
              <div className="px-4 py-3 pr-8">
                <div className="flex items-start gap-2.5">
                  <AnzimusAvatar size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-amber-700 mb-0.5 flex items-center gap-1">
                      Coach Anzimus
                      <Sparkles size={10} className="text-amber-400" />
                    </p>
                    {isLoading ? (
                      <div className="flex gap-1 py-1">
                        <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <p className="text-xs text-gray-700 leading-relaxed">{message}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Dismiss */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={12} className="text-gray-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Home position (inline card)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mx-5 mb-4"
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 shadow-sm relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full" />

            <div className="flex items-start gap-3 relative">
              <AnzimusAvatar size={52} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-sm font-bold text-amber-800">Coach Anzimus</h3>
                  <Sparkles size={14} className="text-amber-500" />
                </div>
                {isLoading ? (
                  <div className="flex items-center gap-2 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-amber-600 italic">Anzimus réfléchit...</span>
                  </div>
                ) : (
                  <motion.p
                    className="text-sm text-gray-800 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    &ldquo;{message}&rdquo;
                  </motion.p>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-full hover:bg-amber-100 transition-colors flex-shrink-0"
              >
                <X size={16} className="text-amber-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
