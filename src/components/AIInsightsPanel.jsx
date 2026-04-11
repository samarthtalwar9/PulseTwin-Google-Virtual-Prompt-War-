import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, Navigation, ShieldAlert, Cpu } from 'lucide-react';

export default function AIInsightsPanel({ aiResult, isThinking }) {
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-neon-purple)' }}>
        <BrainCircuit size={24} />
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>AI Decision Engine</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div 
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '1rem' }}
            >
              <Loader2 className="animate-spin" size={48} color="var(--accent-neon-purple)" style={{ animation: 'spin 2s linear infinite' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                  Calculating grid distance & walking time...
                </p>
                <p style={{ color: 'var(--state-warning)', fontSize: '0.75rem', marginTop: '6px' }}>Querying Gemini GenAI Model</p>
              </div>
              
              <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
              `}</style>
            </motion.div>
          ) : aiResult ? (
             <motion.div
               key="result"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
               style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
             >
                {/* Prediction Box */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--state-danger)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--state-danger)' }}>
                    <ShieldAlert size={16} />
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0' }}>Immediate Risk Warning</h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{aiResult.prediction.risk_area}</span>
                    <span style={{ background: 'var(--state-danger)', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {aiResult.prediction.time_to_risk}
                    </span>
                  </div>
                </div>

                {/* Best Action Box ENHANCED */}
                <div 
                  role="region" 
                  aria-live="polite"
                  style={{ background: 'rgba(0,255,157,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--accent-neon-green)', boxShadow: '0 4px 20px rgba(0,255,157,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-neon-green)' }}>
                    <Navigation aria-hidden="true" size={20} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Optimal Navigational Route</h3>
                  </div>
                  <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
                    {typeof aiResult.best_action === 'string' ? aiResult.best_action : aiResult.best_action?.instruction}
                  </p>
                  
                  {/* Detailed Time Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', border: '1px solid rgba(0,255,157,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Current Gate Wait:</span>
                      <span style={{ color: 'var(--state-danger)', fontWeight: 600 }}>{aiResult.best_action?.current_gate_wait || 21} min</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Target Gate Wait:</span>
                      <span style={{ color: 'var(--accent-neon-green)', fontWeight: 600 }}>{aiResult.best_action?.target_gate_wait || 5} min</span>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
                      <span style={{ color: '#fff' }}>Total Time Saved:</span>
                      <span style={{ color: 'var(--accent-neon-green)' }}>{aiResult.improvement || (aiResult.best_action?.time_saved + ' minutes')}</span>
                    </div>
                  </div>
                </div>

                {/* Reasoning Box ENHANCED */}
                <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <BrainCircuit aria-hidden="true" size={16} color="var(--accent-neon-purple)" />
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>Why this route?</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                    {aiResult.reason || aiResult.best_action?.reason}
                  </p>
                </div>

             </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '1rem', opacity: 0.6 }}>
              <Cpu size={40} color="var(--text-secondary)" />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>System Targeting Ready</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '280px' }}>
                  Click <strong style={{color: 'var(--accent-neon-green)'}}>"Simulate Routing"</strong> to generate physics-based AI prediction vectors.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
