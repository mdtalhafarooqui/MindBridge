import { useState } from "react";
import { assessmentQuestions, evaluateRisk } from "@/lib/mentalHealthData";
import { assessmentStore } from "@/lib/store";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Assessment() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ReturnType<typeof evaluateRisk> | null>(null);

  const handleSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = score;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < assessmentQuestions.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submit = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    const res = evaluateRisk(total);
    setResult(res);
    assessmentStore.add({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      score: total,
      level: res.level,
      answers,
    });
  };

  const q = assessmentQuestions[current];
  const progress = ((current + 1) / assessmentQuestions.length) * 100;
  const canSubmit = answers.length === assessmentQuestions.length && answers.every((a) => a !== undefined);

  if (result) {
    const Icon = result.level === "high" ? AlertTriangle : result.level === "medium" ? ShieldCheck : CheckCircle2;
    const color = result.level === "high" ? "text-crisis" : result.level === "medium" ? "text-coral" : "text-primary";

    return (
      <div className="container max-w-2xl py-16 animate-fade-in">
        <div className="card-calm text-center mb-8">
          <Icon className={`h-12 w-12 mx-auto mb-4 ${color}`} />
          <h2 className="font-heading text-2xl font-bold mb-2">{result.label}</h2>
          <p className="text-sm text-muted-foreground mb-1">Score: {answers.reduce((a, b) => a + b, 0)} / {assessmentQuestions.length * 3}</p>
          <p className="text-muted-foreground leading-relaxed mt-3">{result.description}</p>
        </div>

        <div className="card-calm">
          <h3 className="font-heading text-lg font-semibold mb-4">Personalized Recommendations</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-primary font-bold">{i + 1}.</span>
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {result.level === "high" && (
          <Link to="/crisis" className="mt-6 block text-center gradient-calm text-primary-foreground px-6 py-3 rounded-lg font-medium">
            View Crisis Resources →
          </Link>
        )}

        <button onClick={() => { setResult(null); setCurrent(0); setAnswers([]); }} className="mt-4 block mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors">
          Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-16 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl font-bold mb-2">Mental Health Assessment</h1>
        <p className="text-muted-foreground">Answer honestly. Your responses are private and help us understand your wellbeing.</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Question {current + 1} of {assessmentQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-calm rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="card-calm mb-6">
        <p className="font-medium text-lg leading-relaxed mb-6">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.score}
              onClick={() => handleSelect(opt.score)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                answers[current] === opt.score
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button onClick={prev} disabled={current === 0} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        {current < assessmentQuestions.length - 1 ? (
          <button onClick={next} disabled={answers[current] === undefined} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-30 transition-colors">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={submit} disabled={!canSubmit} className="gradient-calm text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-30 transition-transform hover:scale-105">
            Get Results
          </button>
        )}
      </div>
    </div>
  );
}
