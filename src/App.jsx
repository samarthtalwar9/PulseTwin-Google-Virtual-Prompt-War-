import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SimulationDetails from './pages/SimulationDetails';
import HowItWorks from './pages/HowItWorks';
import UseCases from './pages/UseCases';
import About from './pages/About';

// Layout wrapper for authenticated/dashboard routes
const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <NavBar />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', position: 'relative' }}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page (no navbar) */}
        <Route path="/" element={<Landing />} />
        
        {/* App Pages (with NavBar) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulation" element={<SimulationDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
