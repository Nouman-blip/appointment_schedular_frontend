import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentForm from './components/appointments/AppointmentForm';
import './App.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-800">Appointment Scheduler</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Appointments
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    New Appointment
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="py-10">
            <Routes>
              <Route path="/" element={<AppointmentList />} />
            </Routes>
          </main>

          <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
