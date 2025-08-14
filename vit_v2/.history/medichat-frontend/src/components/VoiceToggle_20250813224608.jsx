import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const VoiceToggle = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Refs for managing speech recognition and synthesis
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const isReady = useRef(false);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
      
      if (finalTranscript) {
        processVoiceInput(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
    };

    recognitionRef.current = recognition;
    isReady.current = true;

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  // Process voice input and generate response
  const processVoiceInput = async (input) => {
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateMedicalResponse(input);
      setResponse(aiResponse);
      
      // Speak the response if audio is enabled
      if (audioEnabled) {
        speakResponse(aiResponse);
      }
    } catch (error) {
      setError('Error processing voice input');
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate medical response based on input
  const generateMedicalResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi')) {
      return "Hello! I'm MediChat, your AI health assistant. How can I help you with your health concerns today?";
    }
    
    if (text.includes('fever') || text.includes('temperature')) {
      return "I understand you're experiencing fever symptoms. Please monitor your temperature regularly. Stay hydrated, rest, and consider taking acetaminophen if needed. If your fever exceeds 103°F or persists for more than 3 days, please consult a healthcare provider immediately.";
    }
    
    if (text.includes('headache') || text.includes('head pain')) {
      return "For headache relief, try resting in a quiet, dark room. Apply a cold or warm compress to your head. Stay hydrated and consider over-the-counter pain relievers. If you experience sudden, severe headaches or headaches with other symptoms, seek medical attention.";
    }
    
    if (text.includes('cold') || text.includes('cough')) {
      return "For cold symptoms, get plenty of rest and drink fluids. Warm salt water gargles can help with sore throat. Use a humidifier and consider over-the-counter medications. See a doctor if symptoms worsen or persist beyond 10 days.";
    }
    
    if (text.includes('stomach') || text.includes('nausea')) {
      return "For stomach issues, try the BRAT diet: bananas, rice, applesauce, and toast. Stay hydrated with small sips of water. Avoid dairy and spicy foods. If you experience severe pain, blood, or persistent symptoms, consult a healthcare provider.";
    }
    
    if (text.includes('help') || text.includes('what can you do')) {
      return "I can help you with health questions, symptom analysis, first aid guidance, and provide general medical information. Please describe your symptoms or ask me any health-related questions. Remember, I'm here to assist, but always consult healthcare professionals for serious concerns.";
    }
    
    // Default response
    return "Thank you for sharing that with me. Could you provide more details about your symptoms? When did they start, and how severe are they? This will help me give you more specific guidance.";
  };

  // Speak the AI response
  const speakResponse = (text) => {
    if (!synthRef.current) return;
    
    // Stop any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    
    // Get available voices
    const voices = synthRef.current.getVoices();
    if (voices.length > 0) {
      // Prefer female voice for medical assistant
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel')
      );
      utterance.voice = femaleVoice || voices[0];
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      setError(`Speech synthesis error: ${event.error}`);
    };
    
    synthRef.current.speak(utterance);
  };

  // Start voice recognition
  const startListening = () => {
    if (!isReady.current || !recognitionRef.current) {
      setError('Speech recognition not ready');
      return;
    }
    
    setTranscript('');
    setResponse('');
    setError('');
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      setError('Failed to start speech recognition');
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Toggle audio output
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Stop current speech
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold">
            <span className="text-medical-red">Voice</span>
            <span className="text-black">Chat</span>
          </h1>
          
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`ml-auto p-3 rounded-full transition-colors ${
              audioEnabled 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-400 text-white hover:bg-gray-500'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>

        {/* Main Voice Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Voice Visualization */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
            <div className={`mx-auto mb-6 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' 
                : isSpeaking
                ? 'bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50'
                : isProcessing
                ? 'bg-yellow-500 animate-spin shadow-lg shadow-yellow-500/50'
                : 'bg-gray-300'
            }`}>
              {isListening ? (
                <Mic className="w-16 h-16 text-white" />
              ) : isSpeaking ? (
                <Volume2 className="w-16 h-16 text-white" />
              ) : (
                <MicOff className="w-16 h-16 text-white" />
              )}
            </div>

            {/* Status Display */}
            <div className="mb-6">
              {isListening && (
                <div className="text-red-600 font-bold text-lg mb-2">
                  🎙️ Listening... Speak now!
                </div>
              )}
              {isProcessing && (
                <div className="text-yellow-600 font-bold text-lg mb-2">
                  🧠 Processing your request...
                </div>
              )}
              {isSpeaking && (
                <div className="text-blue-600 font-bold text-lg mb-2">
                  🔊 Speaking response...
                </div>
              )}
              {!isListening && !isProcessing && !isSpeaking && (
                <div className="text-gray-600 font-medium text-lg mb-2">
                  👋 Ready to help with your health questions
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              {!isListening ? (
                <button
                  onClick={startListening}
                  disabled={isProcessing || isSpeaking}
                  className="bg-medical-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Mic className="w-6 h-6 mr-2" />
                  Start Voice Chat
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="bg-gray-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors flex items-center"
                >
                  <MicOff className="w-6 h-6 mr-2" />
                  Stop Listening
                </button>
              )}

              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="bg-orange-600 text-white px-6 py-4 rounded-full font-medium hover:bg-orange-700 transition-colors"
                >
                  Stop Speaking
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Conversation Display */}
          {(transcript || response) && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💬 Conversation</h3>
              
              {transcript && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 font-semibold mb-1">You said:</p>
                  <p className="text-gray-700">{transcript}</p>
                </div>
              )}
              
              {response && (
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-green-800 font-semibold mb-1 flex items-center">
                    🩺 MediChat responds:
                    {audioEnabled && (
                      <button
                        onClick={() => speakResponse(response)}
                        disabled={isSpeaking}
                        className="ml-2 p-1 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </p>
                  <p className="text-gray-700">{response}</p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 How to Use Voice Chat</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-medical-red mb-2">Voice Commands:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• "Hello" - Greeting</li>
                  <li>• "I have a fever" - Fever guidance</li>
                  <li>• "I have a headache" - Headache advice</li>
                  <li>• "I have a cold" - Cold symptom help</li>
                  <li>• "Help me" - General assistance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-medical-red mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceToggle;
