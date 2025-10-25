import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: () => void;
  selectedDate: Date | null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onEventAdded, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setStartTime(format(selectedDate, "yyyy-MM-dd'T'HH:mm"));
      setEndTime(format(selectedDate, "yyyy-MM-dd'T'HH:mm"));
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, startTime, endTime }),
    });
    onEventAdded();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Create Event</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
              <input type="datetime-local" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
              <input type="datetime-local" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </form>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
            Close
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
