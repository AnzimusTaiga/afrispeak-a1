// ============================================================
// POST /api/progress - Acknowledge progress (no DB, client-side storage)
// GET /api/progress - Return empty progress (client-side storage)
// ============================================================

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lessonId } = body

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 })
    }

    // Progress is stored client-side in localStorage via Zustand store.
    // This endpoint acknowledges the progress update.
    return NextResponse.json({ success: true, userUpdated: false })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Progress is stored client-side in localStorage via Zustand store.
    // Return empty array — the client is the source of truth.
    return NextResponse.json({ progress: [] })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
