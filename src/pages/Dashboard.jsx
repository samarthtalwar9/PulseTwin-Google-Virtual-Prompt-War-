import React, { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import Heatmap from '../components/Heatmap';
import MetricsPanel from '../components/MetricsPanel';
import AIInsightsPanel from '../components/AIInsightsPanel';
import ScenarioComparisons from '../components/ScenarioComparisons';
import { analyzeCrowdData } from '../services/geminiService';
import { generateFallbackSimulation } from '../agents/SimulationAgent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [pipelineState, setPipelineState] = useState('idle');
  const [aiResult, setAiResult] = useState(null);
  const [congestionLevel, setCongestionLevel] = useState('high');

  const [waitData, setWaitData] = useState([
    { name: 'Gate A', current: 21, optimized: 21 },
    { name: 'Gate B', current: 15, optimized: 15 },
    { name: 'Gate C', current: 18, optimized: 18 },
    { name: 'Gate 8', current: 5, optimized: 5 },
  ]);

  const [densityData, setDensityData] = useState([]);

  useEffect(() => {
    const newDensity = [];
    let baseA = 80;
    let base8 = 20;
    for(let i=0; i<10; i++) {
       baseA = baseA + (Math.random() * 10 - 5);
       base8 = base8 + (Math.random() * 5 - 2);
       newDensity.push({
         time: `10:0${i} AM`,
         GateA: Math.max(0, baseA),
         Gate8: Math.max(0, base8)
       });
    }
    setDensityData(newDensity);
  }, []);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setPipelineState('thinking');
    
    try {
      const result = await analyzeCrowdData();
      setAiResult(result);
      setCongestionLevel('low');
      setPipelineState('complete');
      
      // Update analytics data visually
      setWaitData([
        { name: 'Gate A', current: 21, optimized: 15 },
        { name: 'Gate B', current: 15, optimized: 10 },
        { name: 'Gate C', current: 18, optimized: 12 },
        { name: 'Gate 8', current: 5, optimized: 18 },
      ]);
      
      const newDensity = [];
      let baseA = 85; let base8 = 22;
      for(let i=0; i<10; i++) {
        if(i > 4) { baseA -= 10; base8 += 8; }
        newDensity.push({
          time: `10:${i+1}0 AM`,
          GateA: baseA + (Math.random()*5-2),
          Gate8: base8 + (Math.random()*5-2)
        });
      }
      setDensityData(newDensity);
      
    } catch (error) {
      console.error("Optimization failed:", error);
      setTimeout(() => {
        setAiResult(generateFallbackSimulation());
        setCongestionLevel('low');
        setPipelineState('complete');
        
        // Update analytics data visually in fallback
        setWaitData([
          { name: 'Gate A', current: 21, optimized: 15 },
          { name: 'Gate B', current: 15, optimized: 10 },
          { name: 'Gate C', current: 18, optimized: 12 },
          { name: 'Gate 8', current: 5, optimized: 18 },
        ]);
      }, 3000);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="app-container" 
      style={{ paddingBottom: '3rem' }}
    >
      {/* SECTION 1: Top Dashboard */}
      <header style={{ padding: '0.5rem 0' }}>
         <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '4px', letterSpacing: '-0.5px' }}>Terminal Optimization Core</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Dynamic Crowd Intelligence & Load Balancing</p>
         </div>
        
        <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-neon-purple)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              ✨ Powered by Google Gemini AI
            </span>
            <button 
              className="glass-button primary"
              onClick={handleOptimize}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptimize();
                }
              }}
              disabled={isOptimizing}
              aria-label="Run AI crowd analysis"
              style={{ opacity: isOptimizing ? 0.7 : 1, padding: '12px 28px', fontSize: '1rem' }}
            >
              {isOptimizing ? 'Analyzing crowd patterns...' : 'Run Gemini Analysis'}
              {!isOptimizing && <Settings2 aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="main-layout">
        <div className="left-panel">
          <MetricsPanel state={pipelineState} />
        </div>

        <div className="center-panel">
          <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Live Crowd Topology</h2>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Hover cells for density metrics</div>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--state-safe)'}}/> Stable</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--state-warning)'}}/> Growing</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--state-danger)'}}/> Critical</span>
              </div>
            </div>
            <Heatmap congestionLevel={congestionLevel} isThinking={isOptimizing} aiResult={aiResult} />
          </div>
        </div>

        <div className="right-panel">
          <AIInsightsPanel aiResult={aiResult} isThinking={isOptimizing} />
        </div>
      </main>

      {/* SECTION 2: Scenario Comparison */}
      <section style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Navigation Vectors</h3>
        <div className="bottom-layout">
          <ScenarioComparisons scenarios={aiResult?.scenarios} />
        </div>
      </section>

      {/* SECTION 3: Deep Analytics */}
      <section style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>System Telemetry & Forecast</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Before & After routing intervention analysis.</p>
        </div>
        
        <div className="analytics-layout">
          <div className="glass-panel">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Terminal Wait Time Shifts (Mins)</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="current" name="Original Wait" fill="var(--state-danger)" radius={[4,4,0,0]} barSize={30} />
                  <Bar dataKey="optimized" name="Post-Routing Wait" fill="var(--accent-neon-green)" radius={[4,4,0,0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Predicted Inter-Gate Density Trend</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={densityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="GateA" name="Gate A Load %" stroke="var(--state-danger)" strokeWidth={3} dot={{ r: 3, fill: 'var(--state-danger)' }} />
                  <Line type="monotone" dataKey="Gate8" name="Gate 8 Load %" stroke="var(--accent-neon-green)" strokeWidth={3} dot={{ r: 3, fill: 'var(--accent-neon-green)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', paddingBottom: '1rem' }}>
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '1.5rem' }}></div>
        PulseTwin AI Architecture | Confidential & Proprietary | Secure Connection | Made by Samarth Talwar
      </footer>
    </motion.div>
  );
}
