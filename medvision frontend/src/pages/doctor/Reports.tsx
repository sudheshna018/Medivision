import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getDoctorReports, Report } from '../../services/api';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import ReportCard from '../../components/ReportCard';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getDoctorReports();
        setReports(fetchedReports);
        setFilteredReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = reports;
    
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        report => 
          report.patientName.toLowerCase().includes(term) ||
          report.classification.label.toLowerCase().includes(term) ||
          report.id.toLowerCase().includes(term)
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(report => report.status === statusFilter);
    }
    
    // Tumor type filter
    if (typeFilter !== 'all') {
      result = result.filter(report => report.classification.label === typeFilter);
    }
    
    setFilteredReports(result);
  }, [searchTerm, statusFilter, typeFilter, reports]);
  
  // Get unique tumor types from reports
  const tumorTypes = [...new Set(reports.map(report => report.classification.label))];
  
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Patient Reports</h1>
            <p className="text-blue-200 mt-1">Review and manage all patient MRI scan reports</p>
          </div>
        </div>
      
      {/* Filters */}
      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden mb-6"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
           }}>
        <div className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white placeholder-blue-300"
                  placeholder="Search by patient name or tumor type"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-blue-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white"
                >
                  <option value="all" className="bg-black text-white">All Status</option>
                  <option value="pending" className="bg-black text-white">Pending Review</option>
                  <option value="reviewed" className="bg-black text-white">Reviewed</option>
                </select>
              </div>
            </div>
            
            {/* Type Filter */}
            <div className="w-full md:w-48 flex-shrink-0">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white"
              >
                <option value="all" className="bg-black text-white">All Tumor Types</option>
                {tumorTypes.map(type => (
                  <option key={type} value={type} className="bg-black text-white">{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reports List */}
      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
           }}>
        <div className="p-6 border-b border-blue-500/30">
          <h2 className="text-lg font-medium text-white">{filteredReports.length} Reports</h2>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} isDoctor={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/30">
                <AlertTriangle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-white">No reports found</h3>
              <p className="mt-1 text-sm text-blue-200">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default Reports;