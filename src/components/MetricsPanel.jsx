import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, ShieldCheck, ActivitySquare, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const metricValues = {
  idle: [
    { label: "Wait Time Avg.", value: "18m", change: "+4m vs avg", type: "negative", trend: [12,14,15,18,17,18], icon: Clock },
    { label: "Flow Efficiency", value: "62%", change: "-5% vs avg", type: "negative", trend: [70,68,65,64,61,62], icon: TrendingUp },
    { label: "Detected Incidents", value: "8", change: "+3 alerts", type: "negative", trend: [2,3,5,6,8,8], icon: ActivitySquare },
    { label: "AI System Confidence", value: "Standby", change: "Ready", type: "neutral", trend: [100,100,100,100], icon: ShieldCheck }
  ],
  thinking: [
    { label: "Wait Time Avg.", value: "Simulating...", change: "Analyzing", type: "neutral", trend: [15,15,14,14], icon: Clock },
    { label: "Flow Efficiency", value: "Simulating...", change: "Analyzing", type: "neutral", trend: [62,65,68,70], icon: TrendingUp },
    { label: "Detected Incidents", value: "Predicting...", change: "Analyzing", type: "neutral", trend: [8,7,5,4], icon: ActivitySquare },
    { label: "AI System Confidence", value: "Processing", change: "GenAI Query", type: "neutral", trend: [80,90,95,99], icon: ShieldCheck }
  ],
  complete: [
    { label: "Wait Time Avg.", value: "7m", change: "-11m projected", type: "positive", trend: [18,17,14,10,8,7], icon: Clock },
    { label: "Flow Efficiency", value: "95%", change: "+33% projected", type: "positive", trend: [62,70,85,92,94,95], icon: TrendingUp },
    { label: "Detected Incidents", value: "1", change: "-7 cleared", type: "positive", trend: [8,6,4,2,1,1], icon: ActivitySquare },
    { label: "AI System Confidence", value: "98%", change: "Optimized", type: "positive", trend: [95,96,97,97,98,98], icon: ShieldCheck }
  ]
};

// Mini Sparkline SVG component
const Sparkline = React.memo(({ data, color }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline 
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

const MetricsPanel = React.memo(({ state }) => {
  const currentMetrics = metricValues[state] || metricValues.idle;

  return (
    <div role="region" aria-label="System Telemetry Metrics" className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Live Telemetry</h2>
      
      <div className="metrics-grid" role="list">
        {currentMetrics.map((metric, index) => {
          const Icon = metric.icon;
          let color = 'var(--text-secondary)';
          let TrendIcon = Minus;
          
          if (metric.type === 'positive') {
            color = 'var(--accent-neon-green)';
            TrendIcon = ArrowUpRight;
          } else if (metric.type === 'negative') {
            color = 'var(--state-danger)';
            TrendIcon = ArrowDownRight;
          }

          return (
            <motion.div 
              key={`${metric.label}-${state}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="metric-card"
              role="listitem"
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle background glow based on type */}
              <div style={{ position: 'absolute', top: 0, right: 0, background: `radial-gradient(circle at top right, ${color} 0%, transparent 60%)`, width: '100px', height: '100px', opacity: 0.1 }} />

              <div className="metric-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={14} style={{ color: 'var(--accent-neon-purple)' }} />
                  {metric.label}
                </span>
                
                {metric.trend && <Sparkline data={metric.trend} color={color} />}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '12px' }}>
                <span className="metric-value">{metric.value}</span>
                <span className={`metric-change ${metric.type}`} style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '4px' }}>
                  <TrendIcon size={12} />
                  {metric.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

export default MetricsPanel;
