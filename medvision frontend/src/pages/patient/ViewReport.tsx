import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getReportById, Report } from '../../services/api';
import { ChevronLeft } from 'lucide-react';
import PatientInfo from '../../components/PatientInfo';
import TumorAnalysisResult from '../../components/TumorAnalysisResult';
import ReportPDF from '../../components/ReportPDF';

const ViewReport: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) return;
      
      try {
        const fetchedReport = await getReportById(reportId);
        setReport(fetchedReport);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReport();
  }, [reportId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
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
        <div className="flex justify-center items-center h-64 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.6))' }}></div>
        </div>
      </div>
    );
  }
  
  if (!report || !user) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
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
        <div className="relative z-10 flex justify-center items-center h-64">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl p-6 text-center"
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px',
                 boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
               }}>
            <h2 className="text-xl font-semibold text-white mb-2">Report Not Found</h2>
            <p className="text-blue-200 mb-4">
              The report you are looking for does not exist or you don't have permission to view it.
            </p>
            <Link
              to="/patient/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              style={{
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/patient/dashboard"
              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2">MRI Scan Report</h1>
            <p className="text-blue-200">
              Report ID: {reportId} • Generated on {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      
      {/* Patient Information */}
      <PatientInfo patientDetails={report.patientDetails} patientName={report.patientName} />
      
      {/* Tumor Analysis Result */}
      <TumorAnalysisResult 
        classification={report.classification} 
        maskImageUrl={report.maskImageUrl} 
      />
      
        {/* Doctor's Notes (if available) */}
        {report.doctorNotes && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden mt-6"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
            }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Doctor's Notes
              </h2>
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 p-4 rounded-lg"
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(0, 191, 255, 0.05) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px)
                     `,
                     backgroundSize: '20px 20px',
                     boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)'
                   }}>
                <p className="text-blue-200">{report.doctorNotes}</p>
              </div>
            </div>
          </motion.div>
        )}
      
        {/* PDF Report */}
        <ReportPDF report={report} />
      </motion.div>
    </div>
  );
};

export default ViewReport;