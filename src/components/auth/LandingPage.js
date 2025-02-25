import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiCalendar, HiClock, HiUserGroup, HiLightningBolt } from 'react-icons/hi';
import { FunnelIcon, MagnifyingGlassIcon } from 'react-icons/hi2';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const { scrollY } = useScroll();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parallax effects
  const y = useTransform(scrollY, [0, 300], ['0%', '30%']);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const features = [
    {
      icon: <HiCalendar className="w-8 h-8 text-primary-500" />,
      title: 'Smart Scheduling',
      description: 'Effortlessly manage your appointments with our intuitive scheduling system.',
      stats: '50% less time spent on scheduling',
    },
    {
      icon: <HiClock className="w-8 h-8 text-primary-500" />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and status updates.',
      stats: '99.9% uptime guarantee',
    },
    {
      icon: <HiUserGroup className="w-8 h-8 text-primary-500" />,
      title: 'Team Collaboration',
      description: 'Seamlessly coordinate with team members and clients.',
      stats: '35% improved team productivity',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'This platform has revolutionized how we handle appointments. The automation features alone saved us countless hours.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Founder, DesignCo',
      content: 'The intuitive interface and powerful features make this the perfect solution for our scheduling needs.',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/20 backdrop-blur-sm" />
        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        >
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                  Effortless Scheduling
                </span>
                <span className="block mt-2">for Busy Professionals</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 max-w-lg mx-auto text-xl text-gray-600 sm:text-2xl md:max-w-3xl"
            >
              Automate your appointment bookings and never miss a beat.
              <span className="block mt-2 text-lg text-gray-500">
                Join thousands of professionals who trust us with their scheduling needs.
              </span>
            </motion.p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* Instead of a modal, this button now links to the login page */}
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg transition-all duration-200"
              >
                Get Started Free
                <HiLightningBolt className="ml-2 h-5 w-5" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-lg font-semibold rounded-xl text-primary-600 bg-white hover:bg-primary-50 transition-all duration-200"
              >
                Watch Demo
                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Everything you need to scale
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Powerful features to help you manage appointments like a pro.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-primary-50 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-primary-600">{feature.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section (Optional) */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who transformed their scheduling with us.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
