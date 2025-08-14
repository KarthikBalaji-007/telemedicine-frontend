import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, Trash2, AlertTriangle } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadMedicalHistory();
    
    // Set up interval to check for updates every 2 seconds
    const interval = setInterval(() => {
      loadMedicalHistory();
    }, 2000);

    // Listen for storage changes (when new diagnoses are saved)
    const handleStorageChange = (e) => {
      if (e.key === 'medicalHistory') {
        loadMedicalHistory();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadMedicalHistory = () => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
      
      // Add some sample data if no history exists for testing
      if (savedHistory.length === 0) {
        const sampleData = [
          {
            diagnosis: {
              condition: "Thyroid Dysfunction",
              riskLevel: "High",
              probability: "95%",
              description: "Severe thyroid dysfunction with elevated TSH levels requiring immediate medical intervention"
            },
            symptoms: "Extreme fatigue, rapid weight gain, heart palpitations, difficulty breathing, severe mood swings",
            date: "2025-01-17",
            timestamp: new Date('2025-01-17'),
            priority: "high"
          },
          {
            diagnosis: {
              condition: "Severe Chest Pain",
              riskLevel: "High",
              probability: "90%",
              description: "Possible cardiac event requiring immediate medical attention"
            },
            symptoms: "Sharp chest pain, shortness of breath, sweating",
            date: "2025-01-16",
            timestamp: new Date('2025-01-16'),
            priority: "high"
          },
          {
            diagnosis: {
              condition: "Hypertension",
              riskLevel: "Medium",
              probability: "82%",
              description: "Elevated blood pressure readings requiring monitoring and lifestyle modifications"
            },
            symptoms: "Frequent headaches, dizziness, blurred vision, chest pressure",
            date: "2025-01-14",
            timestamp: new Date('2025-01-14'),
            priority: "medium"
          },
          {
            diagnosis: {
              condition: "Type 2 Diabetes Risk",
              riskLevel: "Medium",
              probability: "78%",
              description: "Pre-diabetic condition with elevated glucose levels requiring dietary changes"
            },
            symptoms: "Increased thirst, frequent urination, fatigue, blurred vision",
            date: "2025-01-12",
            timestamp: new Date('2025-01-12'),
            priority: "medium"
          },
          {
            diagnosis: {
              condition: "Common Cold",
              riskLevel: "Low",
              probability: "80%",
              description: "Viral infection with typical cold symptoms"
            },
            symptoms: "Cough, runny nose, mild fever",
            date: "2025-01-15",
            timestamp: new Date('2025-01-15'),
            priority: "low"
          },
          {
            diagnosis: {
              condition: "Migraine",
              riskLevel: "Medium", 
              probability: "75%",
              description: "Severe migraine requiring monitoring"
            },
            symptoms: "Severe headache, nausea, light sensitivity",
            date: "2025-01-10",
            timestamp: new Date('2025-01-10'),
            priority: "medium"
          },
          {
            diagnosis: {
              condition: "Seasonal Allergies",
              riskLevel: "Low",
              probability: "85%",
              description: "Common seasonal allergic reaction to environmental allergens"
            },
            symptoms: "Sneezing, watery eyes, nasal congestion, mild cough",
            date: "2025-01-08",
            timestamp: new Date('2025-01-08'),
            priority: "low"
          },
          {
            diagnosis: {
              condition: "Minor Skin Irritation",
              riskLevel: "Low",
              probability: "70%",
              description: "Mild skin irritation likely caused by contact dermatitis or dry skin"
            },
            symptoms: "Dry, itchy skin patches on arms and legs, mild redness",
            date: "2025-01-05",
            timestamp: new Date('2025-01-05'),
            priority: "low"
          }
        ];
        localStorage.setItem('medicalHistory', JSON.stringify(sampleData));
        setHistoryItems(sampleData);
      } else {
        // Add priority based on risk level if not already present
        const updatedHistory = savedHistory.map(item => ({
          ...item,
          priority: item.priority || getPriorityFromRisk(item.diagnosis?.riskLevel)
        }));
        setHistoryItems(updatedHistory);
      }
    } catch (error) {
      console.error('Error loading medical history:', error);
      setHistoryItems([]);
    }
  };

  const getPriorityFromRisk = (riskLevel) => {
    if (!riskLevel) return 'low';
    switch(riskLevel.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'low';
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all medical history?')) {
      localStorage.removeItem('medicalHistory');
      setHistoryItems([]);
    }
  };

  const exportHistory = () => {
    try {
      const dataStr = JSON.stringify(historyItems, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `medical-history-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting history:', error);
      alert('Error exporting history. Please try again.');
    }
  };

  const getRiskColor = (riskLevel) => {
    if (!riskLevel) return 'bg-gray-500';
    
    switch(riskLevel.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const sortedHistory = [...historyItems].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
    }
    const conditionA = a.diagnosis?.condition || '';
    const conditionB = b.diagnosis?.condition || '';
    return conditionA.localeCompare(conditionB);
  });

  const viewFullReport = (item) => {
    navigate('/diagnosis', { 
      state: { 
        messages: [], 
        symptoms: item.symptoms,
        preloadedDiagnosis: item.diagnosis
      } 
    });
  };

  // Count high priority items
  const highPriorityCount = historyItems.filter(item => item.priority === 'high').length;

  return (
    <div className="min-h-screen bg-white">
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
            <span className="text-medical-red">Medi</span>
            <span className="text-black">Chat</span>
          </h1>
          <div className="ml-auto flex flex-wrap items-center gap-2">
           
            
            {/* High Priority Alert */}
            {highPriorityCount > 0 && (
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {highPriorityCount} High Priority
              </span>
            )}
            
            {/* FIXED: Sort Dropdown with Different Color */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium outline-none hover:bg-purple-700 transition-colors"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="condition">Sort by Condition</option>
            </select>
            
            {historyItems.length > 0 && (
              <>
                {/* FIXED: Export Button with Different Color */}
                <button 
                  onClick={exportHistory}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
                
                {/* FIXED: Clear Button with Different Color */}
                <button 
                  onClick={clearHistory}
                  className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-orange-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* History Items */}
        <div className="w-full max-w-6xl mx-auto space-y-4">
          {sortedHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Medical History Yet</h3>
              <p className="text-gray-500 mb-4">Start chatting with MediChat to build your medical history</p>
              <button 
                onClick={() => navigate('/chat')}
                className="bg-medical-red text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
              >
                Start New Consultation
              </button>
            </div>
          ) : (
            sortedHistory.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 font-medium">{item.date}</span>
                    </div>
                    
                    <h3 className={`font-bold text-xl mb-2 flex items-center ${
                      item.priority === 'high' ? 'text-red-600' : 'text-medical-red'
                    }`}>
                      {item.priority === 'high' && (
                        <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
                      )}
                      {item.diagnosis?.condition || 'Health Consultation'}
                    </h3>
                    
                    <p className="text-gray-700 mb-2">
                      <strong>Symptoms:</strong> {item.symptoms}
                    </p>
                    {item.diagnosis?.probability && (
                      <p className="text-gray-700 mb-2">
                        <strong>Confidence:</strong> {item.diagnosis.probability}
                      </p>
                    )}
                    {item.diagnosis?.description && (
                      <p className="text-gray-600 text-sm">
                        {item.diagnosis.description.length > 150 
                          ? `${item.diagnosis.description.substring(0, 150)}...`
                          : item.diagnosis.description
                        }
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`${getRiskColor(item.diagnosis?.riskLevel)} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                      {item.diagnosis?.riskLevel || 'Assessment'}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  {item.priority === 'high' && (
                    <div className="text-red-600 text-sm font-medium flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Requires immediate medical attention
                    </div>
                  )}
                  <button 
                    onClick={() => viewFullReport(item)}
                    className={`font-medium hover:underline transition-colors ml-auto ${
                      item.priority === 'high' ? 'text-red-600' : 'text-medical-red'
                    }`}
                  >
                    View Full Report →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
