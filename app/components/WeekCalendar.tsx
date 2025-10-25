import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import React from 'react';
import { Event } from '../page';

interface WeekCalendarProps {
  currentDate: Date;
  events: Event[];
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ currentDate, events }) => {
  const firstDayOfWeek = startOfWeek(currentDate);
  const lastDayOfWeek = endOfWeek(currentDate);

  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  return (
    <div className="flex flex-col flex-grow">
      <div className="grid grid-cols-7 text-center bg-gray-200">
        {daysInWeek.map((day) => (
          <div key={day.toString()} className="py-2 border-r">
            <div>{format(day, 'EEE')}</div>
            <div className="text-2xl font-bold">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      <div className="grid flex-grow grid-cols-7 bg-gray-200">
        {daysInWeek.map((day) => (
          <div key={day.toString()} className="border-r bg-white">
            <div className="flex-grow overflow-y-auto">
              {events
                .filter((event) => format(new Date(event.startTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                .map((event) => (
                  <div key={event.id} className="p-1 mt-1 ml-1 text-xs text-white bg-blue-500 rounded-md">
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
