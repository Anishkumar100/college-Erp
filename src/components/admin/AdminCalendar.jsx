import React, { useState, useEffect } from 'react';

export const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // ✅ Backend: Load events on component mount
  useEffect(() => {
    // Replace with your backend GET call
    // Example using fetch:
    /*
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
    */
  }, []);

  const handleDateClick = (date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    setSelectedDate(dateStr);
  };

  const addEvent = () => {
    if (selectedDate && newEvent.trim()) {
      const updated = [...events, { date: selectedDate, title: newEvent }];
      setEvents(updated);
      setNewEvent('');

      // ✅ Backend: Save new event
      /*
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, title: newEvent })
      });
      */
    }
  };

  const removeEvent = (date, title) => {
    const updated = events.filter((e) => !(e.date === date && e.title === title));
    setEvents(updated);

    // ✅ Backend: Delete event
    /*
    fetch('/api/events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, title })
    });
    */
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const blanks = Array(startDay).fill(null);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateStr = date.toLocaleDateString('en-CA');
      const dayEvents = events.filter((e) => e.date === dateStr);

      days.push(
        <div
          key={i}
          onClick={() => handleDateClick(date)}
          className={`flex flex-col p-2 border rounded cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 
    ${selectedDate === dateStr
              ? 'bg-indigo-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
            }`}
        >
          <div className="font-bold mb-1">{i}</div>
          <ul className="text-xs space-y-0.5 max-h-20 overflow-y-auto">
            {dayEvents.map((e, idx) => (
              <li key={idx} className="truncate">{e.title}</li>
            ))}
          </ul>
        </div>

      );
    }

    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, idx) => (
              <option key={idx} value={idx}>
                {new Date(0, idx).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded px-2 py-1"
          >
            {Array.from({ length: 10 }, (_, idx) => {
              const year = new Date().getFullYear() - 5 + idx;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {blanks.map((_, i) => <div key={`blank-${i}`} />)}
          {days}
        </div>
      </>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-gray-700 rounded-lg p-4">
      {renderCalendar()}

      {selectedDate && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Add Event for {selectedDate}</h4>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-2"
            placeholder="Event title..."
          />
          <button
            onClick={addEvent}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Event
          </button>

          <ul className="mt-2 space-y-1 text-sm">
            {events
              .filter((e) => e.date === selectedDate)
              .map((e, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {e.title}
                  <button
                    onClick={() => removeEvent(e.date, e.title)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
