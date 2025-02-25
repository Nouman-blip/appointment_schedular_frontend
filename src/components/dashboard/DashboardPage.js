import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineUserGroup, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardPage = () => {
    const stats = [
        { name: 'Total Appointments', value: '156', icon: HiOutlineCalendar, change: '+12%', changeType: 'increase' },
        { name: 'Active Clients', value: '58', icon: HiOutlineUserGroup, change: '+18%', changeType: 'increase' },
        { name: 'Average Duration', value: '45m', icon: HiOutlineClock, change: '-5%', changeType: 'decrease' },
        { name: 'Completion Rate', value: '94%', icon: HiOutlineCheckCircle, change: '+2%', changeType: 'increase' },
    ];

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Appointments',
                data: [65, 78, 66, 89, 80, 95],
                fill: true,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const barChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Appointments by Day',
                data: [12, 19, 15, 17, 14, 8, 5],
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="mt-1 text-sm text-gray-500">Track your appointment metrics and analytics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-100 p-5"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <stat.icon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                                        <dd>
                                            <div className="flex items-baseline">
                                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                                <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {stat.change}
                                                </p>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Trends</h3>
                        <div className="h-[300px]">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Distribution</h3>
                        <div className="h-[300px]">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;