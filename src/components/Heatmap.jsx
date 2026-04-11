import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, AlertTriangle } from 'lucide-react';

// Static Venue Coordinates
const NODES = {
  USER: { id: 'USER', x: 400, y: 350, label: 'You Are Here' },
  GATE_A: { id: 'GATE_A', x: 200, y: 100, label: 'Gate A', wait: '21m' },
  GATE_B: { id: 'GATE_B', x: 600, y: 100, label: 'Gate B', wait: '12m' },
  GATE_C: { id: 'GATE_C', x: 100, y: 250, label: 'Gate C', wait: '18m' },
  GATE_8: { id: 'GATE_8', x: 700, y: 250, label: 'Gate 8', wait: '5m' },
  CENTER_HUB: { id: 'CENTER_HUB', x: 400, y: 200, label: 'Main Concourse', wait: 'Congested' }
};

const EDGES = [
  { id: 'path-a', start: NODES.USER, end: NODES.CENTER_HUB, control: {x: 400, y: 280}, density: 'high' },
  { id: 'path-b', start: NODES.CENTER_HUB, end: NODES.GATE_A, control: {x: 300, y: 150}, density: 'high' },
  { id: 'path-c', start: NODES.CENTER_HUB, end: NODES.GATE_B, control: {x: 500, y: 150}, density: 'medium' },
  { id: 'path-d', start: NODES.USER, end: NODES.GATE_C, control: {x: 250, y: 300}, density: 'medium' },
  { id: 'path-e', start: NODES.USER, end: NODES.GATE_8, control: {x: 550, y: 300}, density: 'low' }
];

export default function Heatmap({ congestionLevel, isThinking, aiResult }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate moving particles for crowd flow mapping
  useEffect(() => {
    const interval = setInterval(() => {
      if (isThinking) return; // Pause particles or change behavior during AI processing
      
      const newParticle = {
        id: Math.random().toString(36).substr(2, 9),
        edge: EDGES[Math.floor(Math.random() * EDGES.length)],
        progress: 0,
        speed: Math.random() * 0.01 + 0.005,
      };
      setParticles(prev => [...prev.slice(-40), newParticle]); // keep max 40 particles
    }, 400);
    return () => clearInterval(interval);
  }, [isThinking]);

  // Determine Best Route
  const isTargetGate = (nodeId) => {
    if (!aiResult) return false;
    // Basic match logic based on output string "Gate 8"
    return aiResult.best_action.instruction.includes(NODES[nodeId].label);
  };

  const isBestPath = (edge) => {
    if (!aiResult) return false;
    return aiResult.best_action.instruction.includes("Gate 8") && edge.end.id === 'GATE_8';
  };

  const getDensityColor = (density) => {
    if (congestionLevel === 'low') {
       if(density === 'high') return 'var(--state-warning)';
       return 'var(--state-safe)';
    }
    switch (density) {
      case 'high': return 'var(--state-danger)';
      case 'medium': return 'var(--state-warning)';
      case 'low': return 'var(--state-safe)';
      default: return 'var(--state-safe)';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '400px',
      position: 'relative',
      background: 'radial-gradient(ellipse at center, rgba(30,30,40,0.8) 0%, rgba(5,5,5,1) 100%)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      cursor: 'crosshair'
    }}>
      
      {/* BACKGROUND STADIUM GEOMETRY */}
      <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={getDensityColor('high')} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Venue Outer Perimeter Track */}
        <path d="M 50,250 C 50,50 750,50 750,250 C 750,450 50,450 50,250" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="40" />
        <path d="M 100,250 C 100,100 700,100 700,250 C 700,400 100,400 100,250" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="10 5" />
        
        {/* Heatmap Center Hub Glow */}
        <circle cx={400} cy={200} r={120} fill="url(#hubGlow)" />

        {/* EDGES (Paths) */}
        {EDGES.map(edge => {
          const isHighlighted = isBestPath(edge);
          const color = isHighlighted ? 'var(--accent-neon-green)' : getDensityColor(edge.density);
          
          return (
             <g key={edge.id}>
                {/* Base Path */}
                <path 
                  id={edge.id}
                  d={`M ${edge.start.x},${edge.start.y} Q ${edge.control.x},${edge.control.y} ${edge.end.x},${edge.end.y}`}
                  fill="transparent"
                  stroke={color}
                  strokeWidth={isHighlighted ? 6 : 3}
                  strokeOpacity={isHighlighted ? 0.8 : 0.4}
                  filter={isHighlighted ? 'url(#glow)' : ''}
                  strokeDasharray={isHighlighted ? "none" : "8 8"}
                />
                
                {/* AI Route Highlight Animation */}
                {isHighlighted && (
                  <motion.path
                    d={`M ${edge.start.x},${edge.start.y} Q ${edge.control.x},${edge.control.y} ${edge.end.x},${edge.end.y}`}
                    fill="transparent"
                    stroke="var(--accent-neon-green)"
                    strokeWidth={4}
                    strokeDasharray="100 100"
                    initial={{ strokeDashoffset: 200 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow)"
                  />
                )}
             </g>
          )
        })}

        {/* NODES (Gates / Points) */}
        {Object.values(NODES).map(node => {
          const isUser = node.id === 'USER';
          const isTarget = isTargetGate(node.id);
          
          return (
            <g 
              key={node.id} 
              onMouseEnter={() => setHoveredNode(node)} 
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse rings for target or user */}
              {(isUser || isTarget) && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isTarget ? 30 : 20}
                  fill="transparent"
                  stroke={isTarget ? 'var(--accent-neon-green)' : 'var(--accent-neon-purple)'}
                  strokeWidth={2}
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Core Node Circle */}
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={isUser ? 12 : 16} 
                fill={isUser ? 'var(--accent-neon-purple)' : isTarget ? 'var(--accent-neon-green)' : '#222'} 
                stroke={isUser ? '#fff' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isUser ? 3 : 2}
                filter={isUser || isTarget ? 'url(#glow)' : ''}
              />

              {/* Node Label SVG */}
              <text 
                x={node.x} 
                y={node.y + (isUser ? 30 : 35)} 
                textAnchor="middle" 
                fill={isUser ? '#fff' : 'var(--text-secondary)'} 
                fontSize={isUser ? '14' : '16'}
                fontWeight={isUser || isTarget ? '700' : '500'}
                style={{ pointerEvents: 'none' }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* CROWD PARTICLES (HTML based for easy framer-motion pathing, though SVG paths are complex we can fake it with CSS clip-path or absolute positions. For precision, let's use tiny absolute divs calculated roughly around nodes, or just static pulses to represent crowd if exact bezier math is too heavy. Actually, let's just make simulated clusters.) */}
      {/* Realistic Simulated Crowd Clusters inside the Hubs */}
      {!isThinking && congestionLevel === 'high' && (
         <>
           <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: '150px', left: '350px', width: '100px', height: '80px', background: 'radial-gradient(circle, var(--state-danger) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', top: '80px', left: '180px', width: '60px', height: '60px', background: 'radial-gradient(circle, var(--state-danger) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
         </>
      )}

      {/* AI PROCESSING RADAR OVERLAY */}
      {isThinking && (
        <motion.div
           initial={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--accent-neon-purple-glow) 90deg, transparent 90deg)', rotate: 0 }}
           animate={{ rotate: 360 }}
           transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
           style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             width: '200%',
             height: '200%',
             marginTop: '-100%',
             marginLeft: '-100%',
             borderRadius: '50%',
             pointerEvents: 'none',
             opacity: 0.5
           }}
        />
      )}

      {/* HOVER TOOLTIP */}
      <AnimatePresence>
        {hoveredNode && hoveredNode.id !== 'USER' && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9 }}
             style={{
               position: 'absolute',
               left: `calc(${(hoveredNode.x / 800) * 100}% - 70px)`,
               top: `calc(${(hoveredNode.y / 500) * 100}% - 100px)`,
               background: 'rgba(0,0,0,0.9)',
               border: '1px solid rgba(255,255,255,0.1)',
               boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
               backdropFilter: 'blur(8px)',
               padding: '12px 16px',
               borderRadius: '12px',
               zIndex: 50,
               minWidth: '140px',
               pointerEvents: 'none'
             }}
           >
             <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
               <MapPin size={16} color="var(--text-secondary)" />
               {hoveredNode.label}
             </h4>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '4px' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Live Wait:</span>
               <span style={{ color: parseInt(hoveredNode.wait) > 15 ? 'var(--state-danger)' : 'var(--state-safe)', fontWeight: 600 }}>{hoveredNode.wait}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Density:</span>
               <span style={{ color: parseInt(hoveredNode.wait) > 15 ? 'var(--state-danger)' : 'var(--state-safe)', textTransform: 'capitalize' }}>
                 {parseInt(hoveredNode.wait) > 15 ? 'Critical' : 'Smooth'}
               </span>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
