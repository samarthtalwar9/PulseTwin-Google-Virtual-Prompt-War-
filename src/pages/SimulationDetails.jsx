import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

export default function SimulationDetails() {
  const [data, setData] = useState([]);
  const [densityData, setDensityData] = useState([]);

  useEffect(() => {
    // Generate initial dummy data
    const generateData = () => {
      setData([
        { name: 'Gate A', current: 22, optimized: 15 },
        { name: 'Gate B', current: 15, optimized: 8 },
        { name: 'Gate C', current: 18, optimized: 10 },
        { name: 'Gate 8', current: 5, optimized: 4 },
      ]);
      
      const newDensity = [];
      for(let i=0; i<10; i++) {
        newDensity.push({
          time: `10:${i}0 AM`,
          GateA: 80 + Math.random() * 20,
          Gate8: 20 + Math.random() * 10
        });
      }
      setDensityData(newDensity);
    };
    
    generateData();
  }, []);

  return (
    <div className="app-container" style={{ paddingTop: '2rem', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Simulation Details</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Deep dive into algorithmic comparisons and live wait times.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Wait Time Comparison (Mins)</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="current" name="Current Wait" fill="var(--state-danger)" radius={[4,4,0,0]} />
                <Bar dataKey="optimized" name="Optimized Wait" fill="var(--accent-neon-green)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel"
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Crowd Density Over Time (%)</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="GateA" stroke="var(--state-danger)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Gate8" stroke="var(--accent-neon-green)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
