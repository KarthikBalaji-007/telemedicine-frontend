import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Send, Upload, Plus, X, UserCheck, ChevronDown, Brain, Heart, Check } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState('MediCare');

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

  // Model options similar to ChatGPT
  const modelOptions = [
    {
      id: 'medicare',
      name: 'MediCare',
      description: 'Advanced medical diagnosis and treatment recommendations',
      icon: '🏥',
      color: 'text-blue-600',
      features: ['Medical Diagnosis', 'Treatment Plans', 'Drug Interactions', 'Emergency Care']
    },
    {
      id: 'mindcare',
      name: 'MindCare',
      description: 'Mental health support and psychological wellness',
      icon: '🧠',
      color: 'text-purple-600',
      features: ['Mental Health', 'Therapy Support', 'Stress Management', 'Wellness Tips']
    },
    {
      id: 'eldercare',
      name: 'ElderCare',
      description: 'Specialized care for seniors and elderly patients',
      icon: '👴',
      color: 'text-green-600',
      features: ['Senior Health', 'Chronic Conditions', 'Medication Management', 'Mobility Support']
    },
    {
      id: 'childcare',
      name: 'ChildCare',
      description: 'Pediatric healthcare for children and infants',
      icon: '👶',
      color: 'text-pink-600',
     
    }
  ];

  const handleCardClick = (symptom) => {
    navigate('/chat', { state: { initialSymptom: symptom, selectedModel } });
  };

  const handleProblemSubmit = (e) => {
    e.preventDefault();
    if (problemText.trim()) {
      navigate('/chat', { state: { initialSymptom: problemText, selectedModel } });
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
          uploadedFile: file,
          selectedModel
        } 
      });
    }
  };

  const toggleModelSelector = () => {
    setShowModelSelector(!showModelSelector);
  };

  const selectModel = (modelId, modelName) => {
    setSelectedModel(modelName);
    setShowModelSelector(false);
  };

  const getCurrentModelInfo = () => {
    return modelOptions.find(model => model.name === selectedModel) || modelOptions[0];
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

                {/* Model Selector Display */}
                <div className="mb-4 flex items-center justify-center">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center">
                    <span className="text-2xl mr-2">{getCurrentModelInfo().icon}</span>
                    <span className="font-medium text-gray-700">Using: {selectedModel}</span>
                  </div>
                </div>
                
                {/* Input Section with Model Selector */}
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

                      {/* MODEL SELECTOR BUTTON - ChatGPT Style */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={toggleModelSelector}
                          className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center"
                          title="Select AI Model"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${showModelSelector ? 'rotate-180' : ''}`} />
                        </button>

                        {/* MODEL SELECTOR DROPDOWN - ChatGPT Style */}
                        {showModelSelector && (
                          <div className="absolute bottom-full mb-2 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-slideUp">
                            <div className="p-4 border-b border-gray-200">
                              <h3 className="font-semibold text-gray-800 flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-medical-red" />
                                Choose AI Model
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">Select the best AI model for your health needs</p>
                            </div>
                            
                            <div className="max-h-96 overflow-y-auto">
                              {modelOptions.map((model) => (
                                <div
                                  key={model.id}
                                  onClick={() => selectModel(model.id, model.name)}
                                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                >
                                  <div className="flex items-start">
                                    <div className="text-2xl mr-3 mt-1">{model.icon}</div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className={`font-semibold ${model.color}`}>{model.name}</h4>
                                        {selectedModel === model.name && (
                                          <Check className="w-5 h-5 text-green-600" />
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                                      <div className="flex flex-wrap gap-1">
                                        {model.features.map((feature, index) => (
                                          <span
                                            key={index}
                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                          >
                                            {feature}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

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
                    onClick={() => navigate('/chat', { state: { selectedModel } })}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Ask MediChat
                  </button>
                  <button
                    onClick={() => navigate('/chat', { state: { selectedModel } })}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Talk MediChat
                  </button>
                  <button
                    onClick={() => navigate('/chat', { state: { selectedModel } })}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Symptoms
                  </button>
                  <button
                    onClick={() => navigate('/need-doctor')}
                    className="px-6 py-2 bg-medical-red text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    Need Doctor
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

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
