import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Mic, Activity } from 'lucide-react';

const DiagnosisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
          <p className="text-gray-800">What causes sudden cold symptoms?</p>
        </div>
      </div>

      {/* Diagnosis Result */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          {/* Risk Level */}
          <div className="flex items-center mb-4">
            <h3 className="text-medical-red font-bold text-lg mr-3">Risk Level:</h3>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-medical-red rounded-full mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-1 rounded ${
                      i < 2 ? 'bg-medical-red' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Text */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              There's an ~80% chance your symptoms are due to a common viral cold. Less 
              likely causes include mild flu (~12%) or allergies (~8%).
            </p>
            <p className="text-gray-700 mb-4">
              Colds are caused mainly by rhinoviruses, spread through droplets or surface 
              contact. Symptoms often include sneezing, runny nose, sore throat, and mild 
              fever.
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-medical-red font-bold text-lg mb-3">Next steps:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Rest and drink fluids.</li>
              <li>Use warm salt-water gargles for sore throat.</li>
              <li>Take paracetamol for fever or pain (if safe for you).</li>
              <li>Wash hands often to prevent spread.</li>
              <li>See a doctor if fever is high, symptoms worsen after a week, or you have trouble breathing.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter details"
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
