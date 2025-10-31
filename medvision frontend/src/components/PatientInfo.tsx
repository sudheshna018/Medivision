import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Report } from '../services/api';

interface PatientInfoProps {
  patientDetails: Report['patientDetails'];
  patientName: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patientDetails, patientName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden"
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
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-400" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.6))' }} />
          Patient Information
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Full Name</p>
                <p className="text-base font-medium text-white">{patientName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Email Address</p>
                <p className="text-base font-medium text-white">{patientDetails.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Age</p>
                <p className="text-base font-medium text-white">{patientDetails.age || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Gender</p>
                <p className="text-base font-medium text-white">{patientDetails.gender || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Contact Number</p>
                <p className="text-base font-medium text-white">{patientDetails.contactNumber || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-md border border-blue-500/30">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-200">Registration Date</p>
                <p className="text-base font-medium text-white">{patientDetails.registrationDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientInfo;