import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="app-container" style={{ paddingTop: '4rem', alignItems: 'center', textAlign: 'center', overflowY: 'auto' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}
      >
        <Zap size={64} color="var(--accent-neon-green)" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #fff, var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          PulseTwin AI
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
          PulseTwin is a next-generation real-time decision intelligence engine. By seamlessly fusing Gemini's hyper-advanced 
          generative reasoning with concrete crowd physics simulations, it turns chaotic bottlenecks into smooth, predictable traffic flows.
        </p>
        
        <div style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>v2.0.0</span> - Enterprise Ready
        </div>
      </motion.div>
    </div>
  );
}
