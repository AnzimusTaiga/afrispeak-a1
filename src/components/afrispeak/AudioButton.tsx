// ============================================================
// AfriSpeak A1 - AudioButton Component
// Plays text using the browser's Speech Synthesis API
// Large touch-friendly button for mobile users
// ============================================================

"use client"

import { Volume2 } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"

interface AudioButtonProps {
  text: string
  id?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AudioButton({ text, id, size = "md", className = "" }: AudioButtonProps) {
  const { speak } = useAudio()
  const buttonId = id || text

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  }

  return (
    <button
      onClick={() => speak(text, buttonId)}
      className={`
        inline-flex items-center justify-center rounded-full
        bg-green-100 text-green-600 hover:bg-green-200
        active:scale-95 transition-all duration-150
        ${sizeClasses[size]} ${className}
      `}
      aria-label={`Écouter : ${text}`}
      title="Écouter la prononciation"
    >
      <Volume2 size={iconSizes[size]} />
    </button>
  )
}
