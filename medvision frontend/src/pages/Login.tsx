import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      toast.success('Login successful!');
      navigate(user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
        className="relative z-10 max-w-md w-full space-y-8 p-8"
      >
        {/* Semi-transparent login form with grid overlay */}
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
              MediVision
            </h2>
            <p className="mt-2 text-sm text-blue-200" 
               style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.6)' }}>
              Brain Tumor Analysis Platform
            </p>
          </div>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-blue-200 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Email address"
                  />
                </div>
              </div>
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 bg-black/30 border border-blue-500/50 placeholder-blue-300/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm backdrop-blur-sm"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
          
            <div className="text-right">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot your password?
              </a>
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
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span className="text-blue-200">Don't have an account?</span>{' '}
                <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Register
                </Link>
              </div>
            </div>
          </form>
          
          <div className="mt-4 pt-4 border-t border-blue-500/30">
            <div className="text-center text-sm text-blue-200">
              <p>For demo purposes:</p>
              <div className="mt-2 space-y-1">
                <p><strong className="text-blue-300">Patient:</strong> patient@example.com / password</p>
                <p><strong className="text-blue-300">Doctor:</strong> doctor@example.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;