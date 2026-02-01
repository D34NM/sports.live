'use client';

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
      <Button
        variant="secondary"
        size="md"
        onClick={goToPreviousDay}
        aria-label="Previous day"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex-1 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {formatDate(selectedDate)}
          </div>
        </div>
        {!isToday() && (
          <button
            onClick={goToToday}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Jump to Today
          </button>
        )}
      </div>

      <Button
        variant="secondary"
        size="md"
        onClick={goToNextDay}
        aria-label="Next day"
        className="flex items-center gap-2"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
