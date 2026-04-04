"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Moon, Sun, ArrowUpRight, Mail } from "lucide-react";

// Extremely Minimal Background
const MinimalCanvas = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: {x: number, y: number}[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      points.push({ x: mouse.x, y: mouse.y });
      if (points.length > 30) points.shift();
    });
    resize();

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;

      if (points.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-[var(--canvas-blend)]" />;
};

const CoreStackSlider = () => {
  const stack = [
    "TypeScript", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "OpenAI API",
    "Python", "Dart", "Flutter", "C#", "Figma", "AWS"
  ];
  // 12 distinct items. Repeat 4 times = 48 items to guarantee large width.
  const repeatedStack = Array(4).fill(stack).flat();

  return (
    <div className="w-full overflow-hidden border-y border-[var(--border-line)] py-6 my-16 bg-[var(--bg-main)] opacity-90 select-none flex">
      {/* 
        Framer Motion handles the loop flawlessly.
        Shifting by exactly -50% means we translate across 24 items.
        Since 24 is a multiple of 6, the start and end states are visually identical, creating an infinite illusion.
      */}
      <motion.div 
        className="flex gap-16 items-center shrink-0 w-max pr-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
      >
        {repeatedStack.map((tech, idx) => (
           <span key={idx} className="font-mono text-sm tracking-widest font-bold uppercase whitespace-nowrap text-[var(--text-main)] transition-colors duration-700">
             {tech}
           </span>
        ))}
      </motion.div>
    </div>
  );
};


export default function Home() {
  const [isDark, setIsDark] = useState(true);

  // Apply theme class to document body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen transition-colors duration-700 font-sans">
      <MinimalCanvas isDark={isDark} />

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-[var(--inverse-bg)] text-[var(--inverse-text)] shadow-lg hover:scale-105 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </AnimatePresence>
      </button>

      <main className="max-w-4xl mx-auto px-6 relative z-20 pt-32 pb-12 text-[var(--text-main)] transition-colors duration-700">
        
        {/* HERO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight leading-[1] mb-6 uppercase">
              AYAN KHAN
            </h1>
            <p className="font-sans text-xl md:text-3xl font-light text-[var(--text-muted)] tracking-wide mb-4">
              Full-Stack Developer Building AI Systems
            </p>
            <p className="font-sans text-base text-[var(--text-main)] mb-6 max-w-xl leading-relaxed">
              I design and build AI-powered applications that analyze data, automate decisions, and deliver measurable outcomes.
            </p>
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-[var(--text-main)] border-l-2 border-[var(--text-main)] pl-4">
              Focused on real-world systems, not tutorials.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden md:block flex-shrink-0"
          >
            <div className="relative w-36 h-44 overflow-hidden border border-[var(--border-line)] p-1 bg-[var(--bg-panel)] shadow-xl">
              <div className="relative w-full h-full grayscale transition duration-700 hover:grayscale-0">
                <Image 
                  src="/ayan-profile-nobg.png" 
                  alt="Ayan Portrait" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* PROOF STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest text-[var(--text-main)] border-y border-[var(--border-line)] py-6 mb-24"
        >
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)]"></div> 3+ AI Systems Built
          </div>
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)]"></div> Full-Stack (Frontend + Backend + AI)
          </div>
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)]"></div> Deployed to Production
          </div>
        </motion.div>

        {/* CORE STACK SCROLLER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}>
          <CoreStackSlider />
        </motion.div>

        {/* SYSTEMS I'VE BUILT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-sans font-bold uppercase tracking-widest mb-10 pb-4 border-b border-[var(--border-line)]">Systems I’ve Built</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <a href="https://resumematch-ai-five.vercel.app" target="_blank" rel="noreferrer" className="block outline-none">
              <div className="system-card bg-[var(--bg-panel)] p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold tracking-tight">MatchLayer</h3>
                    <ArrowUpRight strokeWidth={1.5} size={24} className="text-[var(--text-muted)]" />
                  </div>
                  <p className="font-sans text-base text-[var(--text-muted)] font-medium mb-6">
                    Resume-to-job match scoring engine that surfaces skill gaps and hiring signals instantly.
                  </p>
                  <ul className="space-y-3 font-mono text-xs text-[var(--text-muted)] leading-relaxed list-disc pl-4">
                    <li>Built full-stack system using Next.js, Node.js, and OpenAI API</li>
                    <li>Implemented real-time scoring engine with skill-gap analysis</li>
                  </ul>
                </div>
              </div>
            </a>

            <a href="https://ai-store-five.vercel.app" target="_blank" rel="noreferrer" className="block outline-none">
              <div className="system-card bg-[var(--bg-panel)] p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold tracking-tight">NegotiX</h3>
                    <ArrowUpRight strokeWidth={1.5} size={24} className="text-[var(--text-muted)]" />
                  </div>
                  <p className="font-sans text-base text-[var(--text-muted)] font-medium mb-6">
                    Autonomous negotiation marketplace where a live agent closes deals in real time.
                  </p>
                  <ul className="space-y-3 font-mono text-xs text-[var(--text-muted)] leading-relaxed list-disc pl-4">
                    <li>Built full-stack e-commerce: auth, Postgres DB, REST API endpoints</li>
                    <li>Wired negotiation agent directly into product checkout flow</li>
                  </ul>
                </div>
              </div>
            </a>

            <a href="https://resume-fixer-one.vercel.app" target="_blank" rel="noreferrer" className="block outline-none">
              <div className="system-card bg-[var(--bg-panel)] p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold tracking-tight">ResumeForge</h3>
                    <ArrowUpRight strokeWidth={1.5} size={24} className="text-[var(--text-muted)]" />
                  </div>
                  <p className="font-sans text-base text-[var(--text-muted)] font-medium mb-6">
                    Resume rewriting engine that restructures and sharpens resume content for target roles.
                  </p>
                  <ul className="space-y-3 font-mono text-xs text-[var(--text-muted)] leading-relaxed list-disc pl-4">
                    <li>Built with Next.js and OpenAI API to analyze, rewrite, and optimize content</li>
                    <li>Deployed as a full-stack SaaS with instant output and download</li>
                  </ul>
                </div>
              </div>
            </a>
            
          </div>
        </motion.div>

        {/* THE KILLER LINE */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
           className="py-16 my-24 bg-[var(--inverse-bg)] text-[var(--inverse-text)] text-center px-6 shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            I don’t just write code — I build systems that work.
          </h2>
        </motion.div>

        {/* HOW I BUILD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-sans font-bold uppercase tracking-widest mb-10 pb-4 border-b border-[var(--border-line)]">How I Build Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm text-[var(--text-muted)] leading-loose">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-line)] p-6 rounded-sm">
               <span className="text-[var(--text-main)] font-bold mb-2 block">1. Architecture</span>
               I break problems into data, logic, and interface.
            </div>
            <div className="bg-[var(--bg-panel)] border border-[var(--border-line)] p-6 rounded-sm">
               <span className="text-[var(--text-main)] font-bold mb-2 block">2. Engineering</span>
               I design scalable backends + clean frontends.
            </div>
            <div className="bg-[var(--bg-panel)] border border-[var(--border-line)] p-6 rounded-sm">
               <span className="text-[var(--text-main)] font-bold mb-2 block">3. Integration</span>
               I integrate AI only where it adds real value.
            </div>
            <div className="bg-[var(--bg-panel)] border border-[var(--border-line)] p-6 rounded-sm">
               <span className="text-[var(--text-main)] font-bold mb-2 block">4. Execution</span>
               I focus on performance, clarity, and usability.
            </div>
          </div>
        </motion.div>

        {/* RAW EXPERIENCE */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-sans font-bold uppercase tracking-widest mb-10 pb-4 border-b border-[var(--border-line)]">Experience</h2>
          
          <div className="bg-[var(--bg-panel)] border border-[var(--border-strong)] p-8 md:p-10 shadow-lg">
             <h3 className="text-2xl font-bold tracking-tight mb-4">Independent Full-Stack Engineer</h3>
             <p className="font-sans text-lg text-[var(--text-main)] mb-6 leading-relaxed">
               Building and deploying full-stack AI applications with real-world use cases. Experience across frontend systems, backend APIs, database design, and AI integration.
             </p>
             <ul className="space-y-3 font-mono text-sm text-[var(--text-muted)] list-disc pl-5">
               <li>Built authentication, APIs, and database systems</li>
               <li>Designed responsive, high-performance interfaces</li>
               <li>Integrated AI models into production workflows</li>
             </ul>
          </div>
        </motion.div>

        {/* EDUCATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-sans font-bold uppercase tracking-widest mb-10 pb-4 border-b border-[var(--border-line)]">Education</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-strong)] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">B.Tech in Computer Science</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">Expected 2027</p>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  Currently pursuing a Bachelor of Technology, focusing heavily on computational theory, algorithmic complexity, and software architecture.
                </p>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-line)] p-8 flex flex-col justify-between opacity-80">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">High School / Higher Secondary</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">First Division</p>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  Completed 10th and 12th grades graduating with First Division. Established rigorous foundational discipline natively extending into full-stack engineering.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA CLOSER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mt-32 mb-16"
        >
          <h2 className="text-5xl font-sans font-bold tracking-tighter mb-8 uppercase">Let’s Build Something Real.</h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <a href="https://github.com/AyanAdastraa" target="_blank" rel="noreferrer" className="flex items-center gap-3 border-2 border-[var(--text-main)] bg-[var(--text-main)] text-[var(--bg-main)] px-8 py-4 font-bold tracking-wider uppercase hover:opacity-80 transition-all w-full sm:w-auto justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg> 
              View GitHub
            </a>
            <a href="mailto:ayanadastra@gmail.com" className="flex items-center gap-3 border-2 border-[var(--border-strong)] bg-transparent text-[var(--text-main)] px-8 py-4 font-bold tracking-wider uppercase hover:border-[var(--text-main)] transition-all w-full sm:w-auto justify-center">
              <Mail size={20} /> 
              Contact Me
            </a>
          </div>

          <p className="font-mono text-sm text-[var(--text-muted)] bg-[var(--bg-panel)] border border-[var(--border-line)] py-4 px-6 inline-block uppercase tracking-widest font-semibold shadow-sm">
            Looking to work on high-impact products, startups, or AI-driven systems.
          </p>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 pt-8 pb-4 text-center text-[var(--text-muted)] text-xs uppercase tracking-widest font-mono transition-colors duration-700 opacity-60">
          <span>Ayan Khan // Systems Builder</span>
        </footer>

      </main>
    </div>
  );
}
