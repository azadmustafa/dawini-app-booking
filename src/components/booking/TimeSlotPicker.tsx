
import { cn } from '@/lib/utils';
import { timeSlots } from '@/data/mockData';
import { useState } from 'react';

interface TimeSlotPickerProps {
  onSelectTime: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotPicker = ({ onSelectTime, selectedTime }: TimeSlotPickerProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {timeSlots.map(time => (
        <div
          key={time}
          onClick={() => onSelectTime(time)}
          className={cn(
            "py-3 px-2 rounded-lg text-center text-sm transition-colors cursor-pointer",
            selectedTime === time
              ? "bg-medical-500 text-white"
              : "bg-white border border-gray-200 hover:border-medical-300"
          )}
        >
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
