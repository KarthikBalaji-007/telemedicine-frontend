import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, Eye, EyeOff, Heart, UserCheck, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('patient'); // 'patient' or 'doctor'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check user credentials (in production, use proper backend authentication)
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = users.find(u => u.email === formData.email && u.userType === loginType);

      if (!user) {
        setErrors({ 
          email: `No ${loginType} account found with this email. Please check your credentials or register first.` 
        });
        setIsLoading(false);
        return;
      }

      // Save login session
      const loginSession = {
        user: user,
        loginTime: new Date().toISOString(),
        userType: loginType
      };
      localStorage.setItem('currentUser', JSON.stringify(loginSession));

      alert(`✅ Login successful!\n\nWelcome back, ${user.fullName}!\nLogged in as: ${loginType === 'patient' ? 'Patient' : 'Doctor'}`);

      // Navigate to appropriate dashboard
      if (loginType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/'); // Patient goes to main homepage
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-medical-red mr-2" />
            <h1 className="text-3xl font-bold">
              <span className="text-medical-red">Medi</span>
              <span className="text-black">Chat</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your MediChat healthcare dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-medical-red">
            
            {/* Login Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Sign in as:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setLoginType('patient')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    loginType === 'patient'
                      ? 'border-medical-red bg-red-50 text-medical-red'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Patient</div>
                  <div className="text-xs">Access healthcare</div>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('doctor')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    loginType === 'doctor'
                      ? 'border-medical-red bg-red-50 text-medical-red'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <UserCheck className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Doctor</div>
                  <div className="text-xs">Healthcare provider</div>
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-medical-red'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-medical-red'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => alert('Forgot password feature will be implemented soon.')}
                className="text-sm text-medical-red hover:text-red-600 transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-medical-red text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-medical-red focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in as {loginType === 'patient' ? 'Patient' : 'Doctor'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-bold text-medical-red hover:text-red-600 transition-colors"
              >
                Register here
              </button>
            </p>
          </div>

          {/* Quick Access for Demo */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Quick Demo Access:</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors"
              >
                Continue as Guest Patient
              </button>
              <button
                type="button"
                onClick={() => alert('Doctor dashboard demo available after login.')}
                className="text-xs bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors"
              >
                Doctor Demo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
