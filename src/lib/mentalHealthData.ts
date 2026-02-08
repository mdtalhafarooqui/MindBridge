// Assessment questions
export const assessmentQuestions = [
  {
    id: 1,
    question: "Over the past two weeks, how often have you felt little interest or pleasure in doing things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "How often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "How often have you felt tired or had little energy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "How often have you had trouble concentrating on things like studying or reading?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "How often have you felt nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "How would you rate your overall sense of connection with friends, family, or peers?",
    options: [
      { text: "Very connected", score: 0 },
      { text: "Somewhat connected", score: 1 },
      { text: "Mostly isolated", score: 2 },
      { text: "Completely alone", score: 3 },
    ],
  },
];

export type RiskLevel = "low" | "medium" | "high";

export function evaluateRisk(score: number): { level: RiskLevel; label: string; description: string; recommendations: string[] } {
  if (score <= 7) {
    return {
      level: "low",
      label: "Low Risk",
      description: "Your responses suggest you're managing well overall. Continue maintaining healthy habits and stay connected with your support network.",
      recommendations: [
        "Continue regular physical activity and sleep hygiene",
        "Practice mindfulness or meditation for 10 minutes daily",
        "Maintain social connections and reach out to friends regularly",
        "Journal your thoughts to build self-awareness",
      ],
    };
  }
  if (score <= 14) {
    return {
      level: "medium",
      label: "Moderate Risk",
      description: "Your responses indicate some areas of concern. It may help to talk to someone you trust or explore support resources available to you.",
      recommendations: [
        "Consider speaking with a campus counselor or trusted adult",
        "Try structured relaxation techniques like deep breathing or progressive muscle relaxation",
        "Establish a consistent daily routine with breaks for self-care",
        "Use the journal feature to track patterns in your mood",
        "Explore peer support groups on campus",
      ],
    };
  }
  return {
    level: "high",
    label: "High Risk",
    description: "Your responses suggest you may be experiencing significant distress. Please consider reaching out to a mental health professional or crisis helpline. You are not alone.",
    recommendations: [
      "Reach out to a crisis helpline immediately if you feel unsafe",
      "Contact your campus counseling center for an urgent appointment",
      "Talk to someone you trust — a friend, family member, or mentor",
      "Avoid isolating yourself; stay in safe, comfortable environments",
      "Use the crisis resources page on this platform for verified helplines",
    ],
  };
}

// Chatbot responses
const crisisKeywords = ["suicide", "kill myself", "end it", "self-harm", "hurt myself", "don't want to live", "no reason to live"];
const sadKeywords = ["sad", "depressed", "hopeless", "crying", "lonely", "empty", "worthless", "broken"];
const anxiousKeywords = ["anxious", "anxiety", "worried", "panic", "scared", "nervous", "overwhelmed", "stress"];
const positiveKeywords = ["happy", "good", "great", "better", "okay", "fine", "grateful", "calm"];

export function getChatResponse(message: string, riskLevel?: RiskLevel): string {
  const lower = message.toLowerCase();

  if (crisisKeywords.some(k => lower.includes(k))) {
    return "I hear you, and I'm really concerned about what you're sharing. Please know you're not alone. I strongly encourage you to reach out to a crisis helpline right now:\n\n📞 **iCall**: 9152987821\n📞 **Vandrevala Foundation**: 1860-2662-345\n📞 **AASRA**: 9820466726\n\nYou matter, and help is available 24/7. Would you like me to guide you to our crisis resources page?";
  }

  if (sadKeywords.some(k => lower.includes(k))) {
    const responses = [
      "I'm sorry you're feeling this way. It takes courage to express these feelings. Remember, it's okay to not be okay. Would you like to talk more about what's been weighing on you?",
      "Thank you for sharing that with me. Feeling down can be really tough, especially as a student. Have you been able to talk to anyone about how you're feeling?",
      "I understand this is difficult. Your feelings are valid. Sometimes writing in a journal can help process these emotions. Would you like to try our mood journal?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (anxiousKeywords.some(k => lower.includes(k))) {
    const responses = [
      "It sounds like you're dealing with a lot of anxiety. Let's try a quick grounding exercise: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present.",
      "Feeling overwhelmed is understandable, especially with academic pressures. Would you like to try a quick breathing exercise? Breathe in for 4 counts, hold for 4, and exhale for 6.",
      "Anxiety can feel consuming, but remember — it's a wave, and waves pass. What specific situation is causing you the most stress right now?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (positiveKeywords.some(k => lower.includes(k))) {
    return "I'm glad to hear that! It's wonderful when things feel manageable. What's been going well for you lately? Recognizing positive moments can strengthen your resilience.";
  }

  if (lower.includes("help") || lower.includes("support")) {
    return "I'm here to support you. You can:\n\n• Take our **Mental Health Assessment** to understand your wellbeing\n• Use the **Mood Journal** to track your feelings over time\n• Explore **Crisis Resources** if you need immediate help\n\nWhat would you like to explore?";
  }

  const defaults = [
    "Thank you for sharing. I'm here to listen. Could you tell me more about how you've been feeling lately?",
    "I appreciate you opening up. How has your day been overall? Sometimes it helps to just talk it through.",
    "I'm here for you. What's been on your mind recently? Remember, there's no judgment here.",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// Mood options
export const moodOptions = [
  { emoji: "😊", label: "Happy", color: "bg-warm-sand" },
  { emoji: "😰", label: "Anxious", color: "bg-sky-blue" },
  { emoji: "😓", label: "Stressed", color: "bg-coral/20" },
  { emoji: "😔", label: "Low", color: "bg-lavender" },
  { emoji: "😌", label: "Calm", color: "bg-calm-green-light/30" },
];

// Crisis keywords for journal scanning
export const journalCrisisKeywords = ["suicide", "kill", "self-harm", "hurt myself", "end it all", "no point", "want to die"];

export function scanForCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return journalCrisisKeywords.some(k => lower.includes(k));
}

// Helplines
export const helplines = [
  { name: "iCall", number: "9152987821", description: "Psychosocial helpline by TISS Mumbai", hours: "Mon–Sat, 8am–10pm" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", description: "24/7 mental health support", hours: "24/7" },
  { name: "AASRA", number: "9820466726", description: "Crisis intervention center", hours: "24/7" },
  { name: "Sneha India", number: "044-24640050", description: "Emotional support & suicide prevention", hours: "24/7" },
  { name: "NIMHANS", number: "080-46110007", description: "National Institute of Mental Health", hours: "Mon–Sat, 9am–5pm" },
  { name: "Connecting Trust", number: "9922001122", description: "Helpline for emotional distress", hours: "12pm–8pm daily" },
];
