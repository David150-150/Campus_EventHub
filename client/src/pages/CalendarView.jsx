import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isSameDay } from "date-fns";
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
    <div key={`empty-${index}`} className="p-2 bg-white ring-4 ring-background"></div>
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

  const formatEventTime = (date, time) => {
    try {
      // Handle potential missing or invalid time
      if (!time) return '';
      
      // Ensure time is in HH:mm format
      const [hours, minutes] = time.split(':');
      const eventDateTime = new Date(date);
      eventDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      
      return format(eventDateTime, "HH:mm");
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading calendar...</div>;
  }

  return (
    <div className="p-4 md:mx-16">
      <div className="rounded p-2">
        <div className="flex items-center mb-4 justify-center gap-6">
          <button 
            className="primary" 
            onClick={() => setCurrentMonth(prev => addMonths(prev, -1))}
          >
            <BsCaretLeftFill className="w-auto h-5" />
          </button>
          <span className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button 
            className="primary" 
            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
          >
            <BsFillCaretRightFill className="w-auto h-5"/>
          </button>
        </div>

        <div className="grid grid-cols-7 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="calendar-header">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {emptyCells.concat(
            daysInMonth.map(date => {
              const dayEvents = getEventsForDay(date);
              return (
                <div 
                  key={date.toISOString()} 
                  className="calendar-day"
                >
                  <div className="font-bold">{format(date, "d")}</div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map(event => (
                      <Link 
                        key={event.id}
                        to={`/event/${event.id}`}
                        className="block"
                      >
                        <div className="calendar-event">
                          {formatEventTime(event.date, event.time)} {event.time ? '- ' : ''}{event.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
