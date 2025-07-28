'use client';

import React, { useState } from 'react';
import { X, Clock, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface TimeBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onSubmit: (timeBlock: any) => void;
  timeBlock?: any; // For editing existing time blocks
}

export default function TimeBlockModal({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  timeBlock
}: TimeBlockModalProps) {
  const [formData, setFormData] = useState({
    date: timeBlock?.date || selectedDate?.toISOString().split('T')[0] || '',
    startTime: timeBlock?.startTime || '09:00',
    endTime: timeBlock?.endTime || '10:00',
    type: timeBlock?.type || 'available',
    title: timeBlock?.title || '',
    description: timeBlock?.description || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const blockTypes = [
    {
      value: 'available',
      label: 'Available',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      description: 'Open for client bookings'
    },
    {
      value: 'break',
      label: 'Break',
      icon: AlertCircle,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      description: 'Not available for bookings'
    },
    {
      value: 'unavailable',
      label: 'Unavailable',
      icon: XCircle,
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400',
      description: 'Blocked time period'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const timeBlockData = {
      ...formData,
      id: timeBlock?.id || Date.now().toString(),
      createdAt: timeBlock?.createdAt || new Date().toISOString()
    };

    onSubmit(timeBlockData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      type: 'available',
      title: '',
      description: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {timeBlock ? 'Edit Time Block' : 'New Time Block'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your availability or block time
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
            )}
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </div>
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startTime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.endTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </div>
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endTime}</p>
              )}
            </div>
          </div>

          {/* Block Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Block Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {blockTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('type', type.value)}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                      formData.type === type.value
                        ? `${type.color} border-current`
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mb-1" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Morning Availability, Lunch Break"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Add any additional details about this time block..."
            />
          </div>

          {/* Duration Display */}
          {formData.startTime && formData.endTime && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Duration: {(() => {
                  const start = new Date(`2000-01-01T${formData.startTime}`);
                  const end = new Date(`2000-01-01T${formData.endTime}`);
                  const diffMs = end.getTime() - start.getTime();
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                  
                  if (diffHours > 0) {
                    return `${diffHours}h ${diffMinutes}m`;
                  }
                  return `${diffMinutes}m`;
                })()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span>{timeBlock ? 'Update' : 'Create'} Time Block</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 