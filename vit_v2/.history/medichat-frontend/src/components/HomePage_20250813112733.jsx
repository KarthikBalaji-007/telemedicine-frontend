import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const symptomCards = [
    " What symptoms are you experiencing?",
    " Describe your main symptom?",
    " Explain when pain started?",
    " Share your recent concerns?",
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

  const handleMainChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white p-6">
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

      {/* Main Chat Input */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-medical-red w-8 h-8" />
          <div 
            className="border-4 border-medical-red rounded-2xl p-6 pl-16 bg-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleMainChatClick}
          >
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-medical-red rounded-full flex items-center justify-center">
                <div className="text-2xl">🩺</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Different Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
  );
};

export default HomePage;
