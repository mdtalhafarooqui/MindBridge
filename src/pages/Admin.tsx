import { useState, useEffect } from "react";
import { assessmentStore, journalStore, type AssessmentResult, type JournalEntry } from "@/lib/store";
import { AlertTriangle, Users, FileText, Activity } from "lucide-react";

export default function Admin() {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setAssessments(assessmentStore.getAll());
    setEntries(journalStore.getAll());
  }, []);

  const highRisk = assessments.filter((a) => a.level === "high");
  const flaggedEntries = entries.filter((e) => e.flagged);
  const alerts = [...highRisk.map((a) => ({ type: "assessment" as const, date: a.date, level: a.level, score: a.score })),
    ...flaggedEntries.map((e) => ({ type: "journal" as const, date: e.date, mood: e.mood }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container max-w-4xl py-16 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold mb-2">Counselor Dashboard</h1>
      <p className="text-muted-foreground mb-8">Overview of student interactions and risk alerts.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Users, label: "Total Assessments", value: assessments.length },
          { icon: AlertTriangle, label: "High Risk", value: highRisk.length, highlight: true },
          { icon: FileText, label: "Journal Entries", value: entries.length },
          { icon: Activity, label: "Flagged Entries", value: flaggedEntries.length, highlight: flaggedEntries.length > 0 },
        ].map((stat) => (
          <div key={stat.label} className={`card-calm text-center ${stat.highlight && Number(stat.value) > 0 ? "border-crisis/30" : ""}`}>
            <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.highlight && Number(stat.value) > 0 ? "text-crisis" : "text-primary"}`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Alert feed */}
      <h2 className="font-heading text-xl font-bold mb-4">Risk Alerts</h2>
      {alerts.length === 0 ? (
        <div className="card-calm text-center py-10 text-muted-foreground">
          <p>No alerts yet. Alerts appear when assessments flag high risk or journal entries contain concerning language.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div key={i} className="card-calm flex items-center gap-4">
              <AlertTriangle className="h-5 w-5 text-crisis shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {alert.type === "assessment"
                    ? `High-risk assessment (Score: ${(alert as any).score})`
                    : `Flagged journal entry (Mood: ${(alert as any).mood})`}
                </p>
                <p className="text-xs text-muted-foreground">{new Date(alert.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent assessments */}
      {assessments.length > 0 && (
        <>
          <h2 className="font-heading text-xl font-bold mb-4 mt-10">Recent Assessments</h2>
          <div className="space-y-3">
            {[...assessments].reverse().slice(0, 10).map((a) => (
              <div key={a.id} className="card-calm flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full shrink-0 ${a.level === "high" ? "bg-crisis" : a.level === "medium" ? "bg-coral" : "bg-primary"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">{a.level} Risk · Score {a.score}/21</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
