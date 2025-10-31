import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getDoctorReports, Report } from '../../services/api';
import { Users, FileText, AlertTriangle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getDoctorReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  // Group reports by status
  const pendingReports = reports.filter(report => report.status === 'pending');
  const reviewedReports = reports.filter(report => report.status === 'reviewed');
  
  // Get unique patients count
  const uniquePatients = new Set(reports.map(report => report.patientId)).size;
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
            </defs>
            <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.4">
              <path d="M100,200 Q300,100 500,200 T900,200" className="animate-pulse"/>
              <path d="M150,300 Q350,250 550,300 T950,300" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <path d="M200,400 Q400,350 600,400 T1000,400" className="animate-pulse" style={{animationDelay: '1s'}}/>
            </g>
            <g fill="#00BFFF" opacity="0.6">
              <circle cx="100" cy="200" r="2" className="animate-ping"/>
              <circle cx="300" cy="100" r="1.5" className="animate-ping" style={{animationDelay: '0.3s'}}/>
              <circle cx="500" cy="200" r="2" className="animate-ping" style={{animationDelay: '0.6s'}}/>
            </g>
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Doctor Dashboard</h1>
          <p className="text-blue-200 mt-1">Welcome back, {user?.name}</p>
        </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 overflow-hidden rounded-lg shadow-2xl"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/20 border border-blue-500/30 rounded-md p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-blue-200 truncate">Total Patients</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{uniquePatients}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 overflow-hidden rounded-lg shadow-2xl"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500/20 border border-yellow-500/30 rounded-md p-3">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-blue-200 truncate">Pending Reviews</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{pendingReports.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 overflow-hidden rounded-lg shadow-2xl"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500/20 border border-green-500/30 rounded-md p-3">
                <FileText className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-blue-200 truncate">Completed Reviews</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{reviewedReports.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pending Reviews */}
      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden mb-8"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
           }}>
        <div className="p-6 border-b border-blue-500/30 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Pending Reviews</h2>
          <Link
            to="/doctor/reports"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View All
          </Link>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
            </div>
          ) : pendingReports.length > 0 ? (
            <div className="divide-y divide-blue-500/20">
              {pendingReports.slice(0, 3).map((report) => (
                <div key={report.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {report.patientName} - {report.classification.label} Analysis
                      </p>
                      <p className="text-xs text-blue-200">
                        Uploaded on {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/doctor/reports/${report.patientId}/${report.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                      style={{ boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)' }}
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
              
              {pendingReports.length > 3 && (
                <div className="pt-4 text-center">
                  <Link 
                    to="/doctor/reports" 
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    View {pendingReports.length - 3} more pending reviews
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/30">
                <AlertTriangle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-white">No pending reviews</h3>
              <p className="mt-1 text-sm text-blue-200">
                All uploaded MRI scans have been reviewed.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
           }}>
        <div className="p-6 border-b border-blue-500/30">
          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
        </div>
        
        <div className="p-6">
          {reviewedReports.length > 0 ? (
            <div className="flow-root">
              <ul className="-mb-8">
                {reviewedReports.slice(0, 5).map((report, idx) => (
                  <li key={report.id}>
                    <div className="relative pb-8">
                      {idx !== reviewedReports.slice(0, 5).length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-blue-500/30"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-green-400" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-white">
                              Reviewed {report.patientName}'s {report.classification.label} scan
                            </p>
                          </div>
                          <div className="text-sm text-blue-200 whitespace-nowrap">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-blue-200">No recent activity found.</p>
            </div>
          )}
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;