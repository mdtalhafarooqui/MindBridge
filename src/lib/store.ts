// Simple localStorage-based store for demo purposes

export interface AssessmentResult {
  id: string;
  date: string;
  score: number;
  level: "low" | "medium" | "high";
  answers: number[];
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  flagged: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

function getStore<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const assessmentStore = {
  getAll: () => getStore<AssessmentResult>("mhs_assessments"),
  add: (result: AssessmentResult) => {
    const all = getStore<AssessmentResult>("mhs_assessments");
    all.push(result);
    setStore("mhs_assessments", all);
  },
};

export const journalStore = {
  getAll: () => getStore<JournalEntry>("mhs_journal"),
  add: (entry: JournalEntry) => {
    const all = getStore<JournalEntry>("mhs_journal");
    all.push(entry);
    setStore("mhs_journal", all);
  },
};

export const chatStore = {
  getAll: () => getStore<ChatMessage>("mhs_chat"),
  add: (msg: ChatMessage) => {
    const all = getStore<ChatMessage>("mhs_chat");
    all.push(msg);
    setStore("mhs_chat", all);
  },
  clear: () => setStore("mhs_chat", []),
};
