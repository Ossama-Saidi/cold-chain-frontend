import React, { useState, useEffect } from 'react';
import { Thermometer, Bell, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';

const Header = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const tabs = ['dashboard', 'incidents', 'tickets', 'audit'];

  // Charger le profil utilisateur au montage
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      getUserProfile(token)
        .then(data => setUser(data))
        .catch(() => logout());
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <header className="pb-6 bg-white lg:pb-0 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-red-700 p-2 rounded-lg">
              <Thermometer className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div>
              <p className="text-sm lg:text-xl font-bold text-gray-900">Cold Chain Monitoring</p>
              <p className="text-xs lg:text-sm text-gray-600">Medical Laboratory IoT System</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-base font-medium capitalize transition-all duration-200 rounded-lg ${
                  activeTab === tab 
                    ? 'text-red-600 bg-red-50 border-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* User Section */}
          {user && (
            <div className="hidden lg:flex items-center ml-10 space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-all duration-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <div className="text-right border-l-2 border-gray-200 pl-4">
                <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`inline-flex py-3 px-4 text-base font-medium capitalize transition-all duration-200 rounded-lg ${
                      activeTab === tab 
                        ? 'text-red-600 bg-red-50 border-2 border-red-600' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            {user && (
              <div className="px-6 mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button onClick={logout} className="p-2 rounded hover:bg-gray-100">
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
