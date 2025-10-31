import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Brain, 
  User, 
  FileText, 
  Upload, 
  Menu, 
  X,
  Home,
  Bell,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState<number>(2); // Example notification count

  const isPatient = user?.role === 'patient';
  
  const patientLinks = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: <Home size={20} /> },
    { name: 'Upload Scan', path: '/patient/upload', icon: <Upload size={20} /> },
    { name: 'Profile', path: '/patient/profile', icon: <User size={20} /> },
  ];
  
  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: <Home size={20} /> },
    { name: 'Patient Reports', path: '/doctor/reports', icon: <FileText size={20} /> },
  ];
  
  const navigationLinks = isPatient ? patientLinks : doctorLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#0080FF" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#0066CC" stopOpacity="0.4"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.4" filter="url(#glow)">
              <path d="M100,200 Q300,100 500,200 T900,200" className="animate-pulse"/>
              <path d="M150,300 Q350,250 550,300 T950,300" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <path d="M200,400 Q400,350 600,400 T1000,400" className="animate-pulse" style={{animationDelay: '1s'}}/>
              <path d="M50,500 Q250,450 450,500 T850,500" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              <path d="M100,600 Q300,550 500,600 T900,600" className="animate-pulse" style={{animationDelay: '2s'}}/>
            </g>
            <g fill="#00BFFF" opacity="0.6" filter="url(#glow)">
              <circle cx="100" cy="200" r="2" className="animate-ping"/>
              <circle cx="300" cy="100" r="1.5" className="animate-ping" style={{animationDelay: '0.3s'}}/>
              <circle cx="500" cy="200" r="2" className="animate-ping" style={{animationDelay: '0.6s'}}/>
              <circle cx="700" cy="150" r="1.5" className="animate-ping" style={{animationDelay: '0.9s'}}/>
              <circle cx="900" cy="200" r="2" className="animate-ping" style={{animationDelay: '1.2s'}}/>
            </g>
          </svg>
        </div>
        
        {/* Floating data particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-400 opacity-10 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                textShadow: '0 0 10px rgba(0, 191, 255, 0.6)'
              }}
            >
              {Math.random() > 0.5 ? '0101' : '1010'}
            </div>
          ))}
        </div>
      </div>

      {/* Left Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col w-64 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border-r border-blue-500/30 relative z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          boxShadow: '0 0 30px rgba(0, 191, 255, 0.1), inset 0 0 30px rgba(0, 191, 255, 0.05)'
        }}
      >
        <div className="p-6 border-b border-blue-500/30">
          <Link to={isPatient ? '/patient/dashboard' : '/doctor/dashboard'} className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-blue-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
            <div>
              <span className="text-xl font-bold text-white">MediVision</span>
              <div className="text-sm text-blue-200 mt-1">{isPatient ? 'Patient Portal' : 'Doctor Portal'}</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  : 'text-gray-300 hover:bg-blue-500/10 hover:text-white'
              }`}
              style={location.pathname === link.path ? {
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.1)',
                textShadow: '0 0 10px rgba(0, 191, 255, 0.6)'
              } : {}}
            >
              <span className="mr-3" style={location.pathname === link.path ? { filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' } : {}}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-blue-500/30">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
          >
            <ArrowRight size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Header Bar */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-blue-500/30 shadow-lg"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  boxShadow: '0 0 30px rgba(0, 191, 255, 0.1), inset 0 0 30px rgba(0, 191, 255, 0.05)'
                }}>
          <div className="px-6 py-4 flex justify-between items-center">
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-blue-400 focus:outline-none hover:text-blue-300 transition-colors"
              style={{ filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' }}
            >
              <Menu size={24} />
            </button>
            
            <div className="md:hidden flex items-center">
              <Brain className="h-6 w-6 text-blue-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
              <span className="ml-2 text-lg font-semibold text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>MediVision</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Bell className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" 
                      style={{ filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' }} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse"
                        style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)' }}>
                    {notifications}
                  </span>
                )}
              </div>
              
              {/* Messages */}
              <div className="relative">
                <MessageCircle className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" 
                               style={{ filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' }} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse"
                      style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)' }}>
                  1
                </span>
              </div>
              
              {/* User avatar */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold"
                     style={{
                       boxShadow: '0 0 20px rgba(0, 191, 255, 0.6)',
                       textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                     }}>
                  {user?.name?.charAt(0) || 'J'}
                </div>
                <span className="text-white font-medium" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>
                  {user?.name || 'John Doe'}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm">
            <motion.div 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="h-full w-64 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm shadow-2xl"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
              }}
            >
              <div className="p-4 flex justify-between items-center border-b border-blue-500/30">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-blue-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
                  <span className="ml-2 text-lg font-semibold text-white">MediVision</span>
                </div>
                <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="p-4 space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        : 'text-gray-300 hover:bg-blue-500/10 hover:text-white'
                    }`}
                    style={location.pathname === link.path ? {
                      boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.1)',
                      textShadow: '0 0 10px rgba(0, 191, 255, 0.6)'
                    } : {}}
                  >
                    <span className="mr-3" style={location.pathname === link.path ? { filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' } : {}}>{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 mt-4 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                >
                  <ArrowRight size={20} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </motion.div>
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;