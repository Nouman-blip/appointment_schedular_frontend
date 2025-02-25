import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineUserCircle, HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: HiOutlineChartBar },
        { path: '/appointments', label: 'Appointments', icon: HiOutlineCalendar },
        { path: '/profile', label: 'Profile', icon: HiOutlineUserCircle },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <HiOutlineCalendar className="h-8 w-8 text-primary-600" />
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                                AppointMe
                            </span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.path) ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <Icon className="h-5 w-5 mr-1.5" />
                                        {item.label}
                                        {isActive(item.path) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
                            onClick={() => {
                                // Handle logout
                            }}
                        >
                            <HiOutlineLogout className="h-5 w-5 mr-1.5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;