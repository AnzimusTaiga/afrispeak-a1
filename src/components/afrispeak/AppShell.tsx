// ============================================================
// AfriSpeak A1 - AppShell Component
// Main application container with bottom navigation bar
// Manages screen rendering based on Zustand store state
// ============================================================

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { HomeScreen } from "./HomeScreen"
import { LessonDetailScreen } from "./LessonDetailScreen"
import { ExerciseScreen } from "./ExerciseScreen"
import { ProgressScreen } from "./ProgressScreen"
import { RewardAnimation } from "./RewardAnimation"
import { CoachAnzimus } from "./CoachAnzimus"
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt"
import { Home, BarChart3, BookOpen } from "lucide-react"

export function AppShell() {
  const {
    currentScreen,
    navigate,
    showCelebration,
    celebrationMessage,
    celebrationXP,
    dismissCelebration,
    coachVisible,
    coachContext,
    hideCoach,
    user,
    lessonsProgress,
    lessons,
  } = useAppStore()

  // Show/hide bottom nav based on screen
  const showBottomNav = currentScreen === "home" || currentScreen === "progress"

  const handleDismissCelebration = () => {
    dismissCelebration()
    navigate("home")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: currentScreen === "lesson" || currentScreen === "exercise" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentScreen === "home" ? -20 : 20 }}
            transition={{ duration: 0.2 }}
          >
            {currentScreen === "home" && <HomeScreen />}
            {currentScreen === "lesson" && <LessonDetailScreen />}
            {currentScreen === "exercise" && <ExerciseScreen />}
            {currentScreen === "progress" && <ProgressScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.nav
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                       shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
              {/* Home Tab */}
              <button
                onClick={() => navigate("home")}
                className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all
                           ${currentScreen === "home"
                             ? "text-green-600"
                             : "text-gray-400 hover:text-gray-600"
                           }`}
              >
                <Home size={22} />
                <span className="text-xs font-medium">Home</span>
              </button>

              {/* Logo/Brand Tab (center) */}
              <button
                onClick={() => navigate("home")}
                className="flex flex-col items-center gap-0.5 py-2 px-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <BookOpen size={18} className="text-white" />
                </div>
                <span className="text-xs font-bold text-green-600">AfriSpeak</span>
              </button>

              {/* Progress Tab */}
              <button
                onClick={() => navigate("progress")}
                className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all
                           ${currentScreen === "progress"
                             ? "text-green-600"
                             : "text-gray-400 hover:text-gray-600"
                           }`}
              >
                <BarChart3 size={22} />
                <span className="text-xs font-medium">Progress</span>
              </button>
            </div>

            {/* Safe Area for iOS */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reward Celebration Overlay */}
      <RewardAnimation
        show={showCelebration}
        message={celebrationMessage}
        xp={celebrationXP}
        onDismiss={handleDismissCelebration}
      />

      {/* Global Coach Anzimus - appears when returning after long absence */}
      <CoachAnzimus
        context="long_absence"
        show={coachVisible && coachContext === "long_absence" && currentScreen === "home"}
        position="floating"
        autoDismiss={15000}
        onDismiss={hideCoach}
        userData={{
          userName: user?.name || "L'apprenant",
          userLevel: user?.level || 1,
          currentStreak: user?.currentStreak || 0,
          completedLessons: Object.values(lessonsProgress).filter((p) => p.completed).length,
          totalLessons: lessons.length,
          lastActiveDate: user?.lastActiveDate || null,
        }}
      />
    </div>
  )
}
