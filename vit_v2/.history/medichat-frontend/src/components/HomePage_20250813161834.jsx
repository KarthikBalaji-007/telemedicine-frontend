import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Send, Upload } from 'lucide-react';

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

  // Handle file upload functionality
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.includes('image') ? 'medical image' : 'medical report';
      const uploadMessage = `I have uploaded a ${fileType}: ${file.name}. Please analyze this file and provide medical insights.`;
      
      // Navigate to chat with file information
      navigate('/chat', { 
        state: { 
          initialSymptom: uploadMessage,
          uploadedFile: file
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

        {/* Center Content - With Upload Button */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-medical-red w-8 h-8 z-10" />
            <div className="border-4 border-medical-red rounded-2xl bg-white p-8 pl-16">
              {/* Center Content from Your Image */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Stethoscope className="text-medical-red w-12 h-12 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    "How can I support your{' '}
                    <span className="text-medical-red">health research</span>{' '}
                    today?"
                  </h2>
                </div>
                
                {/* Input Section with Upload Button */}
                <form onSubmit={handleProblemSubmit} className="mt-6">
                  <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <input
                      type="text"
                      value={problemText}
                      onChange={(e) => setProblemText(e.target.value)}
                      placeholder="Enter details"
                      className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                    />
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => navigate('/history')}
                        className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        History
                      </button>
                      
                      {/* Upload Button - Added here */}
                      <label className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors flex items-center">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                        <input
                          type="file"
                          accept="image/*,.pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      
                      <button
                        type="button"
                        className="bg-gray-600 text-white p-2 rounded-full"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        disabled={!problemText.trim()}
                        className="bg-medical-red text-white p-2 rounded-full disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <button
                    onClick={() => navigate('/chat')}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Ask MediChat
                  </button>
                  <button
                    onClick={() => navigate('/chat')}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Talk MediChat
                  </button>
                  <button
                    onClick={() => navigate('/chat')}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Symptoms
                  </button>
                  <button
                    onClick={() => navigate('/diagnosis')}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Diagnosis
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                    More
                  </button>
                </div>
              </div>
            </div>
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
