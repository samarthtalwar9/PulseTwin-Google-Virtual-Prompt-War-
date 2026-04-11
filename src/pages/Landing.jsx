import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, BrainCircuit, Activity, Navigation, Building2, Store, Plane } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      
      {/* LANDING NAVBAR */}
      <nav style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={28} strokeWidth={2.5} color="var(--accent-neon-green)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>PulseTwin</span>
        </div>
        <button 
          className="glass-button" 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Sign In
        </button>
      </nav>

      {/* HERO SECTION */}
      <section style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'var(--accent-neon-purple-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: 'var(--accent-neon-green-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 1, maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ padding: '8px 16px', background: 'rgba(0, 255, 157, 0.1)', border: '1px solid var(--accent-neon-green)', borderRadius: '30px', color: 'var(--accent-neon-green)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-neon-green)', boxShadow: '0 0 10px var(--accent-neon-green)' }}></span>
            PulseTwin Engine v2.0 Live
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Predict. Simulate. Optimize.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.6 }}>
            The world's first AI-powered spatial decision engine. Transform chaotic crowd bottlenecks into perfectly orchestrated traffic flows in real-time using Google Gemini.
          </p>

          <button 
            className="glass-button primary" 
            onClick={() => navigate('/dashboard')}
            style={{ padding: '16px 36px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 32px rgba(0,255,157,0.3)' }}
          >
            Launch Dashboard
            <Navigation size={20} />
          </button>
        </motion.div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Spatial Intelligence at Scale</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Three pillars of the PulseTwin architecture.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Activity, title: "Predict Congestion", desc: "Ingest live telemetry to detect anomalies and forecast choke points before they reach critical friction limits.", color: "var(--state-danger)" },
              { icon: BrainCircuit, title: "Simulate Outcomes", desc: "Run thousands of parallel physics-based pathfinding variations to determine the probabilistic wait-time impact.", color: "var(--accent-neon-purple)" },
              { icon: Navigation, title: "Optimize Decisions", desc: "Execute Gemini-powered routing strategies that balance queue loads and walking distances seamlessly.", color: "var(--accent-neon-green)" }
            ].map((f, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -5 }}
                 className="glass-panel"
                 style={{ borderTop: `3px solid ${f.color}`, padding: '2.5rem' }}
               >
                 <f.icon size={36} color={f.color} style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{f.title}</h3>
                 <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Built for High-Density Environments</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
             {[
               { icon: Building2, label: "Stadiums & Arenas" },
               { icon: Plane, label: "Transport Hubs" },
               { icon: Store, label: "Shopping Centers" }
             ].map((u, i) => (
               <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <u.icon size={48} color="var(--text-secondary)" />
                 <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{u.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#000', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
          <Zap size={20} color="var(--score-neon-green)" />
          <span style={{ fontWeight: 600, color: '#fff' }}>PulseTwin Inc.</span>
        </div>
        <p style={{ fontSize: '0.875rem' }}>© 2026 PulseTwin. Powered by Google Gemini. Made by Samarth Talwar.</p>
      </footer>
    </div>
  );
}
