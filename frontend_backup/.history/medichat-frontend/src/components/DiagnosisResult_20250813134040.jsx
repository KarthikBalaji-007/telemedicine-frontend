import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Mic, Activity, Save, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

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

  // ... (keep all your existing functions: generateAIDiagnosis, analyzeSymptoms, saveDiagnosis)

  const downloadReport = (format) => {
    if (!diagnosis) return;
    
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().split('T')[0];
    const timeStr = currentDate.toLocaleTimeString();
    
    if (format === 'pdf') {
      downloadPDFReport(dateStr, timeStr);
    } else if (format === 'txt') {
      downloadTextReport(dateStr, timeStr);
    } else if (format === 'html') {
      downloadHTMLReport(dateStr, timeStr);
    } else if (format === 'json') {
      downloadJSONReport(dateStr, timeStr);
    }
  };

  const downloadPDFReport = (dateStr, timeStr) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addText = (text, x, y, fontSize = 12, fontStyle = 'normal', maxWidth = pageWidth - 40) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Header with MediChat branding
    pdf.setFillColor(229, 62, 62); // Medical red color
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // White text on red background
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🩺 MediChat', 20, 25);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AI Medical Assessment Report', 20, 35);

    // Reset text color to black
    pdf.setTextColor(0, 0, 0);
    yPosition = 60;

    // Report details
    pdf.setFontSize(10);
    yPosition = addText(`Generated: ${dateStr} at ${timeStr}`, 20, yPosition, 10);
    yPosition = addText(`Report ID: MC-${Date.now()}`, 20, yPosition, 10);
    yPosition += 10;

    // Patient Symptoms Section
    pdf.setFillColor(249, 249, 249);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 20, 'F');
    
    yPosition = addText('📋 PATIENT SYMPTOMS', 20, yPosition + 5, 14, 'bold');
    yPosition += 5;
    yPosition = addText(symptoms, 20, yPosition, 11);
    yPosition += 15;

    // AI Analysis Section
    pdf.setFillColor(249, 249, 249);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
    
    yPosition = addText('🤖 AI MEDICAL ANALYSIS', 20, yPosition + 5, 14, 'bold');
    yPosition += 5;
    yPosition = addText(`Likely Condition: ${diagnosis?.condition || 'Unknown'}`, 20, yPosition, 12, 'bold');
    yPosition = addText(`Confidence Level: ${diagnosis?.probability || 'Unknown'}`, 20, yPosition, 11);
    yPosition = addText(`Risk Level: ${diagnosis?.riskLevel || 'Unknown'}`, 20, yPosition, 11);
    yPosition += 15;

    // Analysis Section
    yPosition = addText('🔍 ANALYSIS', 20, yPosition, 14, 'bold');
    yPosition += 5;
    yPosition = addText(diagnosis?.description || 'No analysis available', 20, yPosition, 11);
    yPosition += 10;

    // Causes Section
    yPosition = addText('📖 CAUSES', 20, yPosition, 14, 'bold');
    yPosition += 5;
    yPosition = addText(diagnosis?.causes || 'No causes available', 20, yPosition, 11);
    yPosition += 10;

    // Check if we need a new page
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 20;
    }

    // Next Steps Section
    yPosition = addText('📝 RECOMMENDED NEXT STEPS', 20, yPosition, 14, 'bold');
    yPosition += 5;
    
    if (diagnosis?.nextSteps?.length > 0) {
      diagnosis.nextSteps.forEach((step, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
        yPosition = addText(`${index + 1}. ${step}`, 25, yPosition, 11);
        yPosition += 5;
      });
    } else {
      yPosition = addText('No recommendations available at this time.', 25, yPosition, 11);
    }

    // Footer with disclaimer
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    } else {
      yPosition += 20;
    }

    // Footer section
    pdf.setFillColor(229, 62, 62);
    pdf.rect(0, yPosition, pageWidth, 2, 'F');
    yPosition += 15;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Created by MediChat - AI Medical Assistant', 20, yPosition, 12, 'bold');
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText('DISCLAIMER:', 20, yPosition, 10, 'bold');
    yPosition = addText('This report is generated by MediChat AI and is for informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.', 20, yPosition, 9);
    
    yPosition += 15;
    yPosition = addText(`© ${new Date().getFullYear()} MediChat. All rights reserved.`, 20, yPosition, 9);

    // Save the PDF
    pdf.save(`MediChat_Report_${dateStr}_${Date.now()}.pdf`);
  };

  // ... (keep all your other existing functions: downloadTextReport, downloadJSONReport, downloadHTMLReport)

  // Your existing return JSX but update the download dropdown:
  return (
    <div className="min-h-screen bg-white p-6">
      {/* ... existing header code ... */}

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
              
              {/* Updated Download Dropdown with PDF */}
              <div className="relative group">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 mr-1" />
                  Download Report
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => downloadReport('pdf')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700 rounded-t-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download as PDF
                  </button>
                  <button
                    onClick={() => downloadReport('txt')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700"
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
          
          {/* ... rest of your existing JSX ... */}
        </div>
      </div>

      {/* ... rest of your existing JSX ... */}
    </div>
  );
};

export default DiagnosisResult;
