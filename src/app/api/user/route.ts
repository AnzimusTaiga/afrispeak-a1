// ============================================================
// GET /api/user - Return default guest user (no DB, client-side storage)
// POST /api/user - Acknowledge user update (no DB, client-side storage)
// ============================================================

import { NextResponse } from "next/server"
import lessonsData from "@/lib/lessons-data"

const DEFAULT_USER = {
  id: "guest-default",
  name: "Guest Learner",
  email: "guest@afrispeak.a1",
  isGuest: true,
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
}

export async function GET() {
  try {
    const totalLessons = lessonsData.length

    return NextResponse.json({
      user: DEFAULT_USER,
      stats: {
        totalLessons,
        completedLessons: 0,
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        nextLevelXP: 200,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await request.json()

    // User data is managed client-side in localStorage via Zustand store.
    return NextResponse.json({ user: DEFAULT_USER })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
