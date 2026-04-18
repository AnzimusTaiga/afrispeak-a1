// ============================================================
// AfriSpeak A1 - useAudio Hook
// Uses browser's Web Speech API for text-to-speech
// Optimized for A1 learners (slower rate, clear enunciation)
// ============================================================

"use client"

import { useCallback, useRef } from "react"

interface UseAudioReturn {
  speak: (text: string, id?: string) => void
  stop: () => void
  isSpeaking: (id?: string) => boolean
}

export function useAudio(): UseAudioReturn {
  const currentIdRef = useRef<string | null>(null)

  const speak = useCallback((text: string, id?: string) => {
    // Stop any current speech
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.warn("Speech synthesis not available")
      return
    }

    currentIdRef.current = id || text

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.75 // Slower for beginners
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Try to use a good English voice
    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Female")
    ) || voices.find((v) => v.lang.startsWith("en-US"))
    if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onend = () => {
      currentIdRef.current = null
    }
    utterance.onerror = () => {
      currentIdRef.current = null
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      currentIdRef.current = null
    }
  }, [])

  const isSpeaking = useCallback((id?: string) => {
    if (!id) return false
    return currentIdRef.current === id && (
      typeof window !== "undefined" && window.speechSynthesis?.speaking
    )
  }, [])

  return { speak, stop, isSpeaking }
}
