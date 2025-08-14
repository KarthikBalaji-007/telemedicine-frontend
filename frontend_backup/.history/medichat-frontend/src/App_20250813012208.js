import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import DiagnosisResult from './components/DiagnosisResult';
import History from './components/History';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/diagnosis" element={<DiagnosisResult />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
