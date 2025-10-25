'use client';

import { useEffect, useState } from 'react';
import Calendar from './components/Calendar';

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
  const [view, setView] = useState<View>('month');

  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };


  return (
    <div className="flex flex-col h-screen">
      {view === 'month' && <Calendar currentDate={currentDate} onDayClick={handleDayClick} events={events} />}
    </div>
  );
}
