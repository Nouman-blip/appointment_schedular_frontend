import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Filter appointments based on search term and selected filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || appointment.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Get CSS classes for the status badge
  const getStatusBadge = (status) => {
    const statusStyles = {
      confirmed: 'bg-green-50 text-green-700',
      pending: 'bg-yellow-50 text-yellow-700',
      cancelled: 'bg-red-50 text-red-700',
    };
    return statusStyles[status] || statusStyles.pending;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Appointments</h2>
          <p className="text-gray-500">Manage and track your upcoming appointments</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative group">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:border-primary-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Select */}
          <div className="relative">
            <FunnelIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              className="w-full sm:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:border-primary-300 appearance-none pr-10 cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Appointments</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all duration-200">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-4">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filter !== 'all' ? 'No matching appointments found' : 'No appointments yet'}
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {searchTerm || filter !== 'all'
                  ? 'Try adjusting your search filters or create a new appointment'
                  : 'Get started by scheduling your first appointment'}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-primary-100 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                  <span className={`px-2 py-1 text-sm font-medium rounded ${getStatusBadge(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-gray-600">
                  <ClockIcon className="h-5 w-5" />
                  <span>{appointment.time}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-gray-600">
                  <UserIcon className="h-5 w-5" />
                  <span>{appointment.customerName}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{appointment.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
