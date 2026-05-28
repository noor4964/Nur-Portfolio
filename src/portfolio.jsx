import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL CSS  (fonts + keyframes + utilities)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}

::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--muted-2);}

::selection{background:var(--accent);color:var(--bg);}

/* ── keyframes ── */
@keyframes fadeUp{
  from{opacity:0;transform:translateY(30px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes floatY{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-18px);}
}
@keyframes grain{
  0%,100%{transform:translate(0,0);}
  20%{transform:translate(-1px,-1px);}
  40%{transform:translate(1px,1px);}
  60%{transform:translate(-1px,1px);}
  80%{transform:translate(1px,-1px);}
}
@keyframes pulseRing{
  0%{transform:scale(1);opacity:0.8;}
  100%{transform:scale(2.4);opacity:0;}
}
@keyframes sweepLine{
  0%{transform:scaleX(0);transform-origin:left;}
  50%{transform:scaleX(1);transform-origin:left;}
  51%{transform:scaleX(1);transform-origin:right;}
  100%{transform:scaleX(0);transform-origin:right;}
}

/* ── sequential hero reveals ── */
.h1{opacity:0;animation:fadeUp .7s ease .15s forwards;}
.h2{opacity:0;animation:fadeUp .7s ease .30s forwards;}
.h3{opacity:0;animation:fadeUp .7s ease .45s forwards;}
.h4{opacity:0;animation:fadeUp .7s ease .58s forwards;}
.h5{opacity:0;animation:fadeUp .7s ease .72s forwards;}
.h6{opacity:0;animation:fadeUp .7s ease .88s forwards;}

/* ── scroll reveal ── */
.reveal{
  opacity:0;
  transform:translateY(28px);
  transition:opacity .75s ease,transform .75s ease;
}
.reveal.vis{opacity:1;transform:translateY(0);}
.reveal-d1{transition-delay:.08s;}
.reveal-d2{transition-delay:.16s;}
.reveal-d3{transition-delay:.24s;}

/* ── noise overlay ── */
.noise{
  position:fixed;inset:0;pointer-events:none;z-index:9999;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E");
  animation:grain .55s steps(1) infinite;opacity:.055;
}

/* ── custom cursor ── */
.cdot{
  position:fixed;width:10px;height:10px;background:var(--accent);
  border-radius:50%;pointer-events:none;z-index:99999;
  mix-blend-mode:difference;transform:translate(-50%,-50%);
}

.cring{
  position:fixed;width:30px;height:30px;
  border:1px solid var(--ring);border-radius:50%;
  pointer-events:none;z-index:99998;transform:translate(-50%,-50%);
}

/* ── nav ── */
.nl{
  font-family:'Space Mono',monospace;font-size:10.5px;color:var(--muted);
  letter-spacing:.12em;text-transform:uppercase;border:none;
  background:none;cursor:pointer;transition:color .25s;padding:4px 0;
}
.nl:hover,.nl.on{color:var(--accent);}

/* ── buttons ── */
.btnP{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 28px;background:var(--accent);color:var(--bg);
  font-family:'Space Mono',monospace;font-size:10.5px;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  border:none;cursor:pointer;position:relative;overflow:hidden;
  border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.18);
  transition:transform .2s ease,box-shadow .2s ease;
}
.btnP::after{
  content:'';position:absolute;inset:0;background:var(--bg);
  transform:translateX(-101%);transition:transform .3s ease;
}
.btnP:hover::after{transform:translateX(0);}
.btnP span{position:relative;z-index:1;transition:color .3s .05s;}
.btnP:hover span{color:var(--accent);}
.btnP:hover{transform:translateY(-1px);box-shadow:0 16px 34px rgba(0,0,0,.22);}

.btnO{
  display:inline-flex;align-items:center;gap:8px;
  padding:12px 28px;background:transparent;color:var(--text);
  font-family:'Space Mono',monospace;font-size:10.5px;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  border:1px solid var(--input-border);cursor:pointer;
  border-radius:10px;
  transition:border-color .3s,color .3s,background .3s;
}
.btnO:hover{border-color:var(--muted);color:var(--accent);}

/* ── skill pills ── */
.sp{
  display:inline-block;padding:5px 13px;
  border:1px solid var(--card-border);background:var(--card);
  font-family:'Space Mono',monospace;font-size:10.5px;color:var(--muted-2);
  transition:border-color .22s,color .22s,transform .22s;cursor:default;
  border-radius:999px;
}
.sp:hover{border-color:var(--muted);color:var(--accent);transform:translateY(-2px);}

/* ── project cards ── */
.pc{
  background:var(--card);border:1px solid var(--card-border);
  padding:28px;position:relative;overflow:hidden;
  will-change:transform;
  transition:border-color .3s,background .3s,box-shadow .3s;
  border-radius:16px;cursor:pointer;
  box-shadow:0 14px 40px rgba(0,0,0,.16);
}
.pc::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--accent),transparent);
  transform:scaleX(0);transition:transform .4s ease;
}
.pc:hover{border-color:var(--muted);background:var(--card);box-shadow:0 18px 46px rgba(0,0,0,.22);}
.pc:hover::before{transform:scaleX(1);}
.pc:hover{transform:perspective(900px) scale(1.22);}

/* ── publication items ── */
.pi{
  border-left:2px solid var(--card-border);padding:20px 24px;
  transition:border-color .3s;
  background:var(--bg-2);border-radius:12px;
}
.pi:hover{border-left-color:var(--muted);}

/* ── section label ── */
.slbl{
  font-family:'Space Mono',monospace;font-size:10px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--muted);
}

/* ── grid bg ── */
.gbg{
  position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(var(--card-border) 1px,transparent 1px),
    linear-gradient(90deg,var(--card-border) 1px,transparent 1px);
  background-size:64px 64px;opacity:.5;
}

/* ── status dot ── */
.sdot{
  display:inline-block;width:7px;height:7px;
  border-radius:50%;background:#3fca78;position:relative;flex-shrink:0;
}
.sdot::before{
  content:'';position:absolute;inset:0;border-radius:50%;background:#3fca78;
  animation:pulseRing 2s ease infinite;
}

/* ── stat box ── */
.stbox{background:var(--card);padding:34px 26px;}

/* ── contact input ── */
.ci{
  background:var(--bg-2);border:1px solid var(--input-border);color:var(--text);
  padding:13px 16px;font-family:'Outfit',sans-serif;font-size:13.5px;
  width:100%;outline:none;resize:none;
  transition:border-color .25s;font-size:14px;
  border-radius:10px;
}
.ci:focus{border-color:var(--muted);}
.ci::placeholder{color:var(--muted-2);}

/* ── timeline dot ── */
.tdot{
  width:6px;height:6px;border-radius:50%;background:var(--muted);
  flex-shrink:0;margin-top:6px;
}


/* ── stack ── */
.stack-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;}
.stack-card{background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:16px;}
.stack-title{font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);letter-spacing:.14em;margin-bottom:10px;}
.stack-items{display:flex;flex-wrap:wrap;gap:8px;}
.stack-items span{font-family:'Space Mono',monospace;font-size:9px;color:var(--muted-2);padding:4px 8px;border:1px solid var(--card-border);background:var(--bg-2);}

@media (max-width:1100px){
  .stack-grid{grid-template-columns:repeat(3,1fr);}
}
@media (max-width:680px){
  .stack-grid{grid-template-columns:1fr;}
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    n:"01", title:"DeepDetect", sub:"Deepfake Detection System",
    desc:"Hybrid EfficientNet + ViT architecture with progressive layer unfreezing for binary deepfake classification on a large-scale dataset.",
    tags:["PyTorch","EfficientNet","ViT","OpenCV"], year:"2025", type:"Research",
    link:"https://github.com/noor4964",
  },
  {
    n:"02", title:"YOLOv8 Weather", sub:"Adverse Weather Detection",
    desc:"Multi-source adverse-weather dataset (rain, cloud, snow) unified into 18-class schema via Roboflow. Fine-tuned on Tesla T4 GPU.",
    tags:["YOLOv8","Roboflow","Python","Object Detection"], year:"2024–25", type:"Research",
    link:"https://github.com/noor4964",
  },
  {
    n:"03", title:"JARVIS", sub:"Voice-Controlled AI Agent",
    desc:"Fully local Windows AI agent using Porcupine wake word, Vosk STT, Ollama/LLaMA, PyAutoGUI, ChromaDB, and Piper TTS.",
    tags:["Python","Ollama","LLaMA","ChromaDB","Piper TTS"], year:"2024", type:"AI/ML",
    link:"https://github.com/noor4964",
  },
  {
    n:"04", title:"Safe Ride Connect", sub:"University Ridesharing App",
    desc:"Secure ridesharing for AIUB students with Firebase Auth, university email validation, and real-time location sharing via Expo Maps.",
    tags:["React Native","Firebase","TypeScript","Maps"], year:"2025", type:"Mobile",
    link:"https://github.com/noor4964",
  },
  {
    n:"05", title:"Chatify", sub:"Cross-Platform Social Media",
    desc:"Flutter social media platform with real-time chat, WebSocket gateways, Firebase push notifications, and Cloudinary media storage.",
    tags:["Flutter","Dart","Firebase","WebSockets"], year:"2025", type:"Full-Stack",
    link:"https://github.com/noor4964",
  },
  {
    n:"06", title:"DevCollab Hub", sub:"NestJS Collaboration Platform",
    desc:"Full capstone platform with JWT auth, GraphQL API, WebSocket rooms, role-based access control, and PostgreSQL via TypeORM.",
    tags:["NestJS","GraphQL","PostgreSQL","React"], year:"2024–25", type:"Full-Stack",
    link:"https://github.com/noor4964",
  },
];

const SKILLS = [
  {cat:"Languages", items:["Python","TypeScript","JavaScript","PHP","C/C++","R","Dart"]},
  {cat:"AI / ML",   items:["PyTorch","TensorFlow","Scikit-learn","OpenCV","YOLOv8","HuggingFace"]},
  {cat:"Web Dev",   items:["React","Next.js","NestJS","Node.js","Laravel","REST API","GraphQL","WebSockets"]},
  {cat:"Databases", items:["PostgreSQL","Firebase","MySQL","MongoDB","ChromaDB"]},
  {cat:"Tools",     items:["Git","Docker","Linux","Google Colab","Roboflow","Kaggle","Figma","Postman"]},
];

const PUBS = [
  {
    title:"Comparative Analysis with Hybrid Model Design for Deep Learning Approaches in Detecting Plant Diseases",
    venue:"ICCIT 2025",
    authors:"SK. Nur Alam, Naved Akhter, Riazul Zannah, Sharfuddin Mahmood",
    tag:"Published",
  },
  {
    title:"Design and Analysis of a GSM and GPS-Based Smart Stick for Visually Challenged Persons with Real-Time Location Sharing and Obstacle Detection",
    venue:"International Conference",
    authors:"SK. Nur Alam, Md Zahedul Islam Tapu, Nipa Akter, Sanjida Affrin Bristi, Faisal Ahmed, Prof. Dr. Engr. Muhibul Haque Bhuyan",
    tag:"Published",
  },
  {
    title:"A Systematic Review of LLM-Based Conversational Agents in Student Education",
    venue:"ICCA 2026 — HCI Track",
    authors:"SK. Nur Alam et al.",
    tag:"In Preparation",
  },
  {
    title:"Benchmarking Lightweight Vision Transformers for Real-Time Deepfake Screening",
    venue:"Workshop Track",
    authors:"SK. Nur Alam, Collaborators",
    tag:"In Review",
  },
  {
    title:"Federated Edge Learning for Safety-Critical IoT Assistive Devices",
    venue:"Under Submission",
    authors:"SK. Nur Alam, Team",
    tag:"In Review",
  },
];

const RESUME_URL = "https://example.com/resume.pdf";


const STACK = [
  { title:"Languages", items:["Python","TypeScript","JavaScript","Dart"] },
  { title:"Frameworks", items:["React","Next.js","NestJS","Flutter"] },
  { title:"AI/ML", items:["PyTorch","TensorFlow","YOLOv8","OpenCV"] },
  { title:"Data", items:["PostgreSQL","MongoDB","Firebase","ChromaDB"] },
  { title:"Ops", items:["Docker","Linux","Git","CI/CD"] },
];


/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1, rootMargin:"0px 0px -36px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/* Floating 3-D cube that reacts to mouse */
function Cube({ mx, my }) {
  const rx = my * -10;
  const ry = mx * 12 + 18;
  const faces = [
    "translateZ(90px)",
    "rotateY(180deg) translateZ(90px)",
    "rotateY(90deg) translateZ(90px)",
    "rotateY(-90deg) translateZ(90px)",
    "rotateX(90deg) translateZ(90px)",
    "rotateX(-90deg) translateZ(90px)",
  ];
  return (
    <div style={{
      position:"absolute", right:"10%", top:"50%", marginTop:-90,
      width:180, height:180, transformStyle:"preserve-3d",
      transform:`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      transition:"transform .09s linear",
      animation:"floatY 7s ease-in-out infinite",
    }}>
      {faces.map((f,i) => (
        <div key={i} style={{
          position:"absolute", width:180, height:180,
          transform:f,
          background:`rgba(232,232,232,0.0${i+1})`,
          border:"1px solid rgba(232,232,232,0.07)",
        }}/>
      ))}
      {/* inner cross on front face */}
      <div style={{ position:"absolute", width:180, height:180, transform:"translateZ(91px)" }}>
        <div style={{ position:"absolute", width:"100%", height:1, background:"rgba(232,232,232,.08)", top:"50%", transform:"rotate(45deg)" }}/>
        <div style={{ position:"absolute", width:"100%", height:1, background:"rgba(232,232,232,.05)", top:"50%", transform:"rotate(-45deg)" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:1, height:"60%", background:"rgba(232,232,232,.05)" }}/>
        </div>
      </div>
    </div>
  );
}

/* 3-D tilt project card */
function ProjectCard({ proj, delay, onView }) {
  const ref = useRef(null);
  const onMove = e => {
    const r = ref.current; if (!r) return;
    const rect = r.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - .5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - .5) * -14;
    r.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.018)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };
  const open = () => onView(proj);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };
  return (
    <div
      ref={ref}
      className={`pc reveal`}
      role="button"
      tabIndex={0}
      aria-label={`Open ${proj.title} details`}
      style={{ transitionDelay: `${delay}s`, transition:"transform .12s ease,border-color .3s,background .3s,box-shadow .3s" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={open}
      onKeyDown={onKey}
    >
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20, alignItems:"flex-start" }}>
        <span style={{ fontFamily:"'Bebas Neue'", fontSize:42, color:"var(--muted)", lineHeight:1 }}>{proj.n}</span>
        <span style={{
          fontFamily:"'Space Mono',monospace", fontSize:9, color:"var(--muted-2)",
          padding:"3px 8px", border:"1px solid var(--card-border)", letterSpacing:".1em", marginTop:4,
        }}>{proj.type}</span>
      </div>
      <h3 style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:".04em", color:"var(--text)", marginBottom:3 }}>{proj.title}</h3>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", letterSpacing:".08em", marginBottom:14 }}>{proj.sub}</div>
      <p style={{ fontSize:12.5, color:"var(--muted-2)", lineHeight:1.8, marginBottom:20 }}>{proj.desc}</p>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {proj.tags.map(t => (
          <span key={t} style={{
            fontFamily:"'Space Mono',monospace", fontSize:9, color:"var(--muted-2)",
            padding:"2px 7px", background:"var(--bg-2)", border:"1px solid var(--card-border)",
          }}>{t}</span>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:20, right:20, fontFamily:"'Space Mono',monospace", fontSize:9, color:"var(--muted-2)" }}>{proj.year}</div>
      <button
        className="btnO"
        style={{ marginTop:18, fontSize:9, padding:"8px 14px" }}
        onClick={(e) => { e.stopPropagation(); open(); }}
        aria-label={`View ${proj.title} details`}
      >
        View Project
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [active,   setActive]   = useState("home");
  const [curPos,   setCurPos]   = useState({ x:-100, y:-100 });
  const [ringPos,  setRingPos]  = useState({ x:-100, y:-100 });
  const [heroMx,   setHeroMx]   = useState(0);
  const [heroMy,   setHeroMy]   = useState(0);
  const [form,     setForm]     = useState({ name:"", email:"", msg:"" });
  const [sent,     setSent]     = useState(false);
  const [errors,   setErrors]   = useState({ email:false, msg:false });
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollT, setScrollT] = useState(0);
  const [marqueePaused, setMarqueePaused] = useState(false);

  const ringRef = useRef({ x:-100, y:-100 });
  const rafRef  = useRef(null);

  useScrollReveal();

  useEffect(()=>{ setMounted(true); }, []);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* cursor + parallax */
  useEffect(() => {
    const onMove = e => {
      setCurPos({ x: e.clientX, y: e.clientY });
      setHeroMx((e.clientX / window.innerWidth  - .5) * 2);
      setHeroMy((e.clientY / window.innerHeight - .5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* scroll tilt for 3D scene */
  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(window.scrollY / (window.innerHeight || 1), 1);
      setScrollT(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lagged cursor ring */
  useEffect(() => {
    const tick = () => {
      ringRef.current.x += (curPos.x - ringRef.current.x) * .12;
      ringRef.current.y += (curPos.y - ringRef.current.y) * .12;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [curPos]);

  /* scroll spy */
  useEffect(() => {
    const ids = [
      "home",
      "about",
      "stack",
      "skills",
      "projects",
      "publications",
      "contact",
    ];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: .35 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // close mobile menu on Escape or when resizing up
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key === 'Escape') setMobileOpen(false); };
    const onResizeClose = ()=>{ if(window.innerWidth >= 900) setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResizeClose);
    return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResizeClose); };
  }, []);

  // load and persist theme to localStorage
  useEffect(()=>{
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
  }, []);

  useEffect(()=>{
    localStorage.setItem('theme', theme);
    // apply theme class to html root for proper cascade
    if(theme === 'light') document.documentElement.classList.add('light-theme');
    else document.documentElement.classList.remove('light-theme');
  }, [theme]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const NAV = [
    "home",
    "about",
    "stack",
    "skills",
    "projects",
    "publications",
    "contact",
  ];

  const renderHeroWord = (word, baseZ) => {
    const mid = (word.length - 1) / 2;
    return word.split("").map((ch, i) => {
      const offset = i - mid;
      const z = baseZ + Math.abs(offset) * 4.5;
      const tx = heroMx * 8.5 * offset;
      const ty = heroMy * 8.5 * offset;
      if (ch === " ") {
        return <span key={`sp-${i}`} className="hero-letter hero-letter-space" style={{ transform:`translateZ(${z}px)` }} />;
      }
      return (
        <span
          key={`${ch}-${i}`}
          className="hero-letter"
          style={{ transform:`translateZ(${z}px) translateX(${tx}px) translateY(${ty}px)` }}
        >
          {ch}
        </span>
      );
    });
  };

  /* ── render ── */
  return (
    <div style={{ background:"var(--bg)", color:"var(--text)", fontFamily:"'Outfit',sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* noise */}
      <div className="noise"/>

      {/* cursor */}
      <div className="cdot"  style={{ left:curPos.x,  top:curPos.y  }}/>
      <div className="cring" style={{ left:ringPos.x, top:ringPos.y }}/>

      {/* ══════════ NAV ══════════ */}
      <nav className={"nav-anim" + (mounted?" visible":"")} style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding:"18px 44px", display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:"1px solid var(--card-border)",
        background:"var(--bg)", backdropFilter:"blur(18px)",
      }}>
        <div style={{ fontFamily:"'Bebas Neue'", fontSize:19, letterSpacing:".1em", color:"var(--text)" }}>
          SN.ALAM
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div className="nav-links" style={{ display:"flex" }}>
            {NAV.map(s => (
              <button key={s} className={`nl ${active===s?"on":""}`} onClick={() => { go(s); setMobileOpen(false); }}>{s}</button>
            ))}
          </div>
          <button
            className="theme-toggle"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={() => setTheme(v => v === 'dark' ? 'light' : 'dark')}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="hamburger"
            aria-label={mobileOpen?"Close menu":"Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            style={{ marginLeft:8 }}
          >
            <span className="bar" aria-hidden="true"/>
            <span className="bar" aria-hidden="true"/>
            <span className="bar" aria-hidden="true"/>
          </button>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:80 }}>
        <div className="gbg"/>
        <div className="hero-orb hero-orb-a" aria-hidden="true" />
        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <div className="hero-floor" aria-hidden="true" />
        <div
          className="hero-3d-scene"
          style={{
            transform:`rotateX(${heroMy * 6 + scrollT * 6}deg) rotateY(${heroMx * 6 - scrollT * 4}deg)`
          }}
          aria-hidden="true"
        >
          <div className="hero-3d-layer l1">
            <img className="hero-3d-photo" src="/photo1.jpg" alt="" aria-hidden="true" />
          </div>
          <div className="hero-3d-layer l2">
            <img className="hero-3d-photo" src="/photo2.jpg" alt="" aria-hidden="true" />
          </div>
          <div className="hero-3d-layer l3">
            <img className="hero-3d-photo" src="/photo3.jpg" alt="" aria-hidden="true" />
          </div>
          <div
            className="hero-3d-spec"
            style={{
              transform:`translateX(${heroMx * 120}px) translateY(${heroMy * 120}px)`
            }}
          />
        </div>
        {/* radial glow */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 25% 50%,rgba(255,255,255,.014) 0%,transparent 65%)", pointerEvents:"none" }}/>
        {/* horizontal accent line */}
        <div style={{ position:"absolute", bottom:"28%", left:0, right:0, height:1, background:"var(--card-border)" }}/>

        {width >= 900 ? <Cube mx={heroMx} my={heroMy}/> : null}

        <div
          id="hero-content"
          className={"hero-animate" + (mounted?" visible":"")}
          style={{
            padding:"0 44px",
            maxWidth:1100,
            width:"100%",
            position:"relative",
            zIndex:1,
            transform:`perspective(900px) rotateX(${heroMy * 2}deg) rotateY(${heroMx * 2}deg)`,
            willChange:"transform",
          }}
        >
          {/* status row */}
          <div className="h1" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:30 }}>
            <span className="sdot"/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10.5, color:"var(--muted)", letterSpacing:".15em" }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          {/* big name */}
          <h1 className="h2 hero-title hero-title-bevel" data-text="SK. NUR" style={{
            fontFamily:"'Bebas Neue'", fontSize:"clamp(70px,13vw,150px)",
            lineHeight:.88, letterSpacing:"-.01em", color:"var(--text)", marginBottom:6,
          }}>{renderHeroWord("SK. NUR", 28)}</h1>
          <h1 className="h3 hero-title hero-title-stroke hero-title-bevel" data-text="ALAM" style={{
            fontFamily:"'Bebas Neue'", fontSize:"clamp(70px,13vw,150px)",
            lineHeight:.88, letterSpacing:"-.01em",
            color:"transparent", WebkitTextStroke:"1px var(--card-border)", marginBottom:38,
          }}>{renderHeroWord("ALAM", 24)}</h1>

          {/* descriptor row */}
          <div className="h4" style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:0, marginBottom:50 }}>
            {[
              {t:"AI / ML Researcher",     hi:true},
              {t:"Full-Stack Developer",    hi:false},
              {t:"CSE @ AIUB · 3.80 GPA", hi:false},
            ].map((item,i) => (
              <div key={i} style={{
                fontFamily:"'Space Mono',monospace", fontSize:10.5,
                color: item.hi ? "var(--muted)" : "var(--muted-2)",
                letterSpacing:".1em",
                paddingRight: i < 2 ? 22 : 0,
                borderRight:  i < 2 ? "1px solid var(--card-border)" : "none",
                paddingLeft:  i > 0 ? 22 : 0,
              }}>{item.t}</div>
            ))}
          </div>

          {/* CTAs */}
          <div className="h5 hero-cta" style={{ display:"flex", gap:14 }}>
            <button className="btnP" onClick={() => go("projects")}><span>View Work</span></button>
            <button className="btnO" onClick={() => go("contact")}>Get In Touch</button>
            <a className="btnO" href={RESUME_URL} target="_blank" rel="noreferrer">Download Resume</a>
          </div>
        </div>

        {/* scroll hint */}
        <div className="h6" style={{
          position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:10,
        }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8.5, color:"var(--muted-2)", letterSpacing:".22em" }}>SCROLL</div>
          <div style={{ width:1, height:44, background:"linear-gradient(var(--muted-2),transparent)" }}/>
        </div>
      </section>


      {/* ══════════ STACK ══════════ */}
      <section id="stack" style={{ borderTop:"1px solid var(--card-border)", padding:"96px 44px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:40 }}>
            <div className="slbl" style={{ marginBottom:14 }}>// 02 — Stack</div>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(36px,5vw,64px)", color:"var(--text)" }}>Tools & Platforms</h2>
          </div>
          <div className="stack-grid">
            {STACK.map((s) => (
              <div key={s.title} className="stack-card reveal">
                <div className="stack-title">{s.title}</div>
                <div className="stack-items">
                  {s.items.map((i) => <span key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileOpen? 'open':''}`} role="menu" aria-hidden={!mobileOpen}>
        {NAV.map(s => (
          <button key={s} role="menuitem" onClick={() => { go(s); setMobileOpen(false); }}>{s}</button>
        ))}
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" style={{ padding:"108px 44px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
            {/* copy */}
            <div>
              <div className="slbl" style={{ marginBottom:16 }}>// 01 — About</div>
              <h2 style={{
                fontFamily:"'Bebas Neue'", fontSize:"clamp(44px,6vw,76px)",
                lineHeight:.95, color:"var(--text)", marginBottom:30,
              }}>
                Building at the<br/>
                Edge of{" "}
                <span style={{ color:"transparent", WebkitTextStroke:"1px var(--card-border)" }}>Intelligence</span>
              </h2>
              <p style={{ color:"var(--muted)", lineHeight:1.88, fontSize:13.5, marginBottom:16 }}>
                Final-year Computer Science student at AIUB with published research in deep learning and IoT. I design, implement, and evaluate machine learning pipelines end-to-end — from raw dataset curation to model benchmarking.
              </p>
              <p style={{ color:"var(--muted-2)", lineHeight:1.88, fontSize:13.5, marginBottom:32 }}>
                Co-founder of Algo Tech IT, where I lead technical architecture, project delivery, and developer mentorship. Currently completing a thesis on deepfake detection using a multi-branch CV architecture (MobileNetV3 + ViT + gaze estimation).
              </p>
              <div style={{ display:"flex", gap:12 }}>
                <a href="https://github.com/noor4964" target="_blank" rel="noreferrer" className="btnO"
                  style={{ textDecoration:"none", fontSize:10 }}>GitHub ↗</a>
                <a href="https://linkedin.com/in/nur-alam4964" target="_blank" rel="noreferrer" className="btnO"
                  style={{ textDecoration:"none", fontSize:10 }}>LinkedIn ↗</a>
              </div>
            </div>

            {/* stats + timeline */}
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"var(--card-border)", marginBottom:36 }}>
                {[
                  {n:"3.80", l:"CGPA / 4.00"},
                  {n:"2+",   l:"Publications"},
                  {n:"6+",   l:"Projects Built"},
                  {n:"2023", l:"Startup Founded"},
                ].map(({n,l}) => (
                  <div key={l} className="stbox">
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:50, color:"var(--text)", lineHeight:1 }}>{n}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", letterSpacing:".12em", marginTop:8 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
                {/* education */}
                <div>
                  <div className="slbl" style={{ marginBottom:18 }}>Education</div>
                  <div style={{ display:"flex", gap:12 }}>
                    <div className="tdot"/>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:"var(--text)", marginBottom:4 }}>B.Sc. CSE</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", marginBottom:6 }}>AIUB · 2021–2025</div>
                      <div style={{ fontSize:12, color:"var(--muted-2)" }}>Dean's List · 3.80 GPA</div>
                      <div style={{ fontSize:11.5, color:"var(--muted-2)", marginTop:3 }}>Thesis: Deepfake Detection CV</div>
                    </div>
                  </div>
                </div>
                {/* experience */}
                <div>
                  <div className="slbl" style={{ marginBottom:18 }}>Experience</div>
                  <div style={{ display:"flex", gap:12 }}>
                    <div className="tdot"/>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:"var(--text)", marginBottom:4 }}>Co-Founder & Dev</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", marginBottom:6 }}>Algo Tech IT · 2023–Now</div>
                      <div style={{ fontSize:12, color:"var(--muted-2)" }}>Web & Software Solutions</div>
                      <div style={{ fontSize:11.5, color:"var(--muted-2)", marginTop:3 }}>Tech lead · Team mentorship</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SKILLS ══════════ */}
      <section id="skills" style={{ borderTop:"1px solid var(--card-border)", borderBottom:"1px solid var(--card-border)", background:"var(--bg-2)", padding:"80px 44px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:48 }}>
            <div className="slbl" style={{ marginBottom:14 }}>// 03 — Skills</div>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(36px,5vw,60px)", color:"var(--text)" }}>Technical Arsenal</h2>
          </div>
          <div>
            {SKILLS.map(({cat,items},i) => (
              <div key={cat} className="reveal" style={{
                display:"grid", gridTemplateColumns:"138px 1fr", gap:24,
                alignItems:"center", padding:"20px 0",
                borderBottom: i < SKILLS.length-1 ? "1px solid var(--card-border)" : "none",
              }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", letterSpacing:".14em" }}>
                  {cat.toUpperCase()}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {items.map(s => <span key={s} className="sp">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS ══════════ */}
      <section id="projects" style={{ padding:"108px 44px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:48 }}>
            <div className="slbl" style={{ marginBottom:14 }}>// 04 — Projects</div>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(36px,5vw,60px)", color:"var(--text)" }}>Selected Work</h2>
          </div>
          <div
            className={`projects-marquee ${marqueePaused ? "paused" : ""}`}
            aria-label="Selected work auto-scroll"
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
            onTouchStart={() => setMarqueePaused(true)}
            onTouchEnd={() => setMarqueePaused(false)}
          >
            <div className="projects-track">
              <div className="projects-set">
                {PROJECTS.map((proj,i) => (
                  <div key={`a-${proj.n}`} className="projects-item">
                    <ProjectCard proj={proj} delay={i * .04} onView={setSelectedProject}/>
                  </div>
                ))}
              </div>
              <div className="projects-set" aria-hidden="true">
                {PROJECTS.map((proj,i) => (
                  <div key={`b-${proj.n}`} className="projects-item">
                    <ProjectCard proj={proj} delay={i * .04} onView={setSelectedProject}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close project" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-meta">
              <span>{selectedProject.type}</span>
              <span>•</span>
              <span>{selectedProject.year}</span>
            </div>
            <h3 style={{ fontFamily:"'Bebas Neue'", fontSize:34, letterSpacing:".04em" }}>{selectedProject.title}</h3>
            <p>{selectedProject.desc}</p>
            <div className="modal-tags">
              {selectedProject.tags.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="modal-actions">
              {selectedProject.link && (
                <a className="btnO" href={selectedProject.link} target="_blank" rel="noreferrer">View Code ↗</a>
              )}
              <button className="btnP" onClick={() => setSelectedProject(null)}><span>Close</span></button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PUBLICATIONS ══════════ */}
      <section id="publications" style={{ borderTop:"1px solid var(--card-border)", background:"var(--bg-2)", padding:"80px 44px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:48 }}>
            <div className="slbl" style={{ marginBottom:14 }}>// 05 — Research</div>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(36px,5vw,60px)", color:"var(--text)" }}>Publications</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {PUBS.map((p,i) => (
              <div key={i} className={`pi reveal reveal-d${i+1}`}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", letterSpacing:".1em" }}>{p.venue}</span>
                  <span style={{
                    fontFamily:"'Space Mono',monospace", fontSize:8.5, color:"var(--muted-2)",
                    padding:"2px 8px", border:"1px solid var(--card-border)", letterSpacing:".1em",
                  }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:14.5, color:"var(--text)", marginBottom:10, lineHeight:1.6 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted-2)", lineHeight:1.7 }}>{p.authors}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" style={{ borderTop:"1px solid var(--card-border)", padding:"108px 44px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:56 }}>
            <div className="slbl" style={{ marginBottom:14 }}>// 06 — Contact</div>
            <h2 style={{
              fontFamily:"'Bebas Neue'", fontSize:"clamp(52px,9vw,110px)",
              lineHeight:.88, color:"var(--text)", marginBottom:4,
            }}>Let's Build</h2>
            <h2 style={{
              fontFamily:"'Bebas Neue'", fontSize:"clamp(52px,9vw,110px)",
              lineHeight:.88, color:"transparent", WebkitTextStroke:"1px var(--card-border)",
            }}>Something Great</h2>
          </div>

          <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:60 }}>
            {/* info */}
            <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
              {[
                ["EMAIL",    "noor.alam2002@outlook.com"],
                ["PHONE",    "+88 01648504964"],
                ["LOCATION", "Dhaka, Bangladesh"],
                ["GITHUB",   "github.com/noor4964"],
                ["LINKEDIN", "linkedin.com/in/nur-alam4964"],
              ].map(([l,v]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"var(--muted)", letterSpacing:".18em", marginBottom:5 }}>{l}</div>
                  <div style={{ fontSize:13, color:"var(--muted-2)" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* form */}
            <div>
              {sent ? (
                <div style={{ border:"1px solid var(--card-border)", padding:"48px 32px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:"var(--text)", marginBottom:12 }}>Message Sent</div>
                  <div style={{ color:"var(--muted-2)", fontSize:13 }}>I'll get back to you shortly.</div>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <input
                    className="ci" placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(p => ({...p, name:e.target.value}))}
                  />
                  <input
                    className={"ci" + (errors.email?" error":"")} placeholder="Email address"
                    value={form.email}
                    onChange={e => { setForm(p => ({...p, email:e.target.value})); setErrors(s=>({...s,email:false})); }}
                  />
                  <textarea
                    className={"ci" + (errors.msg?" error":"")} rows={5} placeholder="Your message"
                    value={form.msg}
                    onChange={e => { setForm(p => ({...p, msg:e.target.value})); setErrors(s=>({...s,msg:false})); }}
                  />
                  <button
                    className="btnP"
                    style={{ width:"100%", justifyContent:"center" }}
                    onClick={() => {
                      const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
                      const msgValid = form.msg.trim().length > 4;
                      if(!emailValid || !msgValid){
                        setErrors({ email:!emailValid, msg:!msgValid });
                        return;
                      }
                      // open mail client and mark sent state
                      const subject = encodeURIComponent('Portfolio contact from ' + (form.name||'Website'));
                      const body = encodeURIComponent(form.msg + '\n\n— ' + (form.name || ''));
                      window.location.href = `mailto:noor.alam2002@outlook.com?subject=${subject}&body=${body}`;
                      setSent(true);
                    }}
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{
        padding:"26px 44px", borderTop:"1px solid var(--card-border)",
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)" }}>
          © 2025 SK. Nur Alam
        </div>
        <div style={{ display:"flex", gap:18 }}>
          {[
            ["GH",  "https://github.com/noor4964"],
            ["LI",  "https://linkedin.com/in/nur-alam4964"],
            ["ML",  "mailto:noor.alam2002@outlook.com"],
          ].map(([l,h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)", textDecoration:"none", transition:"color .25s" }}
              onMouseEnter={e => e.target.style.color="var(--text)"}
              onMouseLeave={e => e.target.style.color="var(--muted)"}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9.5, color:"var(--muted)" }}>
          Built with precision.
        </div>
      </footer>
    </div>
  );
}
