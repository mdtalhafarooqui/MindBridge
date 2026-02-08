import { Linkedin, Instagram, Mail, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container max-w-2xl text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">About MindBridge</h1>
          <p className="text-muted-foreground leading-relaxed">A purpose-driven digital health system addressing the growing mental health crisis among Indian students.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16">
        <div className="container max-w-2xl space-y-8">
          <div className="card-calm">
            <h2 className="font-heading text-xl font-bold mb-3">The Problem</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India has over 36 million students in higher education, yet mental health infrastructure remains severely lacking. Studies show that 1 in 5 students experience mental health challenges, but over 80% never seek help due to stigma, lack of awareness, or inaccessible resources. The gap between distress and support is where lives are lost.
            </p>
          </div>

          <div className="card-calm">
            <h2 className="font-heading text-xl font-bold mb-3">Why MindBridge Matters</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MindBridge bridges this gap by offering early detection, guided support, and crisis intervention — all in one accessible platform. It's designed to be the first point of contact for students who may not know where to turn. By combining scored assessments, mood tracking, empathetic chat support, and automatic crisis flagging, MindBridge creates a safety net that works proactively.
            </p>
          </div>

          <div className="card-calm">
            <h2 className="font-heading text-xl font-bold mb-3">Impact and Scalability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This solution demonstrates scalable architecture, data-driven decision making, and real-world impact potential. MindBridge is designed to expand from a single institute to a national-level deployment, with upgrade paths to cloud databases, AI-powered chat, and institutional admin dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl font-bold mb-6 text-center">Developer</h2>
          <div className="card-calm text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full gradient-calm mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-heading font-bold">
              MT
            </div>
            <h3 className="font-heading text-xl font-bold mb-1">Mohammed Talha Farooqui</h3>
            <p className="text-sm text-muted-foreground mb-4">Full-Stack Developer</p>
            <div className="flex justify-center gap-3">
              <a href="mailto:mohammedtalhafarooqui@gmail.com" className="bg-muted p-2.5 rounded-lg hover:bg-primary/10 transition-colors" title="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/mdtalhafarooqui" target="_blank" rel="noopener noreferrer" className="bg-muted p-2.5 rounded-lg hover:bg-primary/10 transition-colors" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mdtalhafarooqui/" target="_blank" rel="noopener noreferrer" className="bg-muted p-2.5 rounded-lg hover:bg-primary/10 transition-colors" title="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
