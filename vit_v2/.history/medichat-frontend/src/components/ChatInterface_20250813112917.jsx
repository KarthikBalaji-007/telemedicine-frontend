import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Mic, Activity, Send } from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const initialSymptom = location.state?.initialSymptom || '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialSymptom) {
      setMessages([{
        text: initialSymptom,
        sender: 'user',
        timestamp: new Date()
      }]);
      // Auto-process initial symptom
      processMessage(initialSymptom);
    } else {
      // Welcome message
      setMessages([{
        text: "Hello! I'm MediChat, your AI health assistant. Please describe your symptoms and I'll help provide medical guidance. Remember, I'm here to assist but always consult with healthcare professionals for serious concerns.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [initialSymptom]);

  const processMessage = async (message) => {
    setIsLoading(true);
    
    try {
      // Simulate AI processing with medical context
      const response = await simulateAIResponse(message);
      
      setMessages(prev => [...prev, {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble processing your request right now. Please try again later or consult with a healthcare professional.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
    
    setIsLoading(false);
  };

  const simulateAIResponse = async (userMessage) => {
    // This simulates an AI response - in production, you'd call your LLM API
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    
    const message = userMessage.toLowerCase();
    
    // Medical symptom analysis simulation
    if (message.includes('fever') || message.includes('temperature')) {
      return "Based on your fever symptoms, here's what I can tell you:\n\n🌡️ **Fever Analysis:**\n- Mild fever (100-102°F): Often indicates your body is fighting an infection\n- Monitor your temperature regularly\n- Stay hydrated and rest\n\n**When to seek immediate care:**\n- Fever above 103°F (39.4°C)\n- Difficulty breathing\n- Severe headache or stiff neck\n\nWould you like me to help you with a more detailed diagnosis based on additional symptoms?";
    }
    
    if (message.includes('cold') || message.includes('cough') || message.includes('sneez')) {
      return "I see you're experiencing cold-like symptoms. Let me help:\n\n🤧 **Cold Symptom Assessment:**\n- Common cold typically lasts 7-10 days\n- Symptoms: runny nose, sneezing, mild cough\n- Usually caused by viral infections\n\n**Recommendations:**\n- Rest and stay hydrated\n- Warm salt water gargles\n- Honey for cough relief\n- Over-the-counter medications as needed\n\n**See a doctor if:**\n- Symptoms persist beyond 10 days\n- Fever above 101.3°F\n- Severe headache or sinus pain\n\nShall I provide a detailed diagnosis report?";
    }
    
    if (message.includes('headache') || message.includes('head')) {
      return "I understand you're dealing with headaches. Here's my analysis:\n\n🧠 **Headache Assessment:**\n- **Tension headaches**: Most common, often stress-related\n- **Migraines**: More severe, may include nausea, light sensitivity\n- **Cluster headaches**: Severe, one-sided pain\n\n**Immediate relief options:**\n- Rest in a quiet, dark room\n- Apply cold or warm compress\n- Stay hydrated\n- Gentle neck/shoulder massage\n\n**Red flags - seek immediate care:**\n- Sudden, severe headache\n- Headache with fever and stiff neck\n- Changes in vision\n- Headache after head injury\n\nWould you like me to generate a comprehensive diagnosis?";
    }
    
    if (message.includes('pain') || message.includes('hurt')) {
      return "I see you're experiencing pain. Let me help assess this:\n\n⚡ **Pain Analysis:**\n- Pain location and intensity are important factors\n- Duration and triggers help determine cause\n- Associated symptoms provide additional clues\n\n**Pain Management Suggestions:**\n- Rest and avoid aggravating activities\n- Apply ice for acute injuries, heat for muscle tension\n- Over-the-counter pain relievers as appropriate\n- Gentle movement and stretching\n\n**Seek medical attention if:**\n- Severe, persistent pain\n- Pain with swelling, redness, or warmth\n- Numbness or tingling\n- Pain interfering with daily activities\n\nShall I create a detailed diagnosis report for you?";
    }
    
    // Default response
    return "Thank you for sharing your symptoms with me. Based on what you've described, I'd like to gather more information to provide you with the most accurate assessment.\n\n🩺 **To better help you, please tell me:**\n- When did these symptoms start?\n- How severe are they on a scale of 1-10?\n- Have you tried any treatments?\n- Are there any other symptoms?\n\n**General Health Advice:**\n- Monitor your symptoms closely\n- Stay hydrated and get adequate rest\n- Maintain good hygiene\n- Don't hesitate to contact healthcare providers for serious concerns\n\nWould you like me to generate a preliminary diagnosis based on the information provided?";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    
    // Add user message
    setMessages(prev => [...prev, {
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    // Process with AI
    await processMessage(userMessage);
  };

  const handleDiagnosis = () => {
    // Pass chat history to diagnosis page
    navigate('/diagnosis', { 
      state: { 
        messages: messages,
        symptoms: messages.filter(m => m.sender === 'user').map(m => m.text).join(', ')
      } 
    });
  };

  const quickActions = [
    'Common Cold',
    'Fever Check',
    'Headache',
    'Stomach Issues',
    'More Symptoms'
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

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-medical-red text-white rounded-tr-none' 
                  : 'bg-white border border-gray-300 text-gray-800 rounded-tl-none'
              }`}>
                <div className={message.sender === 'user' ? 'flex items-center' : 'flex items-start'}>
                  {message.sender === 'bot' && <Stethoscope className="text-medical-red w-5 h-5 mr-2 mt-1 flex-shrink-0" />}
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block bg-white border border-gray-300 px-4 py-2 rounded-lg rounded-tl-none">
                <div className="flex items-center">
                  <Stethoscope className="text-medical-red w-5 h-5 mr-2" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-medical-red rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-medical-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-medical-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms..."
              disabled={isLoading}
              className="w-full p-4 bg-gray-200 rounded-lg pr-48 focus:outline-none focus:ring-2 focus:ring-medical-red disabled:opacity-50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                type="button"
                onClick={handleDiagnosis}
                className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Diagnosis
              </button>
              <button
                type="button"
                onClick={() => navigate('/history')}
                className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium"
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
              onClick={() => setInputText(action)}
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
