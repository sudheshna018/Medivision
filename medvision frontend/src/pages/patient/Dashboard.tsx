import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientReports, Report } from '../../services/api';
import { FileText, Upload, Brain, BarChart3, Star } from 'lucide-react';
import ReportCard from '../../components/ReportCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;
      
      try {
        const fetchedReports = await getPatientReports(user.id);
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, [user]);
  
  // Group reports by status
  const pendingReports = reports.filter(report => report.status === 'pending');
  const reviewedReports = reports.filter(report => report.status === 'reviewed');
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        {/* Animated neural network lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#0080FF" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#0066CC" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            {/* Neural network connections */}
            <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.4">
              <path d="M100,200 Q300,100 500,200 T900,200" className="animate-pulse"/>
              <path d="M150,300 Q350,250 550,300 T950,300" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <path d="M200,400 Q400,350 600,400 T1000,400" className="animate-pulse" style={{animationDelay: '1s'}}/>
              <path d="M50,500 Q250,450 450,500 T850,500" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
              <path d="M100,600 Q300,550 500,600 T900,600" className="animate-pulse" style={{animationDelay: '2s'}}/>
            </g>
            {/* Neural nodes */}
            <g fill="#00BFFF" opacity="0.6">
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
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-400 opacity-10 text-xs font-mono animate-pulse"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Patient Dashboard</h1>
          <p className="text-blue-200">Welcome back, {user?.name}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Your Next Step Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl"
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px',
                 boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Your Next Step</h3>
                <p className="text-blue-200 text-sm">Your Next Scan</p>
              </div>
              <Upload className="w-8 h-8 text-blue-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
            </div>
            <p className="text-blue-100 text-sm mb-4">Upload new MRI Scan for AI Analysis</p>
            <Link
              to="/patient/upload"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              Upload Now
            </Link>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl"
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px',
                 boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
               }}>
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-blue-100 text-sm">New days ago</p>
                  <p className="text-blue-200 text-xs">Last scan was 10 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Summary Card */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl"
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px',
                 boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Reports Summary</h3>
              <div className="text-3xl font-bold text-blue-400">3</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Total Reports:</span>
                <span className="text-white font-medium">{reports.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Pending Review:</span>
                <span className="text-white font-medium">{pendingReports.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Reviewed:</span>
                <span className="text-white font-medium">{reviewedReports.length}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl mb-8"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity Feed</h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
            </div>
          ) : reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-blue-100">New days ago</p>
                  <p className="text-blue-200 text-sm">Last scan was 10 days ago</p>
                </div>
              </div>
              <div className="text-center">
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-2" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
                <p className="text-blue-100 font-medium">No reports found</p>
                <p className="text-blue-200 text-sm">Get started by uploading your first MRI scan.</p>
                <Link
                  to="/patient/upload"
                  className="inline-flex items-center mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Scan
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Health Tips AI Insights */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Health Tips AI Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px',
                   boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
                 }}>
              <h4 className="text-lg font-semibold text-white mb-3">Understanding AI Diagnostics</h4>
              <p className="text-blue-200 text-sm mb-4">
                Learn how to interpret your MRI scan results and what different classifications mean.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px',
                   boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
                 }}>
              <h4 className="text-lg font-semibold text-white mb-3">Preparing for an MRI</h4>
              <p className="text-blue-200 text-sm mb-4">
                Tips on how to prepare for your MRI scan appointment and what to expect during the procedure.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-2xl relative"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px',
                   boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
                 }}>
              <Star className="w-6 h-6 text-blue-400 absolute top-4 right-4" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }} />
              <h4 className="text-lg font-semibold text-white mb-3">Brain Health Resources</h4>
              <p className="text-blue-200 text-sm mb-4">
                Explore resources and support groups for patients with neurological conditions.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;