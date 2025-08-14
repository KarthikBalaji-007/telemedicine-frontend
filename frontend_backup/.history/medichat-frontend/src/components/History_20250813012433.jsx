import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();

  const historyItems = [
    {
      title: "Cold and Cough",
      date: "2025-08-10",
      riskLevel: "Low",
      riskColor: "bg-green-500"
    },
    {
      title: "Anemia",
      date: "2025-08-09",
      riskLevel: "High",
      riskColor: "bg-red-500"
    },
    {
      title: "Thyroid",
      date: "2025-08-09",
      riskLevel: "Medium",
      riskColor: "bg-yellow-500"
    }
  ];

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
        <div className="ml-auto">
          <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            History
          </span>
          <button className="ml-4 bg-medical-red text-white px-6 py-2 rounded-full text-sm font-medium">
            Sort
          </button>
        </div>
      </div>

      {/* History Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {historyItems.map((item, index) => (
          <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-medical-red font-bold text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-800 font-medium">
                  Date: {item.date}
                </p>
              </div>
              <div className="ml-4">
                <span className={`${item.riskColor} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                  {item.riskLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
