import { helplines } from "@/lib/mentalHealthData";
import { Phone, Heart, Shield } from "lucide-react";

export default function Crisis() {
  return (
    <div className="animate-fade-in">
      {/* Emergency banner */}
      <section className="bg-crisis/10 py-12">
        <div className="container max-w-2xl text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-crisis" />
          <h1 className="font-heading text-3xl font-bold mb-3">You Are Not Alone</h1>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            If you or someone you know is in immediate danger, please call emergency services (112) or reach out to any of the verified helplines below.
          </p>
        </div>
      </section>

      {/* Helplines */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Verified Helplines</h2>
          <div className="space-y-4">
            {helplines.map((h) => (
              <div key={h.name} className="card-calm flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{h.name}</h3>
                  <p className="text-xs text-muted-foreground">{h.description}</p>
                  <p className="text-xs text-muted-foreground">{h.hours}</p>
                </div>
                <a
                  href={`tel:${h.number}`}
                  className="gradient-calm text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-transform hover:scale-105"
                >
                  {h.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidance */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" /> Reach Out Now
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Talk to Someone You Trust", desc: "A friend, family member, teacher, or mentor. You don't have to face this alone." },
              { title: "Contact Campus Counseling", desc: "Most colleges offer free, confidential counseling services. Check your institute's website." },
              { title: "Stay in a Safe Place", desc: "Remove yourself from stressful environments. Stay where you feel comfortable." },
              { title: "Practice Grounding", desc: "Focus on 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste." },
            ].map((item) => (
              <div key={item.title} className="card-calm">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
