import { format, getHours, getMinutes } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Event } from '../page';

interface DayCalendarProps {
  currentDate: Date;
  events: Event[];
}

const DayCalendar: React.FC<DayCalendarProps> = ({ currentDate, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const top = getHours(currentTime) * 3 + getMinutes(currentTime) / 20;

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center justify-center py-2 bg-gray-200">
        <div className="text-2xl font-bold">{format(currentDate, 'EEE, MMM d')}</div>
      </div>
      <div className="flex flex-grow">
        <div className="w-16 text-center bg-gray-100">
          {hours.map((hour) => (
            <div key={hour} className="h-12 border-b border-r">{`${hour}:00`}</div>
          ))}
        </div>
        <div className="relative flex-grow bg-white">
          <div
            className="absolute left-0 right-0 h-px bg-red-500"
            style={{ top: `${top}rem` }}
          >
            <div className="absolute w-2 h-2 -ml-1 bg-red-500 rounded-full -left-1"></div>
          </div>
          {events
            .filter((event) => format(new Date(event.startTime), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd'))
            .map((event) => {
              const start = new Date(event.startTime);
              const end = new Date(event.endTime);
              const eventTop = start.getHours() * 3 + start.getMinutes() / 20;
              const height = (end.getTime() - start.getTime()) / 1000 / 60 / 20 * 3;
              return (
                <div
                  key={event.id}
                  className="absolute left-0 right-0 p-1 mx-1 text-xs text-white bg-blue-500 rounded-md"
                  style={{ top: `${eventTop}rem`, height: `${height}rem` }}
                >
                  {event.title}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DayCalendar;
