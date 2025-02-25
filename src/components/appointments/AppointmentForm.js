import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../store/slices/appointmentSlice';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineInformationCircle } from 'react-icons/hi';

const localizer = momentLocalizer(moment);

const AppointmentForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { appointments } = useSelector((state) => state.appointments);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        description: ''
    });

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(true);

    useEffect(() => {
        // Generate available slots based on business hours and existing appointments
        const generateAvailableSlots = () => {
            const slots = [];
            const currentDate = moment();

            // Generate slots for the next 7 days
            for (let i = 0; i < 7; i++) {
                const date = moment(currentDate).add(i, 'days');

                // Business hours: 9 AM to 5 PM
                for (let hour = 9; hour < 17; hour++) {
                    const slot = {
                        id: `slot-${date.format('YYYY-MM-DD')}-${hour}`,
                        start: date.clone().hour(hour).toDate(),
                        end: date.clone().hour(hour + 1).toDate(),
                        title: 'Available',
                        isAvailable: true
                    };

                    // Check if slot conflicts with existing appointments
                    const isBooked = appointments.some(apt => {
                        const aptStart = moment(apt.start_time);
                        return aptStart.isSame(slot.start, 'hour');
                    });

                    if (!isBooked) {
                        slots.push(slot);
                    }
                }
            }

            setAvailableSlots(slots);
        };

        if (isOpen) {
            generateAvailableSlots();
        }
    }, [isOpen, appointments]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSlotSelect = ({ start }) => {
        setSelectedSlot(start);
        setFormData(prev => ({
            ...prev,
            date: moment(start).format('YYYY-MM-DD'),
            time: moment(start).format('HH:mm')
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = {
            ...formData,
            start_time: `${formData.date}T${formData.time}`,
            status: 'pending'
        };

        try {
            await dispatch(createAppointment(appointmentData)).unwrap();
            onClose();
            setFormData({ title: '', date: '', time: '', description: '' });
        } catch (error) {
            console.error('Failed to create appointment:', error);
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                                            New Appointment
                                        </Dialog.Title>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-200"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                required
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-200"
                                                value={formData.date}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                id="time"
                                                required
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-200"
                                                value={formData.time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={4}
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all duration-200"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-4">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 sm:col-start-2"
                                        >
                                            Create Appointment
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200 sm:col-start-1 sm:mt-0"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AppointmentForm;