'use client';

import { add, sub } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import DayCalendar from './components/DayCalendar';
import EventModal from './components/EventModal';
import Header from './components/Header';
import WeekCalendar from './components/WeekCalendar';

export interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export type View = 'month' | 'week' | 'day';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState<View>('month');
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNextMonth = () => {
    setCurrentDate(add(currentDate, { months: 1 }));
  };

  const handlePrevMonth = () => {
    setCurrentDate(sub(currentDate, { months: 1 }));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleEventAdded = () => {
    fetchEvents();
  };

  const handleEventUpdated = () => {
    fetchEvents();
  };

  const handleEventDeleted = () => {
    fetchEvents();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        currentDate={currentDate}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          {view === 'month' && <Calendar currentDate={currentDate} onDayClick={handleDayClick} onEventClick={handleEventClick} events={events} />}
          {view === 'week' && <WeekCalendar currentDate={currentDate} events={events} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
          {view === 'day' && <DayCalendar currentDate={currentDate} events={events} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
        </div>
      )}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEventAdded={handleEventAdded}
        onEventUpdated={handleEventUpdated}
        onEventDeleted={handleEventDeleted}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}

