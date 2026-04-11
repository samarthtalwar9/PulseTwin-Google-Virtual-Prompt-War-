import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

export default function ScenarioComparisons({ scenarios }) {
  const isAvailable = scenarios && scenarios.length > 0;
  
  const placeholders = [
    { gate_name: "Scanning...", action: "Awaiting Simulation" },
    { gate_name: "Scanning...", action: "Awaiting Simulation" },
    { gate_name: "Scanning...", action: "Awaiting Simulation" }
  ];

  const items = isAvailable ? scenarios : placeholders;

  return (
    <>
      {items.map((scenario, index) => {
        let isBest = false;
        if (isAvailable) {
          // Identify the best scenario (highest efficiency or lowest total time)
          const maxEff = Math.max(...scenarios.map(s => s.efficiency));
          isBest = scenario.efficiency === maxEff;
        }
        
        return (
          <motion.div
            key={`scenario-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="glass-panel"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              border: isBest ? '1px solid var(--accent-neon-green)' : undefined,
              boxShadow: isBest ? '0 0 20px rgba(0,255,157,0.1)' : undefined,
              position: 'relative',
              overflow: 'hidden',
              padding: '20px'
            }}
          >
            {isBest && (
               <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-neon-green)', color: '#000', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 12px', borderBottomLeftRadius: '8px' }}>
                 SELECTED ROUTE
               </div>
            )}
            
            {!isAvailable ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{scenario.gate_name}</h3>
                <p style={{ fontSize: '0.8rem' }}>{scenario.action}</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} color={isBest ? "var(--accent-neon-green)" : "var(--text-secondary)"} />
                      {scenario.gate_name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{scenario.action}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isBest ? 'var(--accent-neon-green)' : 'var(--text-primary)' }}>
                      {scenario.total_time}m
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>TOTAL TIME</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr min-content', gap: '12px', fontSize: '0.875rem', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Clock size={14} color="var(--text-secondary)" />
                     <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Walk</div>
                     <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{scenario.walking_time}m</div>
                   </div>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                     <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Wait</div>
                     <div style={{ fontWeight: 600, color: scenario.waiting_time < 10 ? 'var(--state-safe)' : (scenario.waiting_time > 20 ? 'var(--state-danger)' : 'var(--state-warning)'), textAlign: 'center' }}>
                       {scenario.waiting_time}m
                     </div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Eff</div>
                     <div style={{ fontWeight: 600, color: 'var(--accent-neon-purple)' }}>{scenario.efficiency}%</div>
                   </div>
                </div>
                
                {/* Progress bar visual */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '16px', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${scenario.efficiency}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: '100%', background: isBest ? 'var(--accent-neon-green)' : 'var(--accent-neon-purple)' }}
                    />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </>
  );
}
