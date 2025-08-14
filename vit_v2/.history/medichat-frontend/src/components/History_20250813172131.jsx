import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, Trash2 } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadMedicalHistory();
  }, []);

  const loadMedicalHistory = () => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
      // Add some sample data if no history exists for testing
      if (savedHistory.length === 0) {
        const sampleData = [
          {
            diagnosis: {
              condition: "Common Cold",
              riskLevel: "Low",
              probability: "80%",
              description: "Viral infection with typical cold symptoms"
            },
            symptoms: "Cough, runny nose, mild fever",
            date: "2025-01-15",
            timestamp: new Date('2025-01-15')
          },
          {
            diagnosis: {
              condition: "Headache",
              riskLevel: "Medium", 
              probability: "75%",
              description: "Tension headache likely due to stress"
            },
            symptoms: "Severe headache, neck tension",
            date: "2025-01-10",
            timestamp: new Date('2025-01-10')
          }
        ];
        localStorage.setItem('medicalHistory', JSON.stringify(sampleData));
        setHistoryItems(sampleData);
      } else {
        setHistoryItems(savedHistory);
      }
    } catch (error) {
      console.error('Error loading medical history:', error);
      setHistoryItems([]);
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
            <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              History ({historyItems.length})
            </span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="condition">Sort by Condition</option>
            </select>
            {historyItems.length > 0 && (
              <>
                <button 
                  onClick={exportHistory}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
                <button 
                  onClick={clearHistory}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-red-700 transition-colors"
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
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 font-medium">{item.date}</span>
                    </div>
                    <h3 className="text-medical-red font-bold text-xl mb-2">
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
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => viewFullReport(item)}
                    className="text-medical-red font-medium hover:underline transition-colors"
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
