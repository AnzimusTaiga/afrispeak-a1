// ============================================================
// GET /api/lessons - Fetch all lessons (static data, no DB)
// Progress is managed client-side via localStorage / Zustand
// ============================================================

import { NextResponse } from "next/server"
import lessonsData from "@/lib/lessons-data"

export async function GET() {
  try {
    // Return lesson summaries without vocabulary/sentences/exercises
    const lessonSummaries = lessonsData.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      topic: lesson.topic,
      icon: lesson.icon,
      color: lesson.color,
      order: lesson.order,
      xpReward: lesson.xpReward,
      // No progress from server — handled client-side
    }))

    return NextResponse.json({ lessons: lessonSummaries })
  } catch (error) {
    console.error("Error fetching lessons:", error)
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 })
  }
}
