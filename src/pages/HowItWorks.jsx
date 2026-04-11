import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Navigation, Activity } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="app-container" style={{ paddingTop: '2rem', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>How PulseTwin Works</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
        PulseTwin combines physics-based routing with Google Gemini's advanced reasoning to create real-time optimal paths.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} className="glass-panel">
          <BrainCircuit size={32} color="var(--accent-neon-purple)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>1. Prediction</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Our system ingests live surveillance metadata to calculate crowd density, speed, and local friction constants. 
            It predicts risk areas by analyzing converging trajectories.
          </p>
        </motion.div>

        <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="glass-panel">
          <Activity size={32} color="var(--state-warning)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>2. Simulation Engine</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Applying crowd physics mechanics, the backend evaluates wait times and walking distance dynamically. A walking speed of ~1.4m/s combined with queue load factors creates realistic time models.
          </p>
        </motion.div>

        <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="glass-panel" style={{ border: '1px solid var(--accent-neon-green)' }}>
          <Navigation size={32} color="var(--accent-neon-green)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>3. Intelligent Decision</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Google Gemini acts as the ultimate arbitration layer. It analyzes the simulated matrices and formulates a human-readable, precise instruction to balance walking time and load distribution.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
