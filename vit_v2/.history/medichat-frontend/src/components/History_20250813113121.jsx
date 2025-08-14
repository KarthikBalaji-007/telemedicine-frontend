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
    const savedHistory = JSON.parse(localStorage.getItem('medicalHistory') || '[]');
    setHistoryItems(savedHistory);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all medical history?')) {
      localStorage.removeItem('medicalHistory');
      setHistoryItems([]);
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(historyItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `medical-history-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getRiskColor = (riskLevel) => {
    switch(riskLevel?.toLowerCase()) {
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
    return a.diagnosis?.condition.localeCompare(b.diagnosis?.condition);
  });

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold">
          <span className="text-medical-red">Medi</span>
          <span className="text-black">Chat</span>
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            History ({historyItems.length})
          </span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-medical-red text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            <option value="date">Sort by Date</option>
            <option value="condition">Sort by Condition</option>
          </select>
          <button 
            onClick={exportHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
          <button 
            onClick={clearHistory}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </button>
        </div>
      </div>

      {/* History Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {sortedHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No Medical History Yet</h3>
            <p className="text-gray-500 mb-4">Start chatting with MediChat to build your medical history</p>
            <button 
              onClick={() => navigate('/chat')}
              className="bg-medical-red text-white px-6 py-3 rounded-full font-medium"
            >
              Start New Consultation
            </button>
          </div>
        ) : (
          sortedHistory.map((item, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
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
                      {item.diagnosis.description.substring(0, 150)}...
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <span className={`${getRiskColor(item.diagnosis?.riskLevel)} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                    {item.diagnosis?.riskLevel || 'Assessment'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => navigate('/diagnosis', { state: { messages: [], symptoms: item.symptoms } })}
                  className="text-medical-red font-medium hover:underline"
                >
                  View Full Report →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
