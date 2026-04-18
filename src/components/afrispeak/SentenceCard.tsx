// ============================================================
// AfriSpeak A1 - SentenceCard Component
// Displays an example sentence with context explanation and audio
// ============================================================

"use client"

import { MessageCircle } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import { AudioButton } from "./AudioButton"
import type { ExampleSentence } from "@/lib/types"

interface SentenceCardProps {
  sentence: ExampleSentence
  index: number
}

export function SentenceCard({ sentence, index }: SentenceCardProps) {
  const { speak } = useAudio()

  return (
    <div
      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100
                 rounded-2xl p-4 hover:shadow-sm transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-start gap-3">
        {/* Number Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <MessageCircle size={14} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          {/* English Sentence */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-base font-semibold text-gray-900 leading-relaxed">
              {sentence.english}
            </p>
            <AudioButton
              text={sentence.english}
              id={`sentence-${sentence.id}`}
              size="sm"
            />
          </div>

          {/* Context */}
          <div className="flex items-start gap-1.5">
            <span className="text-xs text-green-500 mt-0.5">💡</span>
            <p className="text-xs text-gray-500 leading-relaxed">{sentence.context}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
