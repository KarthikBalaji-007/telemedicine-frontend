import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Mic, Activity, Save } from 'lucide-react';

const DiagnosisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const messages = location.state?.messages || [];
  const symptoms = location.state?.symptoms || "General health inquiry";

  useEffect(() => {
    generateAIDiagnosis();
  }, []);

  const generateAIDiagnosis = async () => {
    setIsLoading(true);
    
    // Simulate AI diagnosis generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const diagnosisResult = analyzeSymptoms(symptoms);
    setDiagnosis(diagnosisResult);
    setIsLoading(false);
  };

  const analyzeSymptoms = (symptomText) => {
    const text = symptomText.toLowerCase();
    
    // AI-based symptom analysis simulation
    if (text.includes('fever') || text.includes('temperature')) {
      return {
        condition: "Viral Fever",
        probability: "85%",
        riskLevel: "Medium",
        riskColor: "bg-yellow-500",
        description: "Based on your symptoms, there's an 85% chance you have a viral fever. This is commonly caused by viral infections and typically resolves within 3-7 days with proper care.",
        causes: "Viral infections, including common cold viruses, flu viruses, or other seasonal pathogens. The fever indicates your immune system is actively fighting the infection.",
        nextSteps: [
          "Rest and stay well-hydrated with water, herbal teas, and clear broths",
          "Take acetaminophen or ibuprofen to reduce fever and discomfort",
          "Use cool compresses on forehead and wrists",
          "Monitor temperature every 4-6 hours",
          "Seek medical attention if fever exceeds 103°F (39.4°C) or persists beyond 5 days",
          "Watch for warning signs: difficulty breathing, severe headache, or persistent vomiting"
        ]
      };
    }
    
    if (text.includes('cold') || text.includes('cough') || text.includes('sneez')) {
      return {
        condition: "Common Cold",
        probability: "80%",
        riskLevel: "Low",
        riskColor: "bg-green-500",
        description: "There's an 80% chance your symptoms are due to a common viral cold. Less likely causes include mild flu (12%) or allergies (8%).",
        causes: "Colds are caused mainly by rhinoviruses, spread through droplets or surface contact. Symptoms often include sneezing, runny nose, sore throat, and mild fever.",
        nextSteps: [
          "Rest and drink plenty of fluids",
          "Use warm salt-water gargles for sore throat",
          "Take paracetamol for fever or pain (if safe for you)",
          "Wash hands often to prevent spread",
          "Use a humidifier or breathe steam from hot shower",
          "See a doctor if fever is high, symptoms worsen after a week, or you have trouble breathing"
        ]
      };
    }
    
    if (text.includes('headache') || text.includes('head')) {
      return {
        condition: "Tension Headache",
        probability: "70%",
        riskLevel: "Low",
        riskColor: "bg-green-500",
        description: "Based on your symptoms, there's a 70% likelihood of tension headaches, often caused by stress, poor posture, or muscle tension. Migraines (20%) and cluster headaches (10%) are less likely.",
        causes: "Tension headaches are typically caused by muscle contractions in the head and neck region, often triggered by stress, anxiety, poor posture, or eye strain.",
        nextSteps: [
          "Apply cold or warm compress to head and neck",
          "Practice relaxation techniques and stress management",
          "Ensure adequate sleep (7-9 hours per night)",
          "Stay hydrated and maintain regular meals",
          "Take over-the-counter pain relievers as directed",
          "Seek medical attention for sudden severe headaches, headaches with fever, or changes in headache pattern"
        ]
      };
    }
    
    // Default diagnosis
    return {
      condition: "General Health Assessment",
      probability: "Assessment Complete",
      riskLevel: "Low",
      riskColor: "bg-blue-500",
      description: "Based on the information provided, I've completed a preliminary health assessment. Your symptoms appear to be manageable with proper self-care.",
      causes: "Various factors could contribute to your current symptoms including lifestyle, stress, minor infections, or temporary health variations.",
      nextSteps: [
        "Monitor your symptoms and keep a health diary",
        "Maintain good hygiene and healthy lifestyle habits",
        "Stay hydrated and get adequate rest",
        "Consider stress reduction techniques",
        "Consult healthcare provider if symptoms persist or worsen",
        "Schedule regular check-ups for preventive care"
      ]
    };
  };

  const saveDiagnosis = () => {
    const savedData = {
      diagnosis: diagnosis,
      symptoms: symptoms,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date()
    };
    
    // Save to localStorage (in production, save to database)
    const existingHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
    existingHistory.unshift(savedData);
    localStorage.setItem('medicalHistory', JSON.stringify(existingHistory));
    
    alert('Diagnosis saved to your medical history!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-medical-red">Medi</span>
            <span className="text-black">Chat</span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-medical-red mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-medical-red mb-2">🧠 AI Analyzing Your Symptoms...</h3>
            <p className="text-gray-600">Please wait while I process your medical information and generate a comprehensive diagnosis.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-medical-red">Medi</span>
          <span className="text-black">Chat</span>
        </h1>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-gray-200 inline-block px-6 py-3 rounded-2xl rounded-tr-none ml-auto">
          <p className="text-gray-800">{symptoms}</p>
        </div>
      </div>

      {/* AI Diagnosis Result */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          {/* AI Analysis Header */}
          <div className="flex items-center mb-4">
            <h2 className="text-medical-red font-bold text-xl mr-3">🤖 AI Medical Analysis</h2>
            <button 
              onClick={saveDiagnosis}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save Report
            </button>
          </div>
          
          {/* Condition & Probability */}
          <div className="mb-4">
            <h3 className="text-medical-red font-bold text-lg mb-2">📋 Likely Condition: {diagnosis.condition}</h3>
            <p className="text-gray-700 mb-2">
              <strong>Confidence Level:</strong> {diagnosis.probability}
            </p>
          </div>

          {/* Risk Level */}
          <div className="flex items-center mb-4">
            <h3 className="text-medical-red font-bold text-lg mr-3">⚠️ Risk Level:</h3>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-medical-red rounded-full mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className={`${diagnosis.riskColor} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                {diagnosis.riskLevel}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-medical-red font-bold text-lg mb-3">🔍 Analysis:</h4>
            <p className="text-gray-700 mb-4">{diagnosis.description}</p>
            <p className="text-gray-700 mb-4">{diagnosis.causes}</p>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-medical-red font-bold text-lg mb-3">📝 Recommended Next Steps:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {diagnosis.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask follow-up questions about your diagnosis..."
            className="w-full p-4 bg-gray-200 rounded-lg pr-48 focus:outline-none focus:ring-2 focus:ring-medical-red"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Need Doctor
            </button>
            <button 
              onClick={() => navigate('/history')}
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              History
            </button>
            <button className="bg-gray-600 text-white p-2 rounded-full">
              <Mic className="w-4 h-4" />
            </button>
            <button className="bg-medical-red text-white p-2 rounded-full">
              <Activity className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
