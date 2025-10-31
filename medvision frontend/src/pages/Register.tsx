import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Brain, User, Mail, Lock, Phone, Check } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    age: '',
    gender: '',
    role: 'patient',
    specialization: '', // For doctors only
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    
    if (formData.role === 'doctor' && !formData.specialization) {
      toast.error('Specialization is required for doctors');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const user = await register(formData);
      toast.success('Registration successful!');
      navigate(user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Neural Network Background */}
      <div className="absolute inset-0 bg-black">
        {/* Animated neural network lines */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#0080FF" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#0066CC" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            {/* Neural network connections */}
            <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.6">
              <path d="M100,200 Q300,100 500,200 T900,200" className="animate-pulse"/>
              <path d="M150,300 Q350,250 550,300 T950,300" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <path d="M200,400 Q400,350 600,400 T1000,400" className="animate-pulse" style={{animationDelay: '1s'}}/>
              <path d="M50,500 Q250,450 450,500 T850,500" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              <path d="M100,600 Q300,550 500,600 T900,600" className="animate-pulse" style={{animationDelay: '2s'}}/>
            </g>
            {/* Neural nodes */}
            <g fill="#00BFFF" opacity="0.8">
              <circle cx="100" cy="200" r="3" className="animate-ping"/>
              <circle cx="300" cy="100" r="2" className="animate-ping" style={{animationDelay: '0.3s'}}/>
              <circle cx="500" cy="200" r="3" className="animate-ping" style={{animationDelay: '0.6s'}}/>
              <circle cx="700" cy="150" r="2" className="animate-ping" style={{animationDelay: '0.9s'}}/>
              <circle cx="900" cy="200" r="3" className="animate-ping" style={{animationDelay: '1.2s'}}/>
              <circle cx="150" cy="300" r="2" className="animate-ping" style={{animationDelay: '1.5s'}}/>
              <circle cx="350" cy="250" r="3" className="animate-ping" style={{animationDelay: '1.8s'}}/>
              <circle cx="550" cy="300" r="2" className="animate-ping" style={{animationDelay: '2.1s'}}/>
              <circle cx="750" cy="250" r="3" className="animate-ping" style={{animationDelay: '2.4s'}}/>
              <circle cx="950" cy="300" r="2" className="animate-ping" style={{animationDelay: '2.7s'}}/>
            </g>
          </svg>
        </div>
        
        {/* Floating data particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-400 opacity-20 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '0101' : '1010'}
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full space-y-8 p-8"
      >
        {/* Semi-transparent register form with grid overlay */}
        <div className="relative bg-black/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 shadow-2xl"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 50px rgba(0, 191, 255, 0.3), inset 0 0 50px rgba(0, 191, 255, 0.1)'
             }}
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto h-16 w-16 text-blue-400"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.8))' }}
            >
              <Brain className="h-16 w-16" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-extrabold text-white" 
                style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }}>
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-blue-200" 
               style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.6)' }}>
              Join MediVision's Brain Tumor Analysis Platform
            </p>
          </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Account Type Selection */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'patient' })}
                className={`flex-1 py-3 px-4 rounded-md border transition-all duration-200 ${
                  formData.role === 'patient'
                    ? 'border-blue-400 bg-blue-500/20 text-blue-300 shadow-lg'
                    : 'border-blue-500/30 bg-black/20 text-blue-200 hover:bg-blue-500/10'
                }`}
                style={formData.role === 'patient' ? {
                  boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.1)'
                } : {}}
              >
                <div className="flex items-center justify-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>Patient</span>
                  {formData.role === 'patient' && (
                    <Check className="h-4 w-4 ml-2 text-blue-400" />
                  )}
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'doctor' })}
                className={`flex-1 py-3 px-4 rounded-md border transition-all duration-200 ${
                  formData.role === 'doctor'
                    ? 'border-blue-400 bg-blue-500/20 text-blue-300 shadow-lg'
                    : 'border-blue-500/30 bg-black/20 text-blue-200 hover:bg-blue-500/10'
                }`}
                style={formData.role === 'doctor' ? {
                  boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.1)'
                } : {}}
              >
                <div className="flex items-center justify-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>Doctor</span>
                  {formData.role === 'doctor' && (
                    <Check className="h-4 w-4 ml-2 text-blue-400" />
                  )}
                </div>
              </button>
            </div>
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                  style={{ 
                    boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                    backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                  style={{ 
                    boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                    backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Create a password"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
            
            {/* Contact & Personal Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-blue-200 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              
              {formData.role === 'patient' ? (
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-blue-200 mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Your age"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-blue-200 mb-2">
                    Specialization
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 bg-black/30 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  >
                    <option value="" className="bg-black text-blue-300">Select a specialization</option>
                    <option value="Neurology" className="bg-black text-white">Neurology</option>
                    <option value="Radiology" className="bg-black text-white">Radiology</option>
                    <option value="Neurosurgery" className="bg-black text-white">Neurosurgery</option>
                    <option value="Oncology" className="bg-black text-white">Oncology</option>
                  </select>
                </div>
              )}
            </div>
            
            {formData.role === 'patient' && (
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-blue-200 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 bg-black/30 border border-blue-500/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                  style={{ 
                    boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                    backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <option value="" className="bg-black text-blue-300">Select gender</option>
                  <option value="Male" className="bg-black text-white">Male</option>
                  <option value="Female" className="bg-black text-white">Female</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                  <option value="Prefer not to say" className="bg-black text-white">Prefer not to say</option>
                </select>
              </div>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #00BFFF 0%, #0080FF 100%)',
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-blue-200">Already have an account?</span>{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;