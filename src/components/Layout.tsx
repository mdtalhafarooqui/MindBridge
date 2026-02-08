import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/assessment", label: "Assessment" },
  { path: "/chat", label: "Chat Support" },
  { path: "/journal", label: "Journal" },
  { path: "/crisis", label: "Crisis Help" },
  { path: "/about", label: "About" },
  { path: "/admin", label: "Admin" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-semibold">
            <Heart className="h-6 w-6 text-primary fill-primary/20" />
            <span className="text-gradient">MindBridge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-background p-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-muted/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="mb-2 font-medium">⚠️ Disclaimer: MindBridge is a support tool, not a replacement for professional medical advice or treatment.</p>
          <p>© 2025 MindBridge · Built for Smart India Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
