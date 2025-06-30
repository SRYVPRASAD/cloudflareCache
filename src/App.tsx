import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Tools from './pages/Tools';
import CachePurging from './pages/learn/CachePurging';
import BestPractices from './pages/learn/BestPractices';
import CacheTypes from './pages/learn/CacheTypes';
import PurgeCalculator from './pages/tools/PurgeCalculator';
import CacheAnalyzer from './pages/tools/CacheAnalyzer';
import PerformanceMonitor from './pages/tools/PerformanceMonitor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learn" element={<Learn />}>
            <Route index element={<CachePurging />} />
            <Route path="cache-purging" element={<CachePurging />} />
            <Route path="best-practices" element={<BestPractices />} />
            <Route path="cache-types" element={<CacheTypes />} />
          </Route>
          <Route path="tools" element={<Tools />}>
            <Route index element={<PurgeCalculator />} />
            <Route path="purge-calculator" element={<PurgeCalculator />} />
            <Route path="cache-analyzer" element={<CacheAnalyzer />} />
            <Route path="performance-monitor" element={<PerformanceMonitor />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;