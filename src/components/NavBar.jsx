import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, LayoutDashboard, LineChart, Info, BookOpen, Building2, MapPin, Clock, Calendar, Activity, Database } from 'lucide-react';

export default function NavBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{
        background: '#000',
        padding: '6px 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
         <div style={{ display: 'flex', gap: '1.5rem' }}>
           <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} color="var(--accent-neon-green)" /> Stadium Zone A</span>
           <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {time.toLocaleDateString()}</span>
           <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {time.toLocaleTimeString()}</span>
         </div>
         <div style={{ display: 'flex', gap: '1.5rem' }}>
           <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-neon-green)' }}>
             <Activity size={12} /> Live / Connected
           </span>
           <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-neon-purple)' }}>
             <Database size={12} /> AI Model Active
           </span>
         </div>
      </div>

      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(5, 5, 5, 0.8)',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap className="logo-icon" size={28} strokeWidth={2.5} color="var(--accent-neon-green)" />
          <span className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(90deg, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PulseTwin
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/simulation" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <LineChart size={18} /> Analytics
          </NavLink>
          <NavLink to="/how-it-works" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Info size={18} /> Intelligence
          </NavLink>
          <NavLink to="/use-cases" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Building2 size={18} /> Hubs
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <BookOpen size={18} /> Version
          </NavLink>
        </div>

        <div className="status-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 255, 157, 0.1)', border: '1px solid var(--accent-neon-green-glow)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.875rem', color: 'var(--accent-neon-green)', fontWeight: 500 }}>
          <div className="status-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-neon-green)', boxShadow: '0 0 10px var(--accent-neon-green)' }}></div>
          System Online
        </div>
        
        <style>{`
          .nav-link {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 6px 12px;
            border-radius: 8px;
          }
          .nav-link:hover {
            color: var(--text-primary);
            background: rgba(255,255,255,0.05);
          }
          .nav-link.active {
            color: var(--accent-neon-green);
            background: rgba(0, 255, 157, 0.1);
          }
        `}</style>
      </nav>
    </>
  );
}
