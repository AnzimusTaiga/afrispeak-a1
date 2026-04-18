// ============================================================
// AfriSpeak A1 - VocabCard Component
// Displays a vocabulary word with translation, pronunciation, and audio
// ============================================================

"use client"

import { Volume2 } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import type { Vocabulary } from "@/lib/types"

interface VocabCardProps {
  vocab: Vocabulary
  index: number
}

export function VocabCard({ vocab, index }: VocabCardProps) {
  const { speak, isSpeaking } = useAudio()
  const speaking = isSpeaking(vocab.id)

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm
                 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Word and Pronunciation */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-bold text-gray-900">{vocab.word}</h4>
          </div>
          <p className="text-sm text-orange-500 font-medium mb-1">
            {vocab.pronunciation}
          </p>
          <p className="text-sm text-gray-600 italic">{vocab.translation}</p>
          {vocab.example && (
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              &ldquo;{vocab.example}&rdquo;
            </p>
          )}
        </div>

        {/* Audio Button + Number Badge */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => speak(vocab.word, vocab.id)}
            className={`w-11 h-11 rounded-full flex items-center justify-center
                       transition-all duration-150 shadow-sm ${
              speaking
                ? "bg-green-500 text-white scale-110 shadow-green-200"
                : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
            }`}
            aria-label={`Écouter : ${vocab.word}`}
            title="Écouter la prononciation"
          >
            <Volume2 size={20} />
          </button>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
