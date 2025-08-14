import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Mic, Activity } from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  
  const initialSymptom = location.state?.initialSymptom || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      navigate('/diagnosis', { state: { symptoms: inputText } });
    }
  };

  const quickActions = [
    'Ask MediChat',
    'Talk MediChat',
    'Symptoms',
    'Diagnosis',
    'More'
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-medical-red">Medi</span>
          <span className="text-black">Chat</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Stethoscope className="text-medical-red w-12 h-12 mr-4" />
          <div className="flex-1">
            <p className="text-xl text-gray-700">
              "How can I support your <span className="text-medical-red font-semibold">health research</span> today?"
            </p>
          </div>
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={initialSymptom || "Enter details"}
              className="w-full p-4 bg-gray-200 rounded-lg pr-32 focus:outline-none focus:ring-2 focus:ring-medical-red"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                type="button"
                className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                History
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white p-2 rounded-full"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="bg-medical-red text-white p-2 rounded-full"
              >
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
