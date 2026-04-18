// ============================================================
// POST /api/tts - Text-to-Speech using z-ai-web-dev-sdk
// Generates actual audio files from text input
// Optimized for A1 English learners (slower speed, clear voice)
// ============================================================

import { NextRequest, NextResponse } from "next/server"

// Cache for generated audio to avoid redundant API calls
const audioCache = new Map<string, Buffer>()
const MAX_CACHE_SIZE = 100

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "kazi", speed = 0.8 } = await req.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (text.length > 1024) {
      return NextResponse.json(
        { error: "Text exceeds maximum length of 1024 characters" },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = `${text}-${voice}-${speed}`
    const cached = audioCache.get(cacheKey)
    if (cached) {
      return new NextResponse(cached, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=86400",
          "X-Cache": "HIT",
        },
      })
    }

    // Import SDK dynamically (server-side only)
    const ZAI = (await import("z-ai-web-dev-sdk")).default
    const zai = await ZAI.create()

    // Generate TTS audio
    const response = await zai.audio.tts.create({
      input: text.trim(),
      voice,
      speed: Math.max(0.5, Math.min(2.0, speed)),
      response_format: "wav",
      stream: false,
    })

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))

    // Cache the result
    if (audioCache.size >= MAX_CACHE_SIZE) {
      // Remove oldest entry
      const firstKey = audioCache.keys().next().value
      if (firstKey) audioCache.delete(firstKey)
    }
    audioCache.set(cacheKey, buffer)

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
        "X-Cache": "MISS",
      },
    })
  } catch (error) {
    console.error("TTS API Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate speech",
      },
      { status: 500 }
    )
  }
}

// GET /api/tts - Returns TTS configuration for client-side fallback
export async function GET() {
  return NextResponse.json({
    text: "",
    lang: "en-US",
    rate: 0.75,
    message: "Use POST method with { text, voice?, speed? } to generate audio",
    voices: ["tongtong", "kazi", "jam", "xiaochen"],
  })
}
