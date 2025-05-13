
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, addDays, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useState } from 'react';

interface DatePickerProps {
  availableDates: string[];
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

const DatePicker = ({ availableDates, onSelectDate, selectedDate }: DatePickerProps) => {
  const today = new Date();
  
  // Generate next 14 days
  const next14Days = Array.from({ length: 14 }, (_, i) => {
    return addDays(today, i);
  });

  // Filter days that are available
  const availableDaysFormatted = availableDates.map(dateStr => new Date(dateStr));
  
  // Display all dates but disable those not available
  const daysToShow = next14Days.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isAvailable = availableDates.includes(dateStr);
    return {
      date,
      dateStr,
      isAvailable
    };
  });

  // Get day label in Arabic
  const getDayLabel = (date: Date) => {
    if (isToday(date)) return 'اليوم';
    if (isTomorrow(date)) return 'غدًا';
    return format(date, 'EEE', { locale: ar });
  };

  return (
    <div className="overflow-x-auto pb-2 -mx-4 px-4">
      <div className="flex space-x-3 space-x-reverse mt-2">
        {daysToShow.map(({ date, dateStr, isAvailable }) => (
          <div
            key={dateStr}
            onClick={() => isAvailable && onSelectDate(dateStr)}
            className={cn(
              "flex flex-col items-center px-4 py-3 rounded-lg min-w-16 transition-colors",
              selectedDate === dateStr
                ? "bg-medical-500 text-white"
                : isAvailable
                ? "bg-white text-gray-800 border border-gray-200 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60",
              "ml-3" // Add margin to the left for RTL support
            )}
          >
            <span className="text-xs mb-1">
              {getDayLabel(date)}
            </span>
            <span className="text-lg font-bold">
              {format(date, 'd')}
            </span>
            <span className="text-xs">
              {format(date, 'MMM', { locale: ar })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
