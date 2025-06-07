import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntryPage from './components/EntryPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StudentData from './components/StudentData'; // Import the StudentData component
import RiskAnalysis from './components/RiskAnalysis';
import InterventionPlans from './components/InterventionPlans';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student-data" element={<StudentData />} /> {/* Add this route */}
      <Route path="/risk-analysis" element={<RiskAnalysis />} />
      <Route path="/intervention-plans" element={<InterventionPlans />} />
    </Routes>
  );
}

export default App;