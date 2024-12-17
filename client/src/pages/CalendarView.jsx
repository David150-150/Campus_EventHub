import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameDay, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("/events");
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div key={`empty-${index}`} className="border border-gray-200 bg-gray-50"></div>
  ));

  const getEventsForDay = (date) => {
    return events.filter(event => {
      try {
        const eventDate = new Date(event.date);
        return isSameDay(eventDate, date);
      } catch (error) {
        console.error(`Invalid date for event: ${event.id}`, error);
        return false;
      }
    });
  };

  const formatEventTime = (time) => {
    try {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Calendar Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-primary">
            Event Calendar
          </h1>
          <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentMonth(prev => addMonths(prev, -1))}
              className="p-2 rounded-full hover:bg-primarylight text-primary transition-colors"
            >
              <BsCaretLeftFill className="w-5 h-5" />
            </button>
            <span className="text-xl font-semibold text-primarydark px-4">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button 
              onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
              className="p-2 rounded-full hover:bg-primarylight text-primary transition-colors"
            >
              <BsFillCaretRightFill className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Days of Week */}
        <div className="grid grid-cols-7 bg-primarylight">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div 
              key={day} 
              className="py-3 text-center text-sm font-bold text-primary border-b border-primary/10"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {emptyCells}
          {daysInMonth.map(date => {
            const dayEvents = getEventsForDay(date);
            const isCurrentDay = isToday(date);

            return (
              <div 
                key={date.toISOString()} 
                className={`min-h-[120px] border border-gray-100 p-2 transition-colors ${
                  isCurrentDay 
                    ? 'bg-primarylight/50 ring-1 ring-primary/20' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  isCurrentDay ? 'text-primary' : 'text-gray-700'
                }`}>
                  {format(date, "d")}
                </div>
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <Link 
                      key={event.id}
                      to={`/event/${event.id}`}
                      className="block group"
                    >
                      <div className="text-xs p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <div className="font-semibold text-primary">
                          {formatEventTime(event.time)}
                        </div>
                        <div className="truncate text-primarydark group-hover:text-primary transition-colors">
                          {event.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-lg font-bold text-primary mb-3">Legend</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primarylight/50 rounded border border-primary/20"></div>
            <span className="text-sm text-gray-600">Current Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/10 rounded"></div>
            <span className="text-sm text-gray-600">Event</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/20 rounded"></div>
            <span className="text-sm text-gray-600">Event (Hover)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
