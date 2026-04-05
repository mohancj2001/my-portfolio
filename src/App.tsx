import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Education", "Skills", "Projects", "Contact"];

const PROJECTS = [
  {
    id: 1,
    emoji: "🏨",
    name: "OceanBreeze Resorts",
    desc: "M-Commerce hotel room booking system for customers & admins.",
    category: "Hotel Booking",
    badge: "Academic",
    color: "#f472b6",
    tech: ["Java", "Firebase", "GCP"],
  },
  {
    id: 2,
    emoji: "💬",
    name: "ChatNow",
    desc: "Real-time chat messaging application with instant delivery.",
    category: "Messaging",
    badge: "Academic",
    color: "#a78bfa",
    tech: ["React Native", "Firebase"],
  },
  {
    id: 3,
    emoji: "🏥",
    name: "GlobeMed",
    desc: "Healthcare management system built with OODP patterns.",
    category: "Healthcare",
    badge: "Academic",
    color: "#34d399",
    tech: ["Java", "MySQL"],
  },
  {
    id: 4,
    emoji: "🌉",
    name: "SmartBridge",
    desc: "Arduino IoT project with real-time remote control interface.",
    category: "IoT",
    badge: "Academic",
    color: "#22d3ee",
    tech: ["Java", "React", "Arduino"],
  },
  {
    id: 5,
    emoji: "🍬",
    name: "CandyLand",
    desc: "Full-stack Java e-commerce platform with modern UI.",
    category: "E-Commerce",
    badge: "Academic",
    color: "#fbbf24",
    tech: ["Java", "HTML/CSS/JS"],
  },
  {
    id: 6,
    emoji: "🛒",
    name: "EzyShop",
    desc: "Enterprise JavaFX retail & POS application.",
    category: "Enterprise",
    badge: "Ongoing",
    color: "#fb923c",
    tech: ["JavaFX", "MySQL", "Hibernate"],
  },
];

const SKILLS = {
  Languages: { icon: "</>", items: ["Java", "JavaScript", "PHP", "HTML", "CSS"], color: "#22d3ee" },
  Frameworks: { icon: "⚛", items: ["React", "React Native", "Flutter", "Tailwind", "JavaFX"], color: "#a78bfa" },
  Databases: { icon: "🗄", items: ["MySQL", "MongoDB", "SQLite"], color: "#34d399" },
  Tools: { icon: "🔧", items: ["Git", "Firebase", "GCP", "Postman"], color: "#f472b6" },
  Technologies: { icon: "📡", items: ["Android", "Hibernate", "REST APIs"], color: "#fbbf24" },
};

const SOFT_SKILLS = [
  { label: "Problem-solving", icon: "💡", desc: "Analytical thinker" },
  { label: "Communication", icon: "🗣", desc: "Clear & concise" },
  { label: "Time Management", icon: "⏱", desc: "Deadline driven" },
  { label: "Teamwork", icon: "🤝", desc: "Collaborative spirit" },
  { label: "Adaptability", icon: "🔄", desc: "Fast learner" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Languages");
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#070B14", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; max-width: 100vw; overflow-x: hidden; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #070B14; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#6366f1, #ec4899); border-radius: 2px; }

        .noise::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .glow-text {
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .glass-hover:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-4px);
          transition: all 0.3s ease;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .avatar-ring {
          position: relative;
          display: inline-block;
        }
        .avatar-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #6366f1, #ec4899, #22d3ee, #6366f1);
          z-index: 0;
          animation: spin 4s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .skill-tab.active {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
        }

        .project-card:hover .project-glow {
          opacity: 1;
        }

        .hero-gradient {
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%),
                      radial-gradient(ellipse 50% 40% at 80% 50%, rgba(236,72,153,0.06) 0%, transparent 60%);
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6366f1;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Sora', sans-serif;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99,102,241,0.35);
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid;
          flex-shrink: 0;
          position: relative;
        }
        .timeline-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          opacity: 0.2;
          background: currentColor;
        }

        .hero-text { text-align: left; align-items: flex-start; }

        .hero-br { display: inline; }

        @media (max-width: 640px) {
          .hero-br { display: block; }
          .hero-name { font-size: clamp(2.4rem, 12vw, 3.5rem) !important; }
          .hero-inner { flex-direction: column-reverse !important; align-items: center !important; padding: 40px 6vw !important; }
          .hero-text { text-align: center !important; align-items: center !important; display: flex; flex-direction: column; }
          .hero-text p { text-align: center !important; }
          .hero-avatar { margin-bottom: 16px; }
          .hero-pill { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .hero-buttons { justify-content: center !important; }
        }

        @media (max-width: 900px) {
          .hero-inner { gap: 32px !important; }
          .hero-avatar div div { width: clamp(120px, 22vw, 160px) !important; height: clamp(120px, 22vw, 160px) !important; }
        }

        .float-anim {
          animation: floatY 6s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .typing::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .nav-link {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
          padding: 4px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link:hover, .nav-link.active { color: #e2e8f0; }
      `}</style>

   
      <div className="noise" />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(7,11,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700 }}>
            <span style={{ background: "linear-gradient(135deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MC</span>
            <span style={{ color: "#334155", marginLeft: 2 }}>/</span>
          </div>
        
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <span key={l} className={`nav-link ${activeNav === l ? "active" : ""}`} onClick={() => { scrollTo(l); setActiveNav(l); }}>{l}</span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("Contact")} style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              Hire Me
            </button>
          </div>
    
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", fontSize: 24, display: "none" }} className="mobile-menu-btn">
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: "rgba(7,11,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            {NAV_LINKS.map(l => (
              <span key={l} style={{ fontSize: 16, color: "#94a3b8", cursor: "pointer" }} onClick={() => { scrollTo(l); setActiveNav(l); }}>{l}</span>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* HERO */}
      <section id="about" className="grid-bg hero-gradient" style={{ minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-inner" style={{ width: "100%", padding: "60px 5vw", display: "flex", flexDirection: "row", gap: 40, alignItems: "center", justifyContent: "space-between" }}>
          <div className="hero-text" style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div className="hero-pill" style={{ marginBottom: 20, display: "flex" }}>
              <span className="pill" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "blink 1.5s ease infinite" }} />
                Available for work
              </span>
            </div>
            <h1 className="hero-name glow-text" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-0.02em" }}>
              Mohan<span className="hero-br"> </span>Chanaka
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "#64748b", marginBottom: 12, fontWeight: 400 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", color: "#6366f1", fontSize: "0.85em" }}>~/</span> Software Engineer
            </p>
            <p style={{ maxWidth: 520, lineHeight: 1.75, color: "#64748b", fontSize: "clamp(0.9rem, 1.5vw, 1rem)", marginBottom: 36 }}>
              Highly motivated engineer building scalable web, mobile & desktop apps. Passionate about clean architecture, modern design systems, and shipping products that matter.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("Projects")} style={{ padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600, letterSpacing: "0.02em" }}>
                View Projects →
              </button>
              <button onClick={() => scrollTo("Contact")} style={{ padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: "transparent", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.3s", fontFamily: "'Sora', sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8"; }}>
                Contact Me
              </button>
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[["20+", "Projects"], ["3+", "Years Learning"]].map(([n, l]) => (
  <div key={l}>
    <div style={{
      fontSize: "clamp(1.4rem, 3vw, 2rem)",
      fontWeight: 800,
      background: "linear-gradient(135deg,#6366f1,#ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      paddingBottom: "4px",  
      lineHeight: 1.2,      
    }}>{n}</div>
    <div style={{ fontSize: 12, color: "#475569", letterSpacing: "0.05em", marginTop: 2 }}>{l}</div>
  </div>
))}
            </div>
          </div>

       
          <div className="float-anim hero-avatar" style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <div className="avatar-ring">
              <img
  src="src\assets\IMG_2013.HEIC"
  alt="Mohan Chanaka"
  style={{
    width: "clamp(220px, 35vw, 420px)",
    height: "clamp(220px, 35vw, 420px)",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center 30%", 
    position: "relative",
    zIndex: 1,
    display: "block",
  }}
/>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", fontFamily: "'Space Mono', monospace", color: "#64748b" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #6366f1, transparent)" }} />
        </div>
      </section>

   
      <section id="education" style={{ padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 60, textAlign: "center" }}>
              <div className="section-label" style={{ marginBottom: 12 }}>// 01 Background</div>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                Education
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 5, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))" }} />

            {[
              { status: "Currently Pursuing", color: "#6366f1", year: "2024 – Present", degree: "Bsc in Software Engineering", school: "Birmingham City University", note: "Awarded through Java Institute for Advanced Technology" },
              { status: "Completed", color: "#34d399", year: "2022", degree: "Higher National Diploma in Software Engineering", school: "Java Institute For Advanced Technology", note: null },
            ].map((e, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ display: "flex", gap: 24, marginBottom: 40, position: "relative" }}>
                  <div className="timeline-dot" style={{ color: e.color, borderColor: e.color, marginTop: 6, position: "absolute", left: -32 }} />
                  <div className="glass glass-hover" style={{ borderRadius: 16, padding: "28px 32px", flex: 1, transition: "all 0.3s ease", cursor: "default" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      <span className="pill" style={{ background: `${e.color}18`, border: `1px solid ${e.color}40`, color: e.color }}>{e.status}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#475569" }}>{e.year}</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{e.degree}</h3>
                    <p style={{ color: "#64748b", fontSize: 14 }}>{e.school}</p>
                    {e.note && <p style={{ color: "#334155", fontSize: 12, marginTop: 4 }}>({e.note})</p>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 60, textAlign: "center" }}>
              <div className="section-label" style={{ marginBottom: 12 }}>// 02 Expertise</div>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                Skills & Tools
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
              {Object.keys(SKILLS).map(k => (
                <button key={k} className={`skill-tab ${activeSkill === k ? "active" : ""}`} onClick={() => setActiveSkill(k)}
                  style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: activeSkill === k ? undefined : "transparent", color: activeSkill === k ? "white" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "'Sora', sans-serif", transition: "all 0.2s" }}>
                  {k}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass" style={{ borderRadius: 20, padding: "32px 36px", marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: 28 }}>{SKILLS[activeSkill].icon}</span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: SKILLS[activeSkill].color }}>{activeSkill}</h3>
                  <p style={{ fontSize: 12, color: "#475569", fontFamily: "'Space Mono', monospace" }}>{SKILLS[activeSkill].items.length} technologies</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SKILLS[activeSkill].items.map((item, i) => (
                  <span key={item} className="pill" style={{ background: `${SKILLS[activeSkill].color}12`, border: `1px solid ${SKILLS[activeSkill].color}30`, color: SKILLS[activeSkill].color, padding: "8px 16px", fontSize: 13, borderRadius: 8, fontWeight: 500, letterSpacing: "0.02em", textTransform: "none" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="section-label" style={{ marginBottom: 20, textAlign: "center" }}>Soft Skills</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              {SOFT_SKILLS.map((s, i) => (
                <div key={s.label} className="glass glass-hover" style={{ borderRadius: 14, padding: "20px", textAlign: "center", transition: "all 0.3s ease", cursor: "default" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="projects" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 60, textAlign: "center" }}>
              <div className="section-label" style={{ marginBottom: 12 }}>// 03 Portfolio</div>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                Projects
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <div
                  className="project-card"
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    borderRadius: 20, padding: "28px", position: "relative", overflow: "hidden", cursor: "default",
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.35s ease",
                    transform: hoveredProject === p.id ? "translateY(-6px)" : "none",
                    boxShadow: hoveredProject === p.id ? `0 24px 48px ${p.color}18` : "none",
                    borderColor: hoveredProject === p.id ? `${p.color}30` : "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="project-glow" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: hoveredProject === p.id ? 1 : 0, transition: "opacity 0.3s" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ fontSize: 36 }}>{p.emoji}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span className="pill" style={{ background: `${p.color}18`, border: `1px solid ${p.color}30`, color: p.color, padding: "4px 10px" }}>{p.badge}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ color: "#475569", fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontSize: 11, color: "#64748b", background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Space Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#334155" }}>{p.category}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div className="section-label" style={{ marginBottom: 12 }}>// 04 Let's Talk</div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Get In Touch
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px" }}>
              Open to full-time roles, freelance projects, and interesting collaborations. Let's build something great together.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gap: 12, marginBottom: 40 }}>
              {[
                { icon: "📱", label: "Phone", value: "+94 71 3204027", href: "tel:+94713204027" },
                { icon: "📧", label: "Email", value: "mohanchanaka22@gmail.com", href: "mailto:mohanchanaka22@gmail.com" },
                { icon: "📍", label: "Location", value: "Kurunegala, Sri Lanka", href: null },
                { icon: "💻", label: "GitHub", value: "github.com/mohancj2001", href: "https://github.com/mohancj2001" },
              ].map(c => (
                <a key={c.label} href={c.href || undefined} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderRadius: 14, textDecoration: "none", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: c.href ? "pointer" : "default" }}
                  onMouseEnter={e => { if (c.href) { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"; e.currentTarget.style.transform = "translateX(6px)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}>
                  <span style={{ fontSize: 20, width: 40, textAlign: "center" }}>{c.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a href="mailto:mohanchanaka22@gmail.com">
              <button className="btn-primary" style={{ padding: "15px 40px", borderRadius: 12, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", width: "100%", maxWidth: 320 }}>
                Send Me a Message ✉️
              </button>
            </a>
          </FadeIn>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
            <span style={{ background: "linear-gradient(135deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Mohan Chanaka</span>
            <span style={{ color: "#1e293b", marginLeft: 8 }}>— Software Engineer</span>
          </div>
          <p style={{ color: "#1e293b", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>© 2025 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}