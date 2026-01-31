'use client';

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
    <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <Button
        variant="secondary"
        size="sm"
        onClick={goToPreviousDay}
        aria-label="Previous day"
      >
        ←
      </Button>

      <div className="flex-1 text-center">
        <div className="text-lg font-semibold">{formatDate(selectedDate)}</div>
        {!isToday() && (
          <button
            onClick={goToToday}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go to Today
          </button>
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={goToNextDay}
        aria-label="Next day"
      >
        →
      </Button>
    </div>
  );
}
