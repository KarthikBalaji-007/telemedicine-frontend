import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Mic, Activity, Send, ArrowLeft } from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const initialSymptom = location.state?.initialSymptom || '';
  const uploadedFile = location.state?.uploadedFile;

  useEffect(() => {
    if (initialSymptom) {
      setInputText(initialSymptom);
      // Auto-process for quick symptom cards
      if (initialSymptom.includes('Common Cold') || 
          initialSymptom.includes('Headache') || 
          initialSymptom.includes('Heart-related') ||
          initialSymptom.includes('temperature symptoms') ||
          initialSymptom.includes('Breathing difficulties')) {
        handleAutoSubmit(initialSymptom);
      }
    }
  }, [initialSymptom]);

  const handleAutoSubmit = async (symptom) => {
    setIsLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Auto-navigate to diagnosis
    navigate('/diagnosis', { state: { symptoms: symptom } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setIsLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate('/diagnosis', { state: { symptoms: userMessage } });
  };

  const quickActions = [
    'Common Cold',
    'Fever Check',
    'Headache',
    'Stomach Issues',
    'More Symptoms'
  ];

  const handleQuickAction = (action) => {
    setInputText(action);
    handleAutoSubmit(action);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
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

        {/* Upload File Display */}
        {uploadedFile && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>Uploaded File:</strong> {uploadedFile.name}
            </p>
            <p className="text-sm text-blue-600">File analysis will be included in your diagnosis</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-6 text-center">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-medical-red mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-medical-red mb-2">🧠 Processing Your Request...</h3>
              <p className="text-gray-600">Please wait while I analyze your symptoms and generate recommendations.</p>
            </div>
          </div>
        )}

        {/* Chat Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms..."
              disabled={isLoading}
              className="w-full p-4 bg-gray-200 rounded-lg pr-32 focus:outline-none focus:ring-2 focus:ring-medical-red disabled:opacity-50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                type="button"
                onClick={() => navigate('/history')}
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
                disabled={!inputText.trim() || isLoading}
                className="bg-medical-red text-white p-2 rounded-full disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
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
