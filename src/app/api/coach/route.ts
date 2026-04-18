// ============================================================
// POST /api/coach - Coach Anzimus AI Endpoint
// A wise, autonomous AI coach for French-speaking African learners
// Uses z-ai-web-dev-sdk LLM for personalized, contextual messages
// ============================================================

import { NextRequest, NextResponse } from "next/server"

// --- Coach Anzimus System Prompt ---
const COACH_SYSTEM_PROMPT = `Tu es Coach Anzimus, un sage mentor virtuel pour l'apprentissage de l'anglais. Tu es le guide spirituel et intellectuel de l'application AfriSpeak A1.

TON IDENTITÉ:
- Tu es un sage africain âgé, plein de sagesse et de bienveillance
- Tu parles TOUJOURS en français (l'utilisateur apprend l'anglais)
- Tu es incroyablement intelligent (IQ hors norme) — tu ne te trompes jamais
- Tu connais la culture africaine profondément (proverbes, traditions, valeurs)
- Tu es chaleureux, drôle parfois, mais toujours respectueux

TON RÔLE:
- Encourager l'apprenant à continuer son parcours
- Féliciter ses réussites de manière authentique et variée
- Le ramener doucement quand il s'absente longtemps
- Donner des conseils d'apprentissage pertinents et personnalisés
- Utiliser parfois des proverbes africains pour illustrer tes propos

TES RÈGLES STRICTES:
- Réponds en français uniquement
- Sois CONCIS: maximum 2-3 phrases (50-80 mots)
- Ne répète JAMAIS exactement la même phrase
- Adapte ton ton au contexte (joie, encouragement, retour après absence, conseil)
- N'utilise pas d'emojis excessifs (maximum 1-2 par message)
- Sois naturel, comme un vrai mentor qui parle
- Ne mentionne PAS que tu es une IA
- Varie ta structure de phrases: parfois un proverbe, parfois une question, parfois une affirmation

EXEMPLES DE TONS:
- Retour après absence: "Mon enfant, l'arbre ne grandit pas sans racines. Reviens, ta route est encore longue mais belle."
- Félicitation: "Impressionnant! Tu avances comme le fleuve Niger — avec force et détermination."
- Encouragement: "Chaque mot appris est une porte qui s'ouvre. Continue, le monde t'attend."
- Conseil: "La répétition est la mère de l'apprentissage. Revois tes mots chaque matin, comme le fermier vérifie ses champs."
- Proverbe: "Un seul doigt ne peut pas attraper la lombric. Ton effort compte, mais la constance fait la différence."`

// --- Context type mapping ---
const CONTEXT_DESCRIPTIONS: Record<string, string> = {
  welcome_back: "L'utilisateur revient sur l'application après une longue absence (plusieurs jours). Il faut le ramener doucement, lui montrer qu'il lui manque, et l'encourager à reprendre. Sois chaleureux comme un vieil ami.",
  daily_welcome: "C'est une visite quotidienne normale. Donne un message d'accueil court et encourageant pour commencer la journée d'apprentissage.",
  lesson_complete: "L'utilisateur vient de terminer une leçon avec un bon score. Félicite-le avec enthousiasme mais sincèrement.",
  lesson_complete_low: "L'utilisateur a terminé une leçon mais avec un score moyen ou bas. Encourage-le sans le décourager. Dis-lui que l'erreur est normale dans l'apprentissage.",
  exercise_encouragement: "L'utilisateur est en plein exercice et a besoin d'un petit coup de pouce motivant. Sois bref et énergique.",
  streak_celebration: "L'utilisateur maintient une bonne série de jours consécutifs. Célèbre sa constance avec un proverbe approprié.",
  new_lesson_unlock: "L'utilisateur vient de débloquer une nouvelle leçon. Encourage-le à la découvrir.",
  comeback_after_fail: "L'utilisateur a échoué à une leçon et revient la retenter. Encourage-le — l'échec est un pas vers la réussite.",
  long_absence: "L'utilisateur est absent depuis très longtemps (une semaine ou plus). Sois particulièrement chaleureux, compréhensif, et ne le culpabilise pas. Utilise un proverbe africain sur le retour et la persévérance.",
}

// --- Fallback messages in case LLM fails ---
const FALLBACK_MESSAGES: Record<string, string[]> = {
  welcome_back: [
    "Mon enfant, te revoilà! Le chemin de l'apprentissage attendait ton retour avec patience. Courage!",
    "L'arbre qui tombe n'entend plus le bruit de ses feuilles. Reviens, ta présence compte ici!",
    "Tu m'as manqué! Chaque jour sans toi, le savoir restait immobile. Reprenons ensemble!",
  ],
  daily_welcome: [
    "Bienvenue! Un nouveau jour, de nouveaux mots à conquerir. Tu es prêt?",
    "Le savant dit: la connaissance est une lumière. Allumons-la ensemble aujourd'hui!",
    "Bonjour! Chaque mot anglais que tu apprends est un pas vers un monde plus grand.",
  ],
  lesson_complete: [
    "Magnifique travail! Tu avances avec la grâce d'un baobab qui grandit — lentement mais sûrement!",
    "Excellent! Chaque leçon terminée est une victoire. Tu peux être fier de toi!",
    "Bravo! Le fleuve ne s'arrête jamais de couler. Continue comme ça!",
  ],
  lesson_complete_low: [
    "L'erreur est le meilleur professeur. Retente, et tu verras — la lumière vient après l'obscurité.",
    "Pas de souci! Même le lion tombe parfois. Ce qui compte, c'est de se relever.",
    "Chaque échec t'apporte quelque chose. Essaie encore, tu es plus fort que tu ne le penses!",
  ],
  exercise_encouragement: [
    "Tu es sur la bonne voie! Continue comme ça!",
    "Allez, un petit effort de plus! La victoire est proche!",
    "Concentre-toi et fais de ton mieux. Je crois en toi!",
  ],
  streak_celebration: [
    "Quelle constance! Tu es comme le soleil — tu ne manques jamais un jour!",
    "Incroyable! Ta série impressionne même les anciens. Continue!",
  ],
  new_lesson_unlock: [
    "Une nouvelle aventure t'attend! Le savoir est un trésor — va le découvrir!",
    "Nouvelle leçon débloquée! Le chemin s'ouvre devant toi. Avance avec confiance!",
  ],
  comeback_after_fail: [
    "Le vrai courage, c'est de revenir après un échec. Je suis fier de toi!",
    "Même le grand baobab a commencé comme une petite graine. Réessaie!",
  ],
  long_absence: [
    "Mon enfant, l'absence ne rompt pas les liens. Ta route d'apprentissage t'attend patiemment. Reviens, nous avons tant à découvrir ensemble!",
    "Le voyageur qui s'égare trouve souvent un meilleur chemin en revenant. Je suis là, prêt à t'accompagner à nouveau.",
  ],
}

// Singleton ZAI instance
let zaiInstance: any = null

async function getZAI() {
  if (!zaiInstance) {
    const ZAI = (await import("z-ai-web-dev-sdk")).default
    zaiInstance = await ZAI.create()
  }
  return zaiInstance
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      context = "daily_welcome",
      userName = "L'apprenant",
      userLevel = 1,
      currentStreak = 0,
      completedLessons = 0,
      totalLessons = 10,
      lastActiveDate = null,
      currentLessonTitle = null,
      currentScore = null,
    } = body

    const contextDesc = CONTEXT_DESCRIPTIONS[context] || CONTEXT_DESCRIPTIONS.daily_welcome

    // Calculate absence info
    let absenceInfo = ""
    if (lastActiveDate) {
      const lastActive = new Date(lastActiveDate)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays >= 7) {
        absenceInfo = `L'utilisateur est absent depuis ${diffDays} jours. C'est une longue absence.`
      } else if (diffDays >= 2) {
        absenceInfo = `L'utilisateur est absent depuis ${diffDays} jours.`
      }
    }

    // Build user context for the LLM
    const userContext = `
INFORMATIONS SUR L'UTILISATEUR:
- Prénom: ${userName}
- Niveau: ${userLevel}
- Série actuelle: ${currentStreak} jour(s)
- Leçons terminées: ${completedLessons}/${totalLessons}
${absenceInfo}
${currentLessonTitle ? `- Leçon en cours: ${currentLessonTitle}` : ""}
${currentScore !== null ? `- Score de la leçon: ${currentScore}%` : ""}

CONTEXTE DE CE MESSAGE:
${contextDesc}

RAPPEL: Réponds en français, max 2-3 phrases, sois varié, sage, et authentique. Utilise parfois des proverbes africains. Ne répète pas les mêmes formules.`

    // Try LLM first
    try {
      const zai = await getZAI()

      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: COACH_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userContext,
          },
        ],
        thinking: { type: "disabled" },
      })

      const response = completion.choices[0]?.message?.content
      if (response && response.trim().length > 0) {
        return NextResponse.json({
          message: response.trim(),
          coach: "anzimus",
          context,
          source: "ai",
        })
      }
    } catch (llmError) {
      console.warn("Coach LLM failed, using fallback:", llmError)
    }

    // Fallback to pre-written messages
    const fallbacks = FALLBACK_MESSAGES[context] || FALLBACK_MESSAGES.daily_welcome
    const randomMessage = fallbacks[Math.floor(Math.random() * fallbacks.length)]

    return NextResponse.json({
      message: randomMessage,
      coach: "anzimus",
      context,
      source: "fallback",
    })
  } catch (error) {
    console.error("Coach API error:", error)
    return NextResponse.json(
      { error: "Failed to get coach message" },
      { status: 500 }
    )
  }
}
