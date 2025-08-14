import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Send } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');

  const symptomCards = [
    "🤒 What symptoms are you experiencing?",
    "💊 Describe your main symptom?",
    "⚡ Explain when pain started?",
    "🩺 Share your recent concerns?",
    "😷 Report any current discomfort..",
    "💔 Mention your health changes..",
    "📍 Describe where discomfort occurs?"
  ];

  const bottomCards = [
    "🌡️ Check your temperature symptoms",
    "🫀 Heart-related health concerns",
    "🧠 Headache and migraine issues",
    "🦴 Bone and joint pain problems",
    "🫁 Breathing difficulties today",
    "💭 Mental health and stress",
    "🔍 General health checkup"
  ];

  const handleCardClick = (symptom) => {
    navigate('/chat', { state: { initialSymptom: symptom } });
  };

  const handleProblemSubmit = (e) => {
    e.preventDefault();
    if (problemText.trim()) {
      navigate('/chat', { state: { initialSymptom: problemText } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full width container with proper padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-medical-red">Medi</span>
            <span className="text-black">Chat</span>
          </h1>
        </div>

        {/* Top Symptom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {symptomCards.map((symptom, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(symptom)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                index % 2 === 0 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <p className="text-center font-medium">{symptom}</p>
            </div>
          ))}
        </div>

        {/* Main Problem Input Section - Updated */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-medical-red w-8 h-8 z-10" />
            <form onSubmit={handleProblemSubmit} className="w-full">
              <div className="border-4 border-medical-red rounded-2xl bg-white overflow-hidden">
                <div className="flex items-center pl-16 pr-4 py-4">
                  <input
                    type="text"
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                    placeholder="Enter the problem..."
                    className="flex-1 text-lg outline-none border-none bg-transparent placeholder-gray-500 text-gray-800"
                  />
                  <button
                    type="submit"
                    disabled={!problemText.trim()}
                    className="ml-4 w-12 h-12 bg-medical-red rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Different Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bottomCards.map((card, index) => (
            <div
              key={`bottom-${index}`}
              onClick={() => handleCardClick(card)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                index % 2 === 0 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <p className="text-center font-medium">{card}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
