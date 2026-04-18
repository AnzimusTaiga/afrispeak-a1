// ============================================================
// AfriSpeak A1 - RewardAnimation Component
// Full-screen celebration overlay with confetti-like animation
// Shows XP earned and a fun message after completing a lesson
// ============================================================

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Sparkles, X } from "lucide-react"

interface RewardAnimationProps {
  show: boolean
  message: string
  xp: number
  onDismiss: () => void
}

// Floating celebration particles
function CelebrationParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: Math.random() * 8 + 4,
    color: ["#58CC02", "#FF9600", "#CE82FF", "#1CB0F6", "#FFC800", "#FF4B4B"][
      Math.floor(Math.random() * 6)
    ],
    emoji: ["🎉", "⭐", "🌟", "✨", "🏆", "💪"][Math.floor(Math.random() * 6)],
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-xl"
          style={{ left: `${p.x}%` }}
          initial={{ y: "100%", opacity: 1, scale: 0 }}
          animate={{
            y: "-20%",
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export function RewardAnimation({ show, message, xp, onDismiss }: RewardAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Particles */}
          <CelebrationParticles />

          {/* Card */}
          <motion.div
            className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl z-10"
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>

            {/* Trophy */}
            <motion.div
              className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
              initial={{ rotate: -15 }}
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Trophy size={40} className="text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              🎉 Amazing!
            </motion.h2>

            {/* Message */}
            <motion.p
              className="text-gray-600 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {message}
            </motion.p>

            {/* XP Earned */}
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50
                         border border-yellow-200 rounded-2xl px-6 py-3 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ delay: 1, duration: 0.5, repeat: 2 }}
              >
                <Star size={24} className="text-yellow-500 fill-yellow-500" />
              </motion.div>
              <div className="text-left">
                <p className="text-xs text-yellow-600 font-medium">XP EARNED</p>
                <p className="text-xl font-bold text-yellow-700">+{xp} XP</p>
              </div>
              <Sparkles size={20} className="text-orange-400 ml-1" />
            </motion.div>

            {/* Continue Button */}
            <motion.button
              onClick={onDismiss}
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                         font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl
                         active:scale-[0.98] transition-all duration-150"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Continue Learning! 🚀
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
