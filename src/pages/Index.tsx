import { Link } from "react-router-dom";
import { Brain, MessageCircleHeart, BookHeart, ShieldAlert, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Smart Assessment",
    description: "A scored, logic-driven mental health questionnaire that evaluates your wellbeing and generates personalized recommendations.",
    path: "/assessment",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircleHeart,
    title: "Emotional Chat Support",
    description: "An empathetic, context-aware chatbot offering guided emotional support with safe-response constraints.",
    path: "/chat",
    accent: "bg-sky-blue text-accent-foreground",
  },
  {
    icon: BookHeart,
    title: "Mood Journal",
    description: "Track your daily mood and journal entries over time. Visualize emotional trends for self-awareness.",
    path: "/journal",
    accent: "bg-secondary text-secondary-foreground",
  },
  {
    icon: ShieldAlert,
    title: "Crisis Detection",
    description: "Automatic risk flagging with verified helpline numbers and immediate guidance for high-risk situations.",
    path: "/crisis",
    accent: "bg-coral/15 text-foreground",
  },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-24 md:py-32">
        <div className="container text-center max-w-3xl animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Student Mental Health Platform</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your mind matters.
            <br />
            <span className="text-gradient">We're here to help.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            MindBridge provides early distress detection, emotional support, and crisis resources — designed specifically for Indian students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center gap-2 gradient-calm text-primary-foreground px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
            >
              Take Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 bg-card border px-6 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
            >
              Talk to Someone
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">How MindBridge Helps</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Four integrated services working together to support your mental wellbeing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((s) => (
              <Link key={s.path} to={s.path} className="card-calm group flex gap-4">
                <div className={`rounded-lg p-3 h-fit ${s.accent}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "1 in 5", label: "Indian students face mental health issues" },
              { stat: "80%", label: "Don't seek professional help" },
              { stat: "24/7", label: "Support availability needed" },
              { stat: "Early", label: "Detection saves lives" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">{item.stat}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
