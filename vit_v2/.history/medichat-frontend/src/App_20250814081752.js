import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import DiagnosisResult from './components/DiagnosisResult';
import History from './components/History';
import VoiceToggle from './components/VoiceToggle';
import NeedDoctor from './components/NeedDoctor';


function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
          <Route path="/history" element={<History />} />
          <Route path="/voice" element={<VoiceToggle />} />
          <Route path="/need-doctor" element={<NeedDoctor />} />
          {/* ADD THESE ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient-login" element={<Login />} />
          <Route path="/doctor-login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
