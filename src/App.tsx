import { useState, useEffect, useRef } from "react";
import React from "react";

const NAV_LINKS = ["About", "Education", "Skills", "Projects", "Contact"];
const ROLES = ["Software Engineer", "Full-Stack Developer", "Mobile App Builder", "Java Enthusiast"];

const PROJECTS = [
  { id: 1, emoji: "🏨", name: "OceanBreeze Resorts", desc: "M-Commerce hotel room booking system for customers & admins.", category: "Hotel Booking", badge: "Academic", tech: ["Java", "Firebase", "GCP"] },
  { id: 2, emoji: "💬", name: "ChatNow", desc: "Real-time chat messaging application with instant delivery.", category: "Messaging", badge: "Academic", tech: ["React Native", "Firebase"] },
  { id: 3, emoji: "🏥", name: "GlobeMed", desc: "Healthcare management system built with OODP patterns.", category: "Healthcare", badge: "Academic", tech: ["Java", "MySQL"] },
  { id: 4, emoji: "🌉", name: "SmartBridge", desc: "Arduino IoT project with real-time remote control interface.", category: "IoT", badge: "Academic", tech: ["Java", "React", "Arduino"] },
  { id: 5, emoji: "🍬", name: "CandyLand", desc: "Full-stack Java e-commerce platform with modern UI.", category: "E-Commerce", badge: "Academic", tech: ["Java", "HTML/CSS/JS"] },
  { id: 6, emoji: "🛒", name: "EzyShop", desc: "Enterprise JavaFX retail & POS application.", category: "Enterprise", badge: "Ongoing", tech: ["JavaFX", "MySQL", "Hibernate"] },
];

const SKILLS: Record<string, { icon: string; items: string[] }> = {
  Languages: { icon: "</>", items: ["Java", "JavaScript", "PHP", "HTML", "CSS"] },
  Frameworks: { icon: "⚛", items: ["React", "React Native", "Tailwind", "JavaFX"] },
  Databases: { icon: "🗄", items: ["MySQL", "MongoDB", "SQLite"] },
  Tools: { icon: "🔧", items: ["Git", "Firebase", "GCP", "Postman"] },
  Technologies: { icon: "📡", items: ["Android", "Hibernate", "REST APIs"] },
};

const SOFT_SKILLS = [
  { label: "Problem-solving", icon: "💡", desc: "Analytical thinker" },
  { label: "Communication", icon: "🗣", desc: "Clear & concise" },
  { label: "Time Management", icon: "⏱", desc: "Deadline driven" },
  { label: "Teamwork", icon: "🤝", desc: "Collaborative spirit" },
  { label: "Adaptability", icon: "🔄", desc: "Fast learner" },
];

const EDUCATION = [
  { status: "Completed", year: "2024 – 2026", degree: "BSc (Hons) Software Engineering", school: "Birmingham City University", note: "Second Class (Division II)" },
  { status: "Completed", year: "2022", degree: "Higher National Diploma in Software Engineering", school: "Java Institute For Advanced Technology", note: null },
];

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function Typewriter() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i % ROLES.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <span className="typing">{text}</span>;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, inView] = useInView(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const id = setInterval(() => { cur += 1; setN(cur); if (cur >= to) clearInterval(id); }, 90);
    return () => clearInterval(id);
  }, [inView, to]);
  return <div ref={ref} style={{ display: "inline" }}>{n}{suffix}</div>;
}

function CodeRain() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const chars = "01{}<>/;=()[]$#&+*".split("");
    const size = 16;
    let cols = 0, drops: number[] = [], raf = 0, last = 0;
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cols = Math.floor(c.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return;
      last = t;
      ctx.fillStyle = "rgba(3,7,5,0.12)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${size}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size;
        ctx.fillStyle = Math.random() > 0.97 ? "#d8ffe9" : "#22ff88";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y);
        if (y > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Languages");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      for (const l of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(l.toLowerCase());
        if (el && el.getBoundingClientRect().top < 160) { setActiveNav(l); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const sk = SKILLS[activeSkill];

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        :root { --bg:#030705; --panel:rgba(16,40,28,.35); --line:rgba(52,255,150,.12); --g:#22ff88; --g2:#00d36a; --g3:#0a7a45; --text:#e6fff1; --mute:#7fa592; --dim:#4a6a58; }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; } html,body,#root { width:100%; overflow-x:hidden; background:#030705; }
        .app { font-family:'Sora',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; width:100%; overflow-x:hidden; position:relative; }
        .mono { font-family:'JetBrains Mono',monospace; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:linear-gradient(var(--g),var(--g3)); border-radius:3px; }
        ::selection { background:var(--g); color:#001a0d; }
        :focus-visible { outline:2px solid var(--g); outline-offset:3px; }

        /* background layers */
        .rain { position:fixed; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; opacity:.22; }
        .bg-grid { position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size:56px 56px; mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 75%);
          animation:gridMove 12s linear infinite; }
        @keyframes gridMove { to { background-position:56px 56px; } }
        .orb { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; animation:orb 14s ease-in-out infinite; }
        .orb.a { width:420px; height:420px; background:rgba(34,255,136,.14); top:-80px; right:-60px; }
        .orb.b { width:360px; height:360px; background:rgba(0,211,106,.10); bottom:5%; left:-80px; animation-delay:-6s; }
        @keyframes orb { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(40px,-50px) scale(1.15); } }
        main, nav, footer { position:relative; z-index:2; }

        /* progress */
        .progress { position:fixed; top:0; left:0; height:2px; z-index:200; background:linear-gradient(90deg,var(--g3),var(--g)); box-shadow:0 0 12px var(--g); transition:width .1s; }

        /* nav */
        .nav { position:fixed; top:0; left:0; right:0; z-index:100; transition:all .4s ease; }
        .nav.s { background:rgba(3,7,5,.85); backdrop-filter:blur(18px); border-bottom:1px solid var(--line); }
        .nav-in { max-width:none; margin:0; padding:0 5vw; height:68px; display:flex; align-items:center; justify-content:space-between; }
        .logo { font-weight:700; font-size:18px; color:var(--g); text-shadow:0 0 14px rgba(34,255,136,.6); }
        .logo i { color:var(--dim); font-style:normal; animation:blink 1.2s step-end infinite; }
        .links { display:flex; gap:30px; align-items:center; }
        .nav-link { position:relative; font-size:13px; color:var(--mute); cursor:pointer; padding:4px 0; transition:color .2s; background:none; border:none; font-family:inherit; }
        .nav-link::after { content:''; position:absolute; left:0; bottom:-2px; height:2px; width:0; background:var(--g); box-shadow:0 0 8px var(--g); transition:width .3s; }
        .nav-link:hover, .nav-link.active { color:var(--g); } .nav-link:hover::after, .nav-link.active::after { width:100%; }
        .burger { display:none; background:none; border:none; color:var(--g); font-size:24px; cursor:pointer; }
        .drawer { background:rgba(3,7,5,.97); border-top:1px solid var(--line); padding:20px 24px; display:flex; flex-direction:column; gap:20px; }
        .drawer button { text-align:left; font-size:16px; }

        /* buttons */
        .btn { position:relative; overflow:hidden; padding:13px 28px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; transition:all .3s; border:1px solid var(--g); }
        .btn-primary { background:var(--g); color:#00200f; box-shadow:0 0 0 rgba(34,255,136,0); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(34,255,136,.45); }
        .btn-primary::after { content:''; position:absolute; top:0; left:-120%; width:60%; height:100%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent); transform:skewX(-20deg); animation:shine 3.5s ease-in-out infinite; }
        @keyframes shine { 0%,60% { left:-120%; } 100% { left:140%; } }
        .btn-ghost { background:transparent; color:var(--g); }
        .btn-ghost:hover { background:rgba(34,255,136,.1); transform:translateY(-2px); }

        /* hero */
        .hero { min-height:100vh; display:flex; align-items:center; padding-top:80px; }
        .hero-in { width:100%; max-width:none; margin:0; padding:60px 5vw; display:flex; gap:48px; align-items:center; justify-content:space-between; }
        .hero-text { flex:1 1 0; min-width:0; }
        .status { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border-radius:999px; font-size:12px; color:var(--g); border:1px solid rgba(34,255,136,.3); background:rgba(34,255,136,.07); }
        .status b { width:7px; height:7px; border-radius:50%; background:var(--g); box-shadow:0 0 10px var(--g); animation:pulse 1.6s infinite; }
        @keyframes pulse { 0% { box-shadow:0 0 0 0 rgba(34,255,136,.7); } 100% { box-shadow:0 0 0 12px rgba(34,255,136,0); } }
        .name { font-size:clamp(2.8rem,7vw,5.5rem); font-weight:800; line-height:1.02; letter-spacing:-.03em; margin:22px 0 14px; color:var(--text); }
        .name span { display:inline-block; background:linear-gradient(120deg,#eafff3 0%,var(--g) 55%,var(--g2) 100%); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .role { font-size:clamp(1rem,2.5vw,1.4rem); color:var(--mute); margin-bottom:14px; min-height:1.8em; }
        .role .p { color:var(--g); margin-right:8px; }
        .typing::after { content:'▍'; color:var(--g); animation:blink 1s step-end infinite; margin-left:2px; }
        @keyframes blink { 50% { opacity:0; } }
        .bio { max-width:520px; line-height:1.8; color:var(--mute); font-size:clamp(.9rem,1.5vw,1rem); margin-bottom:34px; }
        .row { display:flex; gap:12px; flex-wrap:wrap; }
        .stats { display:flex; gap:44px; margin-top:46px; }
        .stat-n { font-size:clamp(1.8rem,3.5vw,2.4rem); font-weight:800; color:var(--g); text-shadow:0 0 22px rgba(34,255,136,.45); }
        .stat-l { font-size:12px; color:var(--dim); margin-top:2px; }

        /* hero entrance (one orchestrated moment) */
        .hero-text > * { opacity:0; transform:translateY(24px); animation:rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-text > *:nth-child(1) { animation-delay:.1s; } .hero-text > *:nth-child(2) { animation-delay:.25s; }
        .hero-text > *:nth-child(3) { animation-delay:.4s; } .hero-text > *:nth-child(4) { animation-delay:.55s; }
        .hero-text > *:nth-child(5) { animation-delay:.7s; } .hero-text > *:nth-child(6) { animation-delay:.85s; }
        @keyframes rise { to { opacity:1; transform:none; } }

        /* avatar */
        .avatar { position:relative; flex-shrink:0; animation:float 6s ease-in-out infinite; }
        @keyframes float { 50% { transform:translateY(-12px); } }
        .avatar img { position:relative; z-index:2; display:block; width:clamp(220px,34vw,400px); height:clamp(220px,34vw,400px); border-radius:50%; object-fit:cover; object-position:center 30%; border:4px solid var(--bg); }
        .ring { position:absolute; inset:-6px; border-radius:50%; z-index:1; background:conic-gradient(from 0deg,var(--g),transparent 30%,var(--g2) 55%,transparent 80%,var(--g)); animation:spin 5s linear infinite; filter:drop-shadow(0 0 18px rgba(34,255,136,.55)); }
        .ring2 { position:absolute; inset:-26px; border-radius:50%; border:1px dashed rgba(34,255,136,.3); animation:spin 28s linear infinite reverse; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .scroll-hint { position:absolute; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--dim); font-size:10px; letter-spacing:.2em; }
        .scroll-hint div { width:1px; height:40px; background:linear-gradient(var(--g),transparent); animation:drip 1.8s ease-in-out infinite; transform-origin:top; }
        @keyframes drip { 0% { transform:scaleY(0); } 60% { transform:scaleY(1); } 100% { transform:scaleY(1); opacity:0; } }

        /* sections */
        .sec { padding:100px 24px; }
        .wrap { margin:0 auto; }
        .head { text-align:center; margin-bottom:56px; }
        .tag { color:var(--g2); font-size:12px; margin-bottom:10px; }
        .h2 { font-size:clamp(2rem,5vw,3rem); font-weight:800; letter-spacing:-.02em; }
        .h2::after { content:''; display:block; width:56px; height:3px; margin:16px auto 0; background:var(--g); border-radius:2px; box-shadow:0 0 14px var(--g); }
        .reveal { opacity:0; transform:translateY(34px); transition:opacity .7s ease, transform .7s ease; }
        .reveal.in { opacity:1; transform:none; }

        .card { background:var(--panel); border:1px solid var(--line); border-radius:16px; backdrop-filter:blur(14px); transition:transform .3s, border-color .3s, box-shadow .3s; }
        .card.hov:hover { transform:translateY(-5px); border-color:rgba(34,255,136,.45); box-shadow:0 18px 44px rgba(34,255,136,.12); }
        .pill { display:inline-flex; align-items:center; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:600; color:var(--g); background:rgba(34,255,136,.09); border:1px solid rgba(34,255,136,.28); }

        /* timeline */
        .tl { position:relative; padding-left:34px; }
        .tl::before { content:''; position:absolute; left:5px; top:0; bottom:0; width:2px; background:linear-gradient(var(--g),rgba(34,255,136,.05)); }
        .tl-item { position:relative; margin-bottom:34px; }
        .dot { position:absolute; left:-34px; top:30px; width:12px; height:12px; border-radius:50%; background:var(--g); box-shadow:0 0 0 0 rgba(34,255,136,.6); animation:pulse 2s infinite; }

        /* skills */
        .tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:26px; }
        .tab { padding:8px 18px; border-radius:8px; border:1px solid var(--line); background:transparent; color:var(--mute); cursor:pointer; font-size:13px; font-weight:500; font-family:inherit; transition:all .25s; }
        .tab:hover { color:var(--g); border-color:rgba(34,255,136,.4); }
        .tab.on { background:var(--g); color:#00200f; border-color:var(--g); box-shadow:0 0 22px rgba(34,255,136,.4); }
        .chip { display:inline-block; padding:9px 18px; border-radius:8px; font-size:13px; font-weight:500; color:var(--g); background:rgba(34,255,136,.07); border:1px solid rgba(34,255,136,.25); animation:pop .45s cubic-bezier(.2,.9,.3,1.3) backwards; transition:all .2s; }
        .chip:hover { background:var(--g); color:#00200f; transform:translateY(-3px); }
        @keyframes pop { from { opacity:0; transform:scale(.6) translateY(10px); } }
        .soft { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; }
        .soft .card { padding:20px; text-align:center; }

        /* projects */
        .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr)); gap:20px; }
        .proj { padding:28px; position:relative; overflow:hidden; height:100%; }
        .proj::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--g),transparent); transform:scaleX(0); transition:transform .4s; }
        .proj:hover::before { transform:scaleX(1); }
        .proj .emo { font-size:36px; transition:transform .4s; display:inline-block; } .proj:hover .emo { transform:scale(1.2) rotate(-8deg); }
        .tech { font-size:11px; color:var(--mute); background:rgba(34,255,136,.05); padding:4px 10px; border-radius:6px; border:1px solid var(--line); }

        /* contact */
        .contact-link { display:flex; align-items:center; gap:16px; padding:18px 24px; border-radius:14px; text-decoration:none; background:var(--panel); border:1px solid var(--line); transition:all .3s; }
        .contact-link.hasref:hover { background:rgba(34,255,136,.08); border-color:rgba(34,255,136,.45); transform:translateX(8px); }

        footer { border-top:1px solid var(--line); padding:30px 24px; }

        @media (max-width:768px) { .links { display:none; } .burger { display:block; } }
        @media (max-width:760px) {
          .hero-in { flex-direction:column-reverse; text-align:center; padding:40px 6vw; gap:34px; }
          .hero-text .row, .stats { justify-content:center; } .bio { margin-left:auto; margin-right:auto; }
        }
        @media (prefers-reduced-motion:reduce) { *, *::before, *::after { animation:none !important; transition:none !important; } .reveal, .hero-text > * { opacity:1 !important; transform:none !important; } }
      `}</style>

      <div className="progress" style={{ width: `${progress}%` }} />
      <CodeRain />
      <div className="bg-grid" />
      <div className="orb a" />
      <div className="orb b" />

      <nav className={`nav ${scrolled ? "s" : ""}`}>
        <div className="nav-in">
          <div className="logo mono">MC<i>_</i></div>
          <div className="links">
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link ${activeNav === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
            ))}
            <button className="btn btn-primary" style={{ padding: "8px 20px", fontSize: 13 }} onClick={() => scrollTo("Contact")}>Hire Me</button>
          </div>
          <button className="burger" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button>
        </div>
        {menu && (
          <div className="drawer">
            {NAV_LINKS.map(l => <button key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</button>)}
          </div>
        )}
      </nav>

      <main>
        <section id="about" className="hero" style={{ position: "relative" }}>
          <div className="hero-in">
            <div className="hero-text">
              <span className="status mono"><b />Available for work</span>
              <h1 className="name"><span>Mohan</span> <span>Chanaka</span></h1>
              <p className="role mono"><span className="p">~/</span><Typewriter /></p>
              <p className="bio">Highly motivated engineer building scalable web, mobile & desktop apps. Passionate about clean architecture, modern design systems, and shipping products that matter.</p>
              <div className="row">
                <button className="btn btn-primary" onClick={() => scrollTo("Projects")}>View Projects →</button>
                <button className="btn btn-ghost" onClick={() => scrollTo("Contact")}>Contact Me</button>
              </div>
              <div className="stats">
                <div><div className="stat-n"><Counter to={15} suffix="+" /></div><div className="stat-l">Projects</div></div>
                <div><div className="stat-n"><Counter to={3} suffix="+" /></div><div className="stat-l">Years Experience</div></div>
              </div>
            </div>
            <div className="avatar">
              <div className="ring2" />
              <div className="ring" />
              <img src="/img_2013.jpg" alt="Mohan Chanaka" />
            </div>
          </div>
          <div className="scroll-hint mono"><span>SCROLL</span><div /></div>
        </section>

        <section id="education" className="sec">
          <div className="wrap" style={{ maxWidth: 800 }}>
            <Reveal><div className="head"><div className="tag mono">// background</div><h2 className="h2">Education</h2></div></Reveal>
            <div className="tl">
              {EDUCATION.map((e, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="tl-item">
                    <div className="dot" />
                    <div className="card hov" style={{ padding: "28px 32px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                        <span className="pill">{e.status}</span>
                        <span className="mono" style={{ fontSize: 12, color: "var(--dim)" }}>{e.year}</span>
                      </div>
                      <h3 style={{ fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700, marginBottom: 6 }}>{e.degree}</h3>
                      <p style={{ color: "var(--mute)", fontSize: 14 }}>{e.school}</p>
                      {e.note && <p style={{ color: "var(--dim)", fontSize: 12, marginTop: 4 }}>({e.note})</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="sec" style={{ background: "rgba(34,255,136,.015)" }}>
          <div className="wrap" style={{ maxWidth: 1100 }}>
            <Reveal><div className="head"><div className="tag mono">// expertise</div><h2 className="h2">Skills & Tools</h2></div></Reveal>
            <Reveal delay={0.1}>
              <div className="tabs">
                {Object.keys(SKILLS).map(k => (
                  <button key={k} className={`tab ${activeSkill === k ? "on" : ""}`} onClick={() => setActiveSkill(k)}>{k}</button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card" style={{ padding: "32px 36px", marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <span style={{ fontSize: 28, color: "var(--g)" }} className="mono">{sk.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--g)" }}>{activeSkill}</h3>
                    <p className="mono" style={{ fontSize: 12, color: "var(--dim)" }}>{sk.items.length} technologies</p>
                  </div>
                </div>
                <div key={activeSkill} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {sk.items.map((item, i) => <span key={item} className="chip" style={{ animationDelay: `${i * 0.07}s` }}>{item}</span>)}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="tag mono" style={{ textAlign: "center", marginBottom: 20 }}>Soft skills</p>
              <div className="soft">
                {SOFT_SKILLS.map(s => (
                  <div key={s.label} className="card hov">
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "var(--dim)" }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="sec">
          <div className="wrap" style={{ maxWidth: 1200 }}>
            <Reveal><div className="head"><div className="tag mono">// portfolio</div><h2 className="h2">Projects</h2></div></Reveal>
            <div className="grid">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <div className="card hov proj">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <span className="emo">{p.emoji}</span>
                      <span className="pill">{p.badge}</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ color: "var(--mute)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tech.map(t => <span key={t} className="tech mono">{t}</span>)}
                    </div>
                    <div className="mono" style={{ marginTop: 16, fontSize: 11, color: "var(--dim)" }}>{p.category}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sec">
          <div className="wrap" style={{ maxWidth: 700, textAlign: "center" }}>
            <Reveal>
              <div className="head" style={{ marginBottom: 24 }}><div className="tag mono">// let's talk</div><h2 className="h2">Get In Touch</h2></div>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 44px" }}>
                Open to full-time roles, freelance projects, and interesting collaborations. Let's build something great together.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "grid", gap: 12, marginBottom: 40 }}>
                {[
                  { icon: "📱", label: "Phone", value: "+94 71 3204027", href: "tel:+94713204027" },
                  { icon: "📧", label: "Email", value: "mohanchanaka22@gmail.com", href: "mailto:mohanchanaka22@gmail.com" },
                  { icon: "📍", label: "Location", value: "Kurunegala, Sri Lanka", href: null },
                  { icon: "💻", label: "GitHub", value: "github.com/mohancj2001", href: "https://github.com/mohancj2001" },
                ].map(c => (
                  <a key={c.label} className={`contact-link ${c.href ? "hasref" : ""}`} href={c.href || undefined}
                    target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ cursor: c.href ? "pointer" : "default" }}>
                    <span style={{ fontSize: 20, width: 40, textAlign: "center" }}>{c.icon}</span>
                    <div style={{ textAlign: "left" }}>
                      <div className="mono" style={{ fontSize: 11, color: "var(--g2)", marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="mailto:mohanchanaka22@gmail.com">
                <button className="btn btn-primary" style={{ padding: "15px 40px", fontSize: 15, width: "100%", maxWidth: 320 }}>Send Me a Message ✉️</button>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="mono" style={{ fontSize: 14 }}>
            <span style={{ color: "var(--g)", fontWeight: 700 }}>Mohan Chanaka</span>
            <span style={{ color: "var(--dim)", marginLeft: 8 }}>— Software Engineer</span>
          </div>
          <p className="mono" style={{ color: "var(--dim)", fontSize: 12 }}>© 2026 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}