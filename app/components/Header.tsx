import { format } from 'date-fns';
import React from 'react';
import { View } from '../page';

interface HeaderProps {
  currentDate: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onToday: () => void;
  view: View;
  onViewChange: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentDate, onNextMonth, onPrevMonth, onToday, view, onViewChange }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button onClick={onToday} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
          Today
        </button>
        <button onClick={onPrevMonth} className="ml-4 px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
          &lt;
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <button onClick={onNextMonth} className="ml-4 px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
          &gt;
        </button>
      </div>
      <div className="flex items-center rounded-md shadow-sm">
        <button
          type="button"
          className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${view === 'month' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => onViewChange('month')}
        >
          Month
        </button>
        <button
          type="button"
          className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${view === 'week' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => onViewChange('week')}
        >
          Week
        </button>
        <button
          type="button"
          className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${view === 'day' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => onViewChange('day')}
        >
          Day
        </button>
      </div>
    </header>
  );
};

export default Header;
