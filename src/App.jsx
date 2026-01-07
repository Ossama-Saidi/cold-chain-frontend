import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard/Dashboard';
import IncidentsTab from './components/Incidents/IncidentsTab';
import TicketsTab from './components/Tickets/TicketsTab';
import AuditTab from './components/Audit/AuditTab';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedLayout from './components/Auth/ProtectedLayout';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'incidents': return <IncidentsTab />;
      case 'tickets': return <TicketsTab />;
      case 'audit': return <AuditTab />;
      default: return null;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <div className="min-h-screen bg-gray-50">
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="container mx-auto px-4 py-8">
                  {renderContent()}
                </main>
              </div>
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
