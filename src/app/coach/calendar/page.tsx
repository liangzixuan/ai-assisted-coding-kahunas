'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import AppointmentModal from "@/components/coach/appointment-modal";
import TimeBlockModal from "@/components/coach/time-block-modal";
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Calendar as CalendarIcon, Settings, Filter, MoreVertical, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';

interface Appointment {
  id: string;
  clientId: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeBlock {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'AVAILABLE' | 'UNAVAILABLE' | 'BREAK';
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function CoachCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showTimeBlockModal, setShowTimeBlockModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | null>(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [appointmentsResponse, timeBlocksResponse] = await Promise.all([
        fetch('/api/coach/appointments'),
        fetch('/api/coach/time-blocks')
      ]);

      if (!appointmentsResponse.ok || !timeBlocksResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const appointmentsData = await appointmentsResponse.json();
      const timeBlocksData = await timeBlocksResponse.json();

      setAppointments(appointmentsData);
      setTimeBlocks(timeBlocksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === dateString);
  };

  const getTimeBlocksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return timeBlocks.filter(block => block.date === dateString);
  };

  const handleCreateAppointment = () => {
    setSelectedAppointment(null);
    setShowAppointmentModal(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleCreateTimeBlock = () => {
    setSelectedTimeBlock(null);
    setShowTimeBlockModal(true);
  };

  const handleEditTimeBlock = (timeBlock: TimeBlock) => {
    setSelectedTimeBlock(timeBlock);
    setShowTimeBlockModal(true);
  };

  const handleAppointmentSubmit = async (appointmentData: any) => {
    try {
      const url = selectedAppointment 
        ? `/api/coach/appointments/${selectedAppointment.id}`
        : '/api/coach/appointments';
      
      const method = selectedAppointment ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save appointment');
      }

      await fetchData(); // Refresh data
      setShowAppointmentModal(false);
    } catch (err) {
      console.error('Error saving appointment:', err);
      // You could add a toast notification here
    }
  };

  const handleTimeBlockSubmit = async (timeBlockData: any) => {
    try {
      const url = selectedTimeBlock 
        ? `/api/coach/time-blocks/${selectedTimeBlock.id}`
        : '/api/coach/time-blocks';
      
      const method = selectedTimeBlock ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeBlockData),
      });

      if (!response.ok) {
        throw new Error('Failed to save time block');
      }

      await fetchData(); // Refresh data
      setShowTimeBlockModal(false);
    } catch (err) {
      console.error('Error saving time block:', err);
      // You could add a toast notification here
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/coach/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const handleDeleteTimeBlock = async (timeBlockId: string) => {
    if (!confirm('Are you sure you want to delete this time block?')) {
      return;
    }

    try {
      const response = await fetch(`/api/coach/time-blocks/${timeBlockId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete time block');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Error deleting time block:', err);
    }
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <DashboardLayout 
        title="Calendar"
        subtitle="Manage your appointments and availability"
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin text-yellow-600" />
            <span className="text-gray-600 dark:text-gray-400">Loading calendar...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        title="Calendar"
        subtitle="Manage your appointments and availability"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Calendar"
      subtitle="Manage your appointments and availability"
    >
      {/* Header with Actions */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  view === 'month'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  view === 'week'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  view === 'day'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateTimeBlock}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Block Time
            </button>
            <button
              onClick={handleCreateAppointment}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={fetchData}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="min-h-[120px] border-r border-b border-gray-200 dark:border-gray-700" />;
            }

            const dayAppointments = getAppointmentsForDate(day);
            const dayTimeBlocks = getTimeBlocksForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-gray-200 dark:border-gray-700 p-2 relative ${
                  isToday ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                } ${isSelected ? 'ring-2 ring-yellow-500' : ''}`}
                onClick={() => handleDateSelect(day)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isToday
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {day.getDate()}
                  </span>
                  {dayAppointments.length > 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-1.5 py-0.5 rounded-full">
                      {dayAppointments.length}
                    </span>
                  )}
                </div>

                {/* Appointments */}
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAppointment(appointment);
                      }}
                    >
                      <div className="font-medium truncate">{appointment.client.name}</div>
                      <div className="text-xs opacity-75">{appointment.startTime}</div>
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </div>

                {/* Time Blocks */}
                <div className="space-y-1 mt-1">
                  {dayTimeBlocks.slice(0, 1).map((block) => (
                    <div
                      key={block.id}
                      className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                        block.type === 'AVAILABLE'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                          : block.type === 'BREAK'
                          ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTimeBlock(block);
                      }}
                    >
                      <div className="font-medium truncate">{block.title}</div>
                      <div className="text-xs opacity-75">{block.startTime} - {block.endTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointments */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">Appointments</h4>
                  <button
                    onClick={handleCreateAppointment}
                    className="text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {getAppointmentsForDate(selectedDate).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {appointment.client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.client.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.startTime} • {appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : appointment.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {appointment.status.toLowerCase()}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditAppointment(appointment)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getAppointmentsForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No appointments scheduled</p>
                  )}
                </div>
              </div>

              {/* Time Blocks */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">Time Blocks</h4>
                  <button
                    onClick={handleCreateTimeBlock}
                    className="text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {getTimeBlocksForDate(selectedDate).map((block) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          block.type === 'AVAILABLE'
                            ? 'bg-green-600'
                            : block.type === 'BREAK'
                            ? 'bg-orange-600'
                            : 'bg-gray-600'
                        }`}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{block.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{block.startTime} - {block.endTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          block.type === 'AVAILABLE'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : block.type === 'BREAK'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {block.type.toLowerCase()}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditTimeBlock(block)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTimeBlock(block.id)}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getTimeBlocksForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No time blocks set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Appointments</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{appointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Confirmed</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {appointments.filter(a => a.status === 'CONFIRMED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {appointments.filter(a => a.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Blocks</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{timeBlocks.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        selectedDate={selectedDate || undefined}
        onSubmit={handleAppointmentSubmit}
        appointment={selectedAppointment}
      />

      <TimeBlockModal
        isOpen={showTimeBlockModal}
        onClose={() => setShowTimeBlockModal(false)}
        selectedDate={selectedDate || undefined}
        onSubmit={handleTimeBlockSubmit}
        timeBlock={selectedTimeBlock}
      />
    </DashboardLayout>
  );
} 