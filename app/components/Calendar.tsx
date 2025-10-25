import React from 'react';
import {
  areIntervalsOverlapping,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Event } from '../page';

interface CalendarProps {
  currentDate: Date;
  onDayClick: (day: Date) => void;
  onEventClick: (event: Event) => void;
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, onDayClick, onEventClick, events }) => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth);

  const daysInCalendar = eachDayOfInterval({
    start: firstDayOfCalendar,
    end: lastDayOfCalendar,
  });

  return (
    <div className="flex-grow p-4 bg-gray-50">
      <div className="grid grid-cols-7 gap-px text-center bg-gray-200">
        <div className="py-2">Sun</div>
        <div className="py-2">Mon</div>
        <div className="py-2">Tue</div>
        <div className="py-2">Wed</div>
        <div className="py-2">Thu</div>
        <div className="py-2">Fri</div>
        <div className="py-2">Sat</div>
      </div>
      <div className="grid flex-grow grid-cols-7 grid-rows-6 gap-px bg-gray-200">
        {daysInCalendar.map((day) => (
          <div
            key={day.toString()}
            className={`relative flex flex-col h-28 cursor-pointer ${isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-100'}`}
            onClick={() => onDayClick(day)}
          >
            <div
              className={`text-sm font-medium p-1 ${isToday(day) ? 'bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center' : 'text-gray-800'}`}>
              {format(day, 'd')}
            </div>
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
                    className="p-1 text-xs text-white bg-blue-500 rounded-md cursor-pointer"
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

export default Calendar;
