import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentForm from './components/appointments/AppointmentForm';
import LandingPage from './components/auth/LandingPage';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import Navbar from './components/common/Navbar';
import './App.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              !isAuthenticated ? (
                <>
                  <Navbar />
                  <DashboardPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/appointments"
            element={
              !isAuthenticated ? (
                <>
                  <Navbar />
                  <div className="min-h-screen bg-gray-50 pt-16">
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                          <p className="mt-1 text-sm text-gray-500">Manage your scheduled appointments</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          New Appointment
                        </button>
                      </div>
                      <AppointmentList />
                    </main>
                    <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
