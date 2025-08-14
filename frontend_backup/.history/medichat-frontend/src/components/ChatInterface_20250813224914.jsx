import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Mic, Activity, Send, Upload, ArrowLeft } from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const initialSymptom = location.state?.initialSymptom || '';
  const uploadedFile = location.state?.uploadedFile;

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
    
    // Check for file upload
    if (message.includes('uploaded') && (message.includes('image') || message.includes('report'))) {
      return "I can see you've uploaded a medical file. Here's my analysis:\n\n📋 **File Analysis:**\n- I've received your medical document/image\n- Processing the visual/textual content for medical insights\n- Extracting relevant medical information\n\n**Based on uploaded content:**\n- Please describe any specific symptoms or concerns about this file\n- Are there particular areas you'd like me to focus on?\n- When was this test/image taken?\n\n**Next steps:**\n- I can provide detailed analysis of the uploaded content\n- Recommend follow-up actions based on findings\n- Suggest when to consult healthcare professionals\n\nWould you like me to generate a comprehensive diagnosis report?";
    }
    
    // Quick Action Responses - Enhanced for auto-chat
    if (message.includes('common cold')) {
      return "I see you're concerned about a common cold. Let me provide a comprehensive analysis:\n\n🤧 **Common Cold Assessment:**\n- Typical duration: 7-10 days\n- Caused by: Rhinoviruses (most common)\n- Symptoms: Runny nose, sneezing, mild cough, sore throat\n\n**Treatment Recommendations:**\n- Rest and stay well-hydrated (8-10 glasses of water daily)\n- Warm salt water gargles (1/2 tsp salt in warm water)\n- Honey for cough relief (1-2 teaspoons)\n- Over-the-counter medications: acetaminophen or ibuprofen for aches\n\n**When to see a doctor:**\n- Fever above 101.3°F (38.5°C)\n- Symptoms worsen after a week\n- Severe headache or sinus pain\n- Difficulty breathing\n\n**Prevention for next time:**\n- Wash hands frequently\n- Avoid touching face\n- Stay away from sick people\n- Get adequate sleep and nutrition\n\nWould you like more specific advice based on your current symptoms?";
    }

    if (message.includes('fever check')) {
      return "Let me help you with fever assessment and management:\n\n🌡️ **Fever Analysis Guide:**\n\n**Temperature Classifications:**\n- Normal: 97°F - 99°F (36.1°C - 37.2°C)\n- Low-grade fever: 99.1°F - 100.4°F (37.3°C - 38°C)\n- Moderate fever: 100.5°F - 102.9°F (38.1°C - 39.4°C)\n- High fever: 103°F+ (39.4°C+)\n\n**What your body is doing:**\n- Fighting infection naturally\n- Boosting immune system response\n- Creating hostile environment for pathogens\n\n**Home Management:**\n- Stay hydrated: water, herbal teas, clear broths\n- Rest in cool, comfortable environment\n- Light clothing and cool compresses\n- Acetaminophen or ibuprofen as directed\n\n**SEEK IMMEDIATE CARE if:**\n- Temperature above 103°F (39.4°C)\n- Difficulty breathing or chest pain\n- Severe headache with stiff neck\n- Persistent vomiting\n- Signs of dehydration\n\nWhat's your current temperature reading?";
    }

    if (message.includes('headache')) {
      return "I understand you're dealing with headache issues. Here's my comprehensive analysis:\n\n🧠 **Headache Assessment & Management:**\n\n**Types of Headaches:**\n- **Tension headaches** (90%): Band-like pressure, stress-related\n- **Migraines** (8%): Throbbing, often one-sided, nausea\n- **Cluster headaches** (1%): Severe, around one eye\n- **Sinus headaches**: Pressure in forehead/cheeks\n\n**Immediate Relief Strategies:**\n- Rest in quiet, dark room\n- Apply cold compress to forehead (15-20 minutes)\n- Gentle neck and shoulder massage\n- Stay hydrated - drink water slowly\n- Practice deep breathing exercises\n\n**Medications:**\n- Over-the-counter: acetaminophen, ibuprofen, aspirin\n- Take early when headache starts\n- Follow package directions carefully\n\n**RED FLAGS - Seek emergency care:**\n- Sudden, severe \"thunderclap\" headache\n- Headache with fever and stiff neck\n- Changes in vision or speech\n- Headache after head injury\n- Worsening pattern of headaches\n\nCan you describe your headache pattern and severity (1-10 scale)?";
    }

    if (message.includes('stomach issues')) {
      return "Let me help you with stomach-related concerns:\n\n🤢 **Stomach Issues Analysis:**\n\n**Common Causes:**\n- Food poisoning or foodborne illness\n- Viral gastroenteritis (stomach flu)\n- Dietary indiscretion or food intolerance\n- Stress and anxiety\n- Medication side effects\n\n**Symptom Management:**\n- **Nausea**: Ginger tea, small frequent meals\n- **Vomiting**: Clear fluids, rest stomach\n- **Diarrhea**: BRAT diet (bananas, rice, applesauce, toast)\n- **Stomach pain**: Avoid dairy, spicy, fatty foods\n\n**Hydration is KEY:**\n- Small sips of water frequently\n- Electrolyte solutions (sports drinks diluted)\n- Clear broths and herbal teas\n- Avoid alcohol and caffeine\n\n**When to seek medical care:**\n- Severe dehydration (dizziness, dark urine)\n- Blood in vomit or stool\n- High fever with stomach symptoms\n- Severe abdominal pain\n- Symptoms persist beyond 48 hours\n\n**Recovery foods:**\n- Start with clear liquids\n- Progress to bland foods\n- Gradually return to normal diet\n\nWhat specific stomach symptoms are you experiencing?";
    }

    if (message.includes('more symptoms')) {
      return "I'm here to help with any health concerns you might have. Let me guide you through additional symptom categories:\n\n🩺 **Additional Symptom Categories:**\n\n**Respiratory Issues:**\n- Cough, shortness of breath, chest tightness\n- Sore throat, congestion, wheezing\n\n**Musculoskeletal Problems:**\n- Joint pain, muscle aches, back pain\n- Swelling, stiffness, limited mobility\n\n**Skin Conditions:**\n- Rashes, itching, unusual marks\n- Changes in moles, skin texture\n\n**Neurological Symptoms:**\n- Dizziness, numbness, tingling\n- Memory issues, confusion\n\n**Mental Health:**\n- Anxiety, depression, sleep issues\n- Stress management, mood changes\n\n**Women's Health:**\n- Menstrual issues, pregnancy concerns\n- Hormonal changes\n\n**Men's Health:**\n- Prostate concerns, hormonal issues\n\n**Pediatric Issues:**\n- Child-specific symptoms and concerns\n\nPlease describe your specific symptoms, and I'll provide detailed guidance and recommendations. What area would you like to discuss?";
    }
    
    // Medical symptom analysis simulation
    if (message.includes('fever') || message.includes('temperature')) {
      return "Based on your fever symptoms, here's what I can tell you:\n\n🌡️ **Fever Analysis:**\n- Mild fever (100-102°F): Often indicates your body is fighting an infection\n- Monitor your temperature regularly\n- Stay hydrated and rest\n\n**When to seek immediate care:**\n- Fever above 103°F (39.4°C)\n- Difficulty breathing\n- Severe headache or stiff neck\n\nWould you like me to help you with a more detailed diagnosis based on additional symptoms?";
    }
    
    if (message.includes('cold') || message.includes('cough') || message.includes('sneez')) {
      return "I see you're experiencing cold-like symptoms. Let me help:\n\n🤧 **Cold Symptom Assessment:**\n- Common cold typically lasts 7-10 days\n- Symptoms: runny nose, sneezing, mild cough\n- Usually caused by viral infections\n\n**Recommendations:**\n- Rest and stay hydrated\n- Warm salt water gargles\n- Honey for cough relief\n- Over-the-counter medications as needed\n\n**See a doctor if:**\n- Symptoms persist beyond 10 days\n- Fever above 101.3°F\n- Severe headache or sinus pain\n\nShall I provide a detailed diagnosis report?";
    }
    
    if (message.includes('head')) {
      return "I understand you're dealing with headaches. Here's my analysis:\n\n🧠 **Headache Assessment:**\n- **Tension headaches**: Most common, often stress-related\n- **Migraines**: More severe, may include nausea, light sensitivity\n- **Cluster headaches**: Severe, one-sided pain\n\n**Immediate relief options:**\n- Rest in a quiet, dark room\n- Apply cold or warm compress\n- Stay hydrated\n- Gentle neck/shoulder massage\n\n**Red flags - seek immediate care:**\n- Sudden, severe headache\n- Headache with fever and stiff neck\n- Changes in vision\n- Headache after head injury\n\nWould you like me to generate a comprehensive diagnosis?";
    }
    
    if (message.includes('pain') || message.includes('hurt')) {
      return "I see you're experiencing pain. Let me help assess this:\n\n⚡ **Pain Analysis:**\n- Pain location and intensity are important factors\n- Duration and triggers help determine cause\n- Associated symptoms provide additional clues\n\n**Pain Management Suggestions:**\n- Rest and avoid aggravating activities\n- Apply ice for acute injuries, heat for muscle tension\n- Over-the-counter pain relievers as appropriate\n- Gentle movement and stretching\n\n**Seek medical attention if:**\n- Severe, persistent pain\n- Pain with swelling, redness, or warmth\n- Numbness or tingling\n- Pain interfering with daily activities\n\nShall I create a detailed diagnosis report for you?";
    }

    // Check if this is a follow-up question to avoid repeating generic response
    if (messages.length > 2) {
      return "I understand you need more information. Could you please:\n\n- Provide more specific details about your symptoms\n- Tell me about the severity and duration\n- Mention any other related symptoms\n- Let me know if you've tried any treatments\n\nThis will help me give you more targeted medical guidance.";
    }
    
    // Default response (only for first-time users)
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

  // Handle file upload functionality
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.includes('image') ? 'medical image' : 'medical report';
      const uploadMessage = `I have uploaded a ${fileType}: ${file.name}. Please analyze this file and provide medical insights.`;
      
      // Add user message about upload
      setMessages(prev => [...prev, {
        text: uploadMessage,
        sender: 'user',
        timestamp: new Date()
      }]);
      
      // Process the upload message
      processMessage(uploadMessage);
    }
  };

  // AUTO-CHAT FUNCTIONALITY - This is the key addition
  const handleQuickActionClick = async (action) => {
    if (isLoading) return; // Prevent multiple clicks during loading
    
    // Add user message immediately
    setMessages(prev => [...prev, {
      text: action,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    // Start AI processing automatically
    await processMessage(action);
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

      {/* Upload File Display */}
      {uploadedFile && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>Uploaded File:</strong> {uploadedFile.name}
          </p>
          <p className="text-sm text-blue-600">File analysis will be included in your diagnosis</p>
        </div>
      )}

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
              
              <button
                type="button"
                onClick={() => navigate('/history')}
                className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                History
              </button>
              <button
  onClick={() => navigate('/voice')}
  className="bg-gray-600 text-white p-2 rounded-full"
>
  🎙️ 
</button>
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

        {/* Quick Actions - AUTO-CHAT ENABLED */}
        <div className="flex flex-wrap gap-3 justify-center">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickActionClick(action)}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
