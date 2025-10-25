import { areIntervalsOverlapping, eachDayOfInterval, endOfDay, endOfWeek, format, startOfDay, startOfWeek } from 'date-fns';
import React from 'react';
import { Event } from '../page';

interface WeekCalendarProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (day: Date) => void;
  onEventClick: (event: Event) => void;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ currentDate, events, onDayClick, onEventClick }) => {
  const firstDayOfWeek = startOfWeek(currentDate);
  const lastDayOfWeek = endOfWeek(currentDate);

  const daysInWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  return (
    <div className="flex flex-col flex-grow h-screen">
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
          <div key={day.toString()} className="border-r bg-white cursor-pointer" onClick={() => onDayClick(day)}>
            <div className="flex-grow overflow-y-auto">
              {events
                .filter((event) =>
                  areIntervalsOverlapping(
                    { start: startOfDay(day), end: endOfDay(day) },
                    { start: new Date(event.startTime), end: new Date(event.endTime) }
                  )
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-1 mt-1 ml-1 text-xs text-white bg-blue-500 rounded-md cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
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
