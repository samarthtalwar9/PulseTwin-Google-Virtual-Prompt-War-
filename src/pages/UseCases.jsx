import React from 'react';
import { motion } from 'framer-motion';

export default function UseCases() {
  const cases = [
    { title: "Stadiums & Arenas", desc: "Instantly balance queue loads during halftime shows to reduce friction and improve fan experience by routing them to shorter concession queues." },
    { title: "Airports & Transport Hubs", desc: "Navigate passengers efficiently between terminals dynamically adjusted based on live TSA wait times and walking distance simulations." },
    { title: "Mega Shopping Malls", desc: "Distribute foot traffic evenly avoiding choke points near popular stores, ensuring maximum safety and commercial exposure." }
  ];

  return (
    <div className="app-container" style={{ paddingTop: '2rem', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Use Cases</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        PulseTwin scales easily to high-density environments.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '1.5rem', maxWidth: '800px' }}>
        {cases.map((c, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel"
            style={{ padding: '2rem' }}
          >
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-neon-green)', marginBottom: '12px' }}>{c.title}</h2>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
