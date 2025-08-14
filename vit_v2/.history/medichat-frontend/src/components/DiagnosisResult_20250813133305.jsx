import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Mic, Activity, Save, Download, FileText } from 'lucide-react';

const DiagnosisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const messages = location.state?.messages || [];
  const symptoms = location.state?.symptoms || "General health inquiry";
  const preloadedDiagnosis = location.state?.preloadedDiagnosis;

  useEffect(() => {
    if (preloadedDiagnosis) {
      setDiagnosis(preloadedDiagnosis);
      setIsLoading(false);
    } else {
      generateAIDiagnosis();
    }
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

  const downloadReport = (format) => {
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().split('T')[0];
    const timeStr = currentDate.toLocaleTimeString();
    
    if (format === 'pdf') {
      // For PDF, we'll create an HTML version that can be printed as PDF
      downloadHTMLReport(dateStr, timeStr);
    } else if (format === 'txt') {
      downloadTextReport(dateStr, timeStr);
    } else if (format === 'json') {
      downloadJSONReport(dateStr, timeStr);
    }
  };

  const downloadTextReport = (dateStr, timeStr) => {
    const reportContent = `
╔══════════════════════════════════════════════════════════════╗
║                        MEDICAL REPORT                        ║
║                     Created by MediChat                      ║
╚══════════════════════════════════════════════════════════════╝

Generated Date: ${dateStr}
Generated Time: ${timeStr}

═══════════════════════════════════════════════════════════════

PATIENT SYMPTOMS:
${symptoms}

═══════════════════════════════════════════════════════════════

AI MEDICAL ANALYSIS:

Likely Condition: ${diagnosis.condition}
Confidence Level: ${diagnosis.probability}
Risk Level: ${diagnosis.riskLevel}

ANALYSIS:
${diagnosis.description}

CAUSES:
${diagnosis.causes}

RECOMMENDED NEXT STEPS:
${diagnosis.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

═══════════════════════════════════════════════════════════════

DISCLAIMER:
This report is generated by MediChat AI and is for informational 
purposes only. It should not replace professional medical advice, 
diagnosis, or treatment. Always consult with qualified healthcare 
providers for medical decisions.

═══════════════════════════════════════════════════════════════

Report ID: MC-${Date.now()}
Created by: MediChat - AI Medical Assistant
Website: Your MediChat Application
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediChat_Report_${dateStr}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSONReport = (dateStr, timeStr) => {
    const reportData = {
      reportInfo: {
        createdBy: "MediChat - AI Medical Assistant",
        generatedDate: dateStr,
        generatedTime: timeStr,
        reportId: `MC-${Date.now()}`,
        disclaimer: "This report is generated by MediChat AI and is for informational purposes only. Always consult with qualified healthcare providers."
      },
      patientData: {
        symptoms: symptoms,
        consultationDate: dateStr
      },
      diagnosis: {
        condition: diagnosis.condition,
        confidenceLevel: diagnosis.probability,
        riskLevel: diagnosis.riskLevel,
        description: diagnosis.description,
        causes: diagnosis.causes,
        recommendedSteps: diagnosis.nextSteps
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediChat_Report_${dateStr}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHTMLReport = (dateStr, timeStr) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediChat Medical Report</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6;
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #E53E3E; 
            padding-bottom: 20px; 
            margin-bottom: 30px;
        }
        .logo { 
            color: #E53E3E; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px;
        }
        .section { 
            margin-bottom: 25px; 
            padding: 15px; 
            border-left: 4px solid #E53E3E;
            background-color: #f9f9f9;
        }
        .section h3 { 
            color: #E53E3E; 
            margin-top: 0; 
        }
        .risk-${diagnosis.riskLevel.toLowerCase()} { 
            color: white; 
            padding: 5px 15px; 
            border-radius: 20px; 
            font-weight: bold;
            ${diagnosis.riskLevel.toLowerCase() === 'high' ? 'background-color: #E53E3E;' : ''}
            ${diagnosis.riskLevel.toLowerCase() === 'medium' ? 'background-color: #F59E0B;' : ''}
            ${diagnosis.riskLevel.toLowerCase() === 'low' ? 'background-color: #10B981;' : ''}
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 2px solid #E53E3E; 
            font-size: 12px; 
            color: #666;
            text-align: center;
        }
        .steps { 
            padding-left: 20px; 
        }
        .steps li { 
            margin-bottom: 8px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🩺 MediChat</div>
        <h2>AI Medical Assessment Report</h2>
        <p><strong>Generated:</strong> ${dateStr} at ${timeStr}</p>
        <p><strong>Report ID:</strong> MC-${Date.now()}</p>
    </div>

    <div class="section">
        <h3>📋 Patient Symptoms</h3>
        <p>${symptoms}</p>
    </div>

    <div class="section">
        <h3>🤖 AI Medical Analysis</h3>
        <p><strong>Likely Condition:</strong> ${diagnosis.condition}</p>
        <p><strong>Confidence Level:</strong> ${diagnosis.probability}</p>
        <p><strong>Risk Level:</strong> <span class="risk-${diagnosis.riskLevel.toLowerCase()}">${diagnosis.riskLevel}</span></p>
    </div>

    <div class="section">
        <h3>🔍 Analysis</h3>
        <p>${diagnosis.description}</p>
    </div>

    <div class="section">
        <h3>📖 Causes</h3>
        <p>${diagnosis.causes}</p>
    </div>

    <div class="section">
        <h3>📝 Recommended Next Steps</h3>
        <ol class="steps">
            ${diagnosis.nextSteps.map(step => `<li>${step}</li>`).join('')}
        </ol>
    </div>

    <div class="footer">
        <p><strong>Created by MediChat - AI Medical Assistant</strong></p>
        <p><strong>DISCLAIMER:</strong> This report is generated by MediChat AI and is for informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.</p>
        <p>© ${new Date().getFullYear()} MediChat. All rights reserved.</p>
    </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediChat_Report_${dateStr}_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
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
          {/* AI Analysis Header with Download Options */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h2 className="text-medical-red font-bold text-xl">🤖 AI Medical Analysis</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={saveDiagnosis}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Report
              </button>
              
              {/* Download Dropdown */}
              <div className="relative group">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 mr-1" />
                  Download Report
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => downloadReport('txt')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700 rounded-t-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download as TXT
                  </button>
                  <button
                    onClick={() => downloadReport('html')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download as HTML
                  </button>
                  <button
                    onClick={() => downloadReport('json')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700 rounded-b-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download as JSON
                  </button>
                </div>
              </div>
            </div>
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
