import { areIntervalsOverlapping, endOfDay, format, getHours, getMinutes, isSameDay, setHours, startOfDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Event } from '../page';

interface DayCalendarProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (day: Date) => void;
  onEventClick: (event: Event) => void;
}

const DayCalendar: React.FC<DayCalendarProps> = ({ currentDate, events, onDayClick, onEventClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const top = getHours(currentTime) * 3 + getMinutes(currentTime) / 20;

  const eventsForDay = events
    .filter((event) =>
      areIntervalsOverlapping(
        { start: startOfDay(currentDate), end: endOfDay(currentDate) },
        { start: new Date(event.startTime), end: new Date(event.endTime) }
      )
    )
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

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
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b cursor-pointer"
              onClick={() => onDayClick(setHours(currentDate, hour))}
            ></div>
          ))}
          {eventsForDay.map((event, index) => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);

            // Calculate top position
            let top = 0;
            if (isSameDay(eventStart, currentDate)) {
              top = eventStart.getHours() * 3 + eventStart.getMinutes() / 20;
            }

            // Determine effective start and end times for height calculation
            const startForHeight = isSameDay(eventStart, currentDate) 
              ? eventStart 
              : startOfDay(currentDate);

            // For events extending beyond current day, clamp to end of day (midnight next day)
            let endForHeight = eventEnd;
            if (!isSameDay(eventEnd, currentDate)) {
              // Set to start of next day (midnight) instead of endOfDay (23:59:59.999)
              const nextDay = new Date(currentDate);
              nextDay.setDate(nextDay.getDate() + 1);
              endForHeight = startOfDay(nextDay);
            }

            // Calculate height in rem (3rem per hour)
            const durationMinutes = (endForHeight.getTime() - startForHeight.getTime()) / 1000 / 60;
            const height = (durationMinutes / 60) * 3;

            return (
              <div
                key={event.id}
                className="absolute p-1 mx-1 text-xs text-white bg-blue-500 rounded-md cursor-pointer"
                style={{
                  top: `${top}rem`,
                  height: `${height}rem`,
                  zIndex: index,
                  marginLeft: `${index * 8}%`,
                  width: `calc(90% - ${index * 5}%)`,
                  boxShadow: "-4px 19px 21px 5px rgba(0,0,0,0.14)"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
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
