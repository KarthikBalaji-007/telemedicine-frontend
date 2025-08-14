import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Phone, FileText, Send, Stethoscope } from 'lucide-react';

const NeedDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    healthIssue: '',
    report: '',
    contactNumber: ''
  });
  const [priority, setPriority] = useState('SOON'); // NOW, SOON, LATE
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.healthIssue || !formData.contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to book doctor appointment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save appointment request to localStorage
      const appointmentData = {
        ...formData,
        priority,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        appointmentId: `APT-${Date.now()}`
      };

      const existingAppointments = JSON.parse(localStorage.getItem('doctorAppointments') || '[]');
      existingAppointments.unshift(appointmentData);
      localStorage.setItem('doctorAppointments', JSON.stringify(existingAppointments));

      // Success message
      alert(`✅ Doctor appointment request submitted successfully!\n\nAppointment ID: ${appointmentData.appointmentId}\nPriority: ${priority}\n\nA doctor will contact you at ${formData.contactNumber} within 24 hours.`);

      // Navigate to confirmation or back to home
      navigate('/', { 
        state: { 
          message: 'Doctor appointment request submitted successfully!',
          appointmentId: appointmentData.appointmentId
        }
      });

    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('❌ Error submitting appointment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priorityLevel) => {
    switch(priorityLevel) {
      case 'NOW': return 'bg-red-500 text-white';
      case 'SOON': return 'bg-yellow-500 text-white';
      case 'LATE': return 'bg-gray-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
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
        </div>

        {/* Main Form Container - Matching Your Design */}
        <div className="max-w-2xl mx-auto">
          {/* Medical Border Design */}
          <div className="relative">
            {/* Top Medical Icons Border */}
            <div className="flex justify-between items-center mb-4 px-4">
              <div className="flex space-x-2">
                {['❤️', '🩺', '💊', '📊', '🔬', '🏥', '👩‍⚕️', '📋'].map((icon, index) => (
                  <div key={index} className="w-8 h-8 bg-red-100 rounded border border-medical-red flex items-center justify-center text-sm">
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content with Medical Border */}
            <div className="border-4 border-medical-red rounded-lg bg-white relative">
              {/* Side Medical Icons */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-medical-red flex flex-col items-center justify-between py-4">
                {['🩺', '💉', '🏥', '📋', '💊', '🔬', '❤️', '📊'].map((icon, index) => (
                  <div key={index} className="w-8 h-8 bg-white rounded border border-medical-red flex items-center justify-center text-sm">
                    {icon}
                  </div>
                ))}
              </div>

              {/* Right Side Medical Icons */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-medical-red flex flex-col items-center justify-between py-4">
                {['🏥', '💊', '📊', '🔬', '👨‍⚕️', '💉', '🩺', '❤️'].map((icon, index) => (
                  <div key={index} className="w-8 h-8 bg-white rounded border border-medical-red flex items-center justify-center text-sm">
                    {icon}
                  </div>
                ))}
              </div>

              {/* Form Content */}
              <div className="px-16 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <Stethoscope className="w-16 h-16 text-medical-red mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Book Doctor Appointment
                    </h2>
                    <p className="text-gray-600">
                      Connect with qualified healthcare professionals
                    </p>
                  </div>

                  {/* Priority Selection - Matching Your Design */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Appointment Priority
                    </label>
                    <div className="flex justify-center space-x-4">
                      {['NOW', 'SOON', 'LATE'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setPriority(level)}
                          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                            priority === level 
                              ? getPriorityColor(level)
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          ● {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      NAME
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-red text-gray-800"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Age Field */}
                  <div>
                    <label className="block text-sm font-bold text-medical-red mb-2 uppercase">
                      AGE
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-red text-gray-800"
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                        required
                      />
                    </div>
                  </div>

                  {/* Health Issue Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      HEALTH ISSUE
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="healthIssue"
                        value={formData.healthIssue}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-red text-gray-800 resize-none"
                        placeholder="Describe your health concerns, symptoms, and when they started..."
                        required
                      />
                    </div>
                  </div>

                  {/* Report Field */}
                  <div>
                    <label className="block text-sm font-bold text-medical-red mb-2 uppercase">
                      REPORT
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="report"
                        value={formData.report}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-red text-gray-800 resize-none"
                        placeholder="Any previous medical reports, test results, or additional information..."
                      />
                    </div>
                  </div>

                  {/* Contact Number Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      CONTACT NUMBER
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-red text-gray-800"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-medical-red text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          SUBMIT
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ <strong>Disclaimer:</strong> This appointment request is generated by MediChat AI and is for informational purposes only and it is suggested one not prescribed. Always consult with qualified healthcare professionals for medical decisions.
                  </p>
                </div>
              </div>

              {/* Bottom Medical Icons Border */}
              <div className="flex justify-between items-center mt-4 px-4 pb-4">
                <div className="flex space-x-2">
                  {['🏥', '💊', '📊', '🔬', '👨‍⚕️', '💉', '🩺', '❤️'].map((icon, index) => (
                    <div key={index} className="w-8 h-8 bg-red-100 rounded border border-medical-red flex items-center justify-center text-sm">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedDoctor;
