import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Edit2, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    contactNumber: user?.contactNumber || '',
    age: user?.age || '',
    gender: user?.gender || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the user profile via API
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };
  
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
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="text-blue-200 mt-1">Manage your personal information</p>
          </div>
        
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-blue-500/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500/20 hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              style={{
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.3)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center px-4 py-2 border border-red-500/50 rounded-md shadow-sm text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-200"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          )}
      </div>
      
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <div className="p-6 border-b border-blue-500/30">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold text-white"
                     style={{
                       boxShadow: '0 0 20px rgba(0, 191, 255, 0.6)',
                       textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                     }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
                <p className="text-blue-200">{user?.email}</p>
              </div>
            </div>
          </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white placeholder-blue-300"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(0, 191, 255, 0.1)'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-200">{user?.name}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white placeholder-blue-300"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(0, 191, 255, 0.1)'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-200">{user?.email}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-white mb-1">
                  Contact Number
                </label>
                {isEditing ? (
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white placeholder-blue-300"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(0, 191, 255, 0.1)'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-200">{user?.contactNumber || 'Not provided'}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-white mb-1">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white placeholder-blue-300"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0, 191, 255, 0.1)'
                    }}
                  />
                ) : (
                  <span className="text-blue-200">{user?.age || 'Not provided'}</span>
                )}
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-white mb-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-blue-500/30 rounded-md bg-black/30 text-white"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0, 191, 255, 0.1)'
                    }}
                  >
                    <option value="" className="bg-black text-white">Select gender</option>
                    <option value="Male" className="bg-black text-white">Male</option>
                    <option value="Female" className="bg-black text-white">Female</option>
                    <option value="Other" className="bg-black text-white">Other</option>
                    <option value="Prefer not to say" className="bg-black text-white">Prefer not to say</option>
                  </select>
                ) : (
                  <span className="text-blue-200">{user?.gender || 'Not provided'}</span>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Registration Date
                </label>
                <span className="text-blue-200">{user?.registrationDate}</span>
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      
        {/* Account Settings Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px',
               boxShadow: '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.1)'
             }}>
          <div className="p-6 border-b border-blue-500/30">
            <h2 className="text-lg font-medium text-white">Account Settings</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-white">Change Password</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Update your password to keep your account secure.
                </p>
                <button
                  className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Change Password
                </button>
              </div>
              
              <div className="pt-4 border-t border-blue-500/30">
                <h3 className="text-md font-medium text-white">Email Notifications</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Manage your email notification preferences.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="notifications-results"
                      name="notifications-results"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-blue-500/30 rounded bg-black/30"
                    />
                    <label htmlFor="notifications-results" className="ml-2 text-sm text-blue-200">
                      Scan result notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notifications-doctor"
                      name="notifications-doctor"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-blue-500/30 rounded bg-black/30"
                    />
                    <label htmlFor="notifications-doctor" className="ml-2 text-sm text-blue-200">
                      Doctor review notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notifications-system"
                      name="notifications-system"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-blue-500/30 rounded bg-black/30"
                    />
                    <label htmlFor="notifications-system" className="ml-2 text-sm text-blue-200">
                      System updates and news
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;