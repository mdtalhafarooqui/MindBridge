import { useState } from "react";
import { moodOptions, scanForCrisis } from "@/lib/mentalHealthData";
import { journalStore, type JournalEntry } from "@/lib/store";
import { BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(journalStore.getAll());
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const submit = () => {
    if (!mood || !content.trim()) return;
    const flagged = scanForCrisis(content);
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      mood,
      content: content.trim(),
      flagged,
    };
    journalStore.add(entry);
    setEntries([...entries, entry]);
    setMood("");
    setContent("");
    if (flagged) setShowAlert(true);
  };

  // Mood trend summary
  const moodCounts: Record<string, number> = {};
  entries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });

  return (
    <div className="container max-w-2xl py-16 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-2">Mood Journal</h1>
      <p className="text-muted-foreground mb-8">Track your emotions daily. Your entries are private and stored locally.</p>

      {showAlert && (
        <div className="bg-coral/10 border border-coral/30 rounded-lg p-4 mb-6 flex gap-3 items-start">
          <AlertTriangle className="h-5 w-5 text-crisis mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-sm">We noticed some concerning language in your entry.</p>
            <p className="text-sm text-muted-foreground mt-1">If you're in crisis, please reach out for help.</p>
            <Link to="/crisis" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">View Crisis Resources →</Link>
          </div>
          <button onClick={() => setShowAlert(false)} className="text-muted-foreground hover:text-foreground ml-auto text-lg">×</button>
        </div>
      )}

      {/* New entry */}
      <div className="card-calm mb-10">
        <h3 className="font-heading font-semibold mb-4">How are you feeling today?</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {moodOptions.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                mood === m.label ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <span>{m.emoji}</span> {m.label}
            </button>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your day, thoughts, or feelings..."
          rows={4}
          className="w-full bg-background border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-4"
        />
        <button onClick={submit} disabled={!mood || !content.trim()} className="gradient-calm text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-30 transition-transform hover:scale-105">
          Save Entry
        </button>
      </div>

      {/* Mood trend */}
      {entries.length > 0 && (
        <div className="card-calm mb-8">
          <h3 className="font-heading font-semibold mb-4">Mood Trends</h3>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(moodCounts).map(([m, count]) => {
              const option = moodOptions.find((o) => o.label === m);
              return (
                <div key={m} className="text-center">
                  <div className="text-2xl mb-1">{option?.emoji}</div>
                  <p className="text-xs text-muted-foreground">{m}</p>
                  <p className="text-lg font-bold text-foreground">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Entries */}
      <div className="space-y-4">
        {[...entries].reverse().map((e) => (
          <div key={e.id} className={`card-calm ${e.flagged ? "border-crisis/30" : ""}`}>
            <div className="flex items-center gap-2 mb-2">
              <span>{moodOptions.find((m) => m.label === e.mood)?.emoji}</span>
              <span className="text-sm font-medium">{e.mood}</span>
              <span className="text-xs text-muted-foreground ml-auto">{new Date(e.date).toLocaleDateString()}</span>
              {e.flagged && <AlertTriangle className="h-4 w-4 text-crisis" />}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{e.content}</p>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No journal entries yet. Start tracking your mood above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
