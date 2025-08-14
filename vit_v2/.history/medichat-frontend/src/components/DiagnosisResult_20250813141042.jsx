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
  }, [preloadedDiagnosis]);

  const generateAIDiagnosis = async () => {
    setIsLoading(true);
    
    try {
      // Simulate AI diagnosis generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const diagnosisResult = analyzeSymptoms(symptoms);
      setDiagnosis(diagnosisResult);
    } catch (error) {
      console.error('Error generating diagnosis:', error);
      setDiagnosis({
        condition: "Error in Analysis",
        probability: "Unable to determine",
        riskLevel: "Unknown",
        riskColor: "bg-gray-500",
        description: "There was an error analyzing your symptoms. Please try again.",
        causes: "System error occurred during analysis.",
        nextSteps: ["Please try again later", "Contact support if the issue persists"]
      });
    } finally {
      setIsLoading(false);
    }
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
    if (!diagnosis) return;
    
    const savedData = {
      diagnosis: diagnosis,
      symptoms: symptoms,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date()
    };
    
    try {
      const existingHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
      existingHistory.unshift(savedData);
      localStorage.setItem('medicalHistory', JSON.stringify(existingHistory));
      alert('Diagnosis saved to your medical history!');
    } catch (error) {
      console.error('Error saving diagnosis:', error);
      alert('Error saving diagnosis. Please try again.');
    }
  };

  const downloadReport = (format) => {
    if (!diagnosis) return;
    
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().split('T')[0];
    const timeStr = currentDate.toLocaleTimeString();
    
    if (format === 'pdf') {
      downloadEnhancedPDFReport(dateStr, timeStr);
    } else if (format === 'txt') {
      downloadTextReport(dateStr, timeStr);
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

Likely Condition: ${diagnosis?.condition || 'Unknown'}
Confidence Level: ${diagnosis?.probability || 'Unknown'}
Risk Level: ${diagnosis?.riskLevel || 'Unknown'}

ANALYSIS:
${diagnosis?.description || 'No analysis available'}

CAUSES:
${diagnosis?.causes || 'No causes available'}

RECOMMENDED NEXT STEPS:
${diagnosis?.nextSteps?.map((step, index) => `${index + 1}. ${step}`).join('\n') || 'No recommendations available'}

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

  const downloadEnhancedPDFReport = (dateStr, timeStr) => {
    // Create enhanced PDF report with better formatting and styling
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>MediChat Medical Report - ${diagnosis?.condition || 'Health Assessment'}</title>
        <style>
          @page {
            margin: 20mm;
            size: A4;
          }
          
          body { 
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
            font-size: 14px;
          }
          
          .header { 
            text-align: center; 
            background: linear-gradient(135deg, #E53E3E 0%, #C53030 100%);
            color: white;
            padding: 30px 20px;
            margin: -20px -20px 40px -20px;
            border-radius: 0 0 15px 15px;
            box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
          }
          
          .logo { 
            font-size: 36px; 
            font-weight: bold; 
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          
          .header h1 {
            font-size: 24px;
            margin: 15px 0 10px 0;
            font-weight: 300;
          }
          
          .header-info {
            font-size: 12px;
            opacity: 0.9;
            margin-top: 15px;
          }
          
          .report-meta {
            display: flex;
            justify-content: space-between;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 5px solid #E53E3E;
          }
          
          .section { 
            margin-bottom: 35px; 
            padding: 25px; 
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            background: white;
            border: 1px solid #e9ecef;
          }
          
          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #E53E3E;
          }
          
          .section-icon {
            font-size: 24px;
            margin-right: 15px;
          }
          
          .section h2 { 
            color: #E53E3E; 
            margin: 0;
            font-size: 20px;
            font-weight: 600;
          }
          
          .symptoms-box {
            background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #E53E3E;
            font-size: 16px;
            line-height: 1.8;
          }
          
          .diagnosis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
          }
          
          .diagnosis-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #E53E3E;
          }
          
          .diagnosis-label {
            font-weight: bold;
            color: #E53E3E;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .diagnosis-value {
            font-size: 18px;
            font-weight: 600;
            margin-top: 5px;
          }
          
          .risk-level {
            display: inline-block;
            padding: 8px 20px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 10px;
          }
          
          .risk-low { background: linear-gradient(135deg, #48bb78, #38a169); }
          .risk-medium { background: linear-gradient(135deg, #ed8936, #dd6b20); }
          .risk-high { background: linear-gradient(135deg, #e53e3e, #c53030); }
          
          .analysis-text {
            font-size: 15px;
            line-height: 1.8;
            text-align: justify;
            margin: 20px 0;
            padding: 20px;
            background: #f7fafc;
            border-radius: 10px;
            border-left: 5px solid #4299e1;
          }
          
          .recommendations {
            counter-reset: step-counter;
          }
          
          .recommendation-item {
            counter-increment: step-counter;
            margin: 15px 0;
            padding: 15px 20px;
            background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
            border-radius: 10px;
            border-left: 5px solid #48bb78;
            position: relative;
          }
          
          .recommendation-item::before {
            content: counter(step-counter);
            position: absolute;
            left: -15px;
            top: 15px;
            background: #48bb78;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
          }
          
          .recommendation-text {
            margin-left: 25px;
            font-size: 15px;
            line-height: 1.6;
          }
          
          .footer { 
            margin-top: 60px; 
            padding: 30px 20px;
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
            color: white;
            text-align: center;
            border-radius: 15px;
            page-break-inside: avoid;
          }
          
          .footer-brand {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #E53E3E;
          }
          
          .disclaimer {
            background: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            font-size: 13px;
            line-height: 1.6;
          }
          
          .disclaimer-title {
            font-weight: bold;
            color: #856404;
            font-size: 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            color: rgba(229, 62, 62, 0.05);
            z-index: -1;
            font-weight: bold;
            pointer-events: none;
          }
          
          @media print {
            body { 
              margin: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .no-print { display: none; }
            .section { break-inside: avoid; }
            .watermark { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="watermark">MediChat</div>
        
        <div class="header">
          <div class="logo">🩺 MediChat</div>
          <h1>AI Medical Assessment Report</h1>
          <div class="header-info">
            Professional Medical Analysis • Powered by Advanced AI
          </div>
        </div>

        <div class="report-meta">
          <div>
            <strong>Report ID:</strong> MC-${Date.now()}<br>
            <strong>Generated:</strong> ${dateStr} at ${timeStr}
          </div>
          <div style="text-align: right;">
            <strong>Patient Consultation</strong><br>
            <strong>Condition:</strong> ${diagnosis?.condition || 'General Assessment'}
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-icon">📋</div>
            <h2>Patient Symptoms & Chief Complaint</h2>
          </div>
          <div class="symptoms-box">
            ${symptoms}
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-icon">🤖</div>
            <h2>AI Medical Analysis & Diagnosis</h2>
          </div>
          
          <div class="diagnosis-grid">
            <div class="diagnosis-item">
              <div class="diagnosis-label">Primary Condition</div>
              <div class="diagnosis-value">${diagnosis?.condition || 'Unknown'}</div>
            </div>
            <div class="diagnosis-item">
              <div class="diagnosis-label">Confidence Level</div>
              <div class="diagnosis-value">${diagnosis?.probability || 'Unknown'}</div>
            </div>
          </div>
          
          <div style="margin: 20px 0;">
            <div class="diagnosis-label">Risk Assessment</div>
            <div class="risk-level risk-${diagnosis?.riskLevel?.toLowerCase() || 'unknown'}">
              ${diagnosis?.riskLevel || 'Unknown'} Risk Level
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-icon">🔍</div>
            <h2>Clinical Analysis & Assessment</h2>
          </div>
          <div class="analysis-text">
            <strong>Medical Analysis:</strong><br>
            ${diagnosis?.description || 'No analysis available'}
          </div>
          <div class="analysis-text">
            <strong>Probable Causes & Pathophysiology:</strong><br>
            ${diagnosis?.causes || 'No causes identified'}
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-icon">📝</div>
            <h2>Clinical Recommendations & Treatment Plan</h2>
          </div>
          <div class="recommendations">
            ${diagnosis?.nextSteps?.map(step => `
              <div class="recommendation-item">
                <div class="recommendation-text">${step}</div>
              </div>
            `).join('') || '<div class="recommendation-item"><div class="recommendation-text">No specific recommendations available at this time.</div></div>'}
          </div>
        </div>

        <div class="disclaimer">
          <div class="disclaimer-title">⚠️ Important Medical Disclaimer</div>
          This medical report has been generated by MediChat's artificial intelligence system for informational and educational purposes only. This analysis should not be considered as a substitute for professional medical advice, diagnosis, or treatment. The AI assessment is based on the symptoms provided and general medical knowledge, but cannot account for individual medical history, physical examination findings, or diagnostic test results that are essential for accurate medical diagnosis.
          <br><br>
          <strong>Always consult with qualified healthcare professionals for:</strong>
          <ul style="margin-top: 10px;">
            <li>Confirmation of any medical condition</li>
            <li>Appropriate diagnostic testing</li>
            <li>Personalized treatment recommendations</li>
            <li>Emergency medical situations</li>
            <li>Prescription medications or medical procedures</li>
          </ul>
        </div>

        <div class="footer">
          <div class="footer-brand">🩺 MediChat</div>
          <div style="font-size: 16px; margin-bottom: 15px;">
            <strong>Created by MediChat - Advanced AI Medical Assistant</strong>
          </div>
          <div style="font-size: 12px; opacity: 0.8;">
            Powered by Artificial Intelligence • Professional Medical Guidance<br>
            © ${new Date().getFullYear()} MediChat. All rights reserved.<br>
            For support: support@medichat.ai | www.medichat.ai
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 1000);
          };
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
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

  // Show error state if no diagnosis
  if (!diagnosis) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-medical-red">Medi</span>
            <span className="text-black">Chat</span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Diagnosis</h3>
            <p className="text-gray-600 mb-4">Sorry, we couldn't load your diagnosis. Please try again.</p>
            <button 
              onClick={() => navigate('/chat')}
              className="bg-medical-red text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              Start New Consultation
            </button>
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
              
              {/* Simplified Download Dropdown - PDF & TXT Only */}
              <div className="relative group">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 mr-1" />
                  Download Report
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => downloadReport('pdf')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center text-gray-700 rounded-t-lg border-b border-gray-100"
                  >
                    <FileText className="w-5 h-5 mr-3 text-red-600" />
                    <div>
                      <div className="font-semibold">Download as PDF</div>
                      <div className="text-xs text-gray-500">Professional medical report</div>
                    </div>
                  </button>
                  <button
                    onClick={() => downloadReport('txt')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center text-gray-700 rounded-b-lg"
                  >
                    <FileText className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-semibold">Download as Text</div>
                      <div className="text-xs text-gray-500">Simple text format</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Condition & Probability */}
          <div className="mb-4">
            <h3 className="text-medical-red font-bold text-lg mb-2">📋 Likely Condition: {diagnosis?.condition || 'Unknown'}</h3>
            <p className="text-gray-700 mb-2">
              <strong>Confidence Level:</strong> {diagnosis?.probability || 'Unknown'}
            </p>
          </div>

          {/* Risk Level */}
          <div className="flex items-center mb-4">
            <h3 className="text-medical-red font-bold text-lg mr-3">⚠️ Risk Level:</h3>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-medical-red rounded-full mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className={`${diagnosis?.riskColor || 'bg-gray-500'} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                {diagnosis?.riskLevel || 'Unknown'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-medical-red font-bold text-lg mb-3">🔍 Analysis:</h4>
            <p className="text-gray-700 mb-4">{diagnosis?.description || 'No analysis available'}</p>
            <p className="text-gray-700 mb-4">{diagnosis?.causes || 'No causes available'}</p>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-medical-red font-bold text-lg mb-3">📝 Recommended Next Steps:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {diagnosis?.nextSteps?.length > 0 ? (
                diagnosis.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))
              ) : (
                <li>No recommendations available at this time.</li>
              )}
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
