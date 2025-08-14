import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Send, Upload, Plus, X, UserCheck } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');
  const [showExpandedSection, setShowExpandedSection] = useState(false);

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

  // Expanded section options
  const expandedOptions = [
    { 
      icon: "🏥", 
      title: "Emergency Services", 
      description: "Immediate medical attention",
      action: () => navigate('/emergency')
    },
    { 
      icon: "👨‍⚕️", 
      title: "Find Doctors", 
      description: "Search nearby specialists",
      action: () => navigate('/find-doctors')
    },
    { 
      icon: "💊", 
      title: "Pharmacy Locator", 
      description: "Find nearest pharmacies",
      action: () => navigate('/pharmacy')
    },
    { 
      icon: "📅", 
      title: "Book Appointment", 
      description: "Schedule with healthcare providers",
      action: () => navigate('/need-doctor')
    },
    { 
      icon: "🧪", 
      title: "Lab Tests", 
      description: "Book laboratory tests",
      action: () => navigate('/lab-tests')
    },
    { 
      icon: "📊", 
      title: "Health Reports", 
      description: "View your medical records",
      action: () => navigate('/health-reports')
    },
    { 
      icon: "💳", 
      title: "Insurance", 
      description: "Manage health insurance",
      action: () => navigate('/insurance')
    },
    { 
      icon: "📞", 
      title: "Telehealth", 
      description: "Video consultation",
      action: () => navigate('/telehealth')
    }
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

  const toggleExpandedSection = () => {
    setShowExpandedSection(!showExpandedSection);
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

        {/* Disclaimer Banner */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Disclaimer:</strong> MediChat AI provides information for educational purposes only and suggestions are not prescribed. Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </div>
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
              {/* Center Content */}
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
                      
                      {/* Upload Button */}
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
                      
                      {/* Voice Button */}
                      <button
                        type="button"
                        onClick={() => navigate('/voice')}
                        className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                        title="Voice Chat"
                      >
                        🎙️ 
                      </button>

                      {/* PLUS BUTTON - ADDED HERE */}
                      <button
                        type="button"
                        onClick={toggleExpandedSection}
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                        title={showExpandedSection ? "Hide Options" : "More Options"}
                      >
                        {showExpandedSection ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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

                {/* EXPANDABLE SECTION - SHOWS BELOW ENTER SECTION */}
                {showExpandedSection && (
                  <div className="mt-6 bg-gray-50 rounded-lg p-6 border-2 border-gray-200 animate-slideDown">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Plus className="w-5 h-5 text-green-600 mr-2" />
                      Additional Health Services
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {expandedOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={option.action}
                          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md hover:border-medical-red transition-all group"
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{option.icon}</div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-medical-red">
                              {option.title}
                            </h4>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Access to Need Doctor */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => navigate('/need-doctor')}
                        className="w-full bg-medical-red text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Need Immediate Doctor Consultation
                      </button>
                    </div>
                  </div>
                )}

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

      {/* Add custom CSS for slide animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
