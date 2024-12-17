import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";
import RsvpButton from '../components/RsvpButton';
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpCounts, setRsvpCounts] = useState({ attending: 0, unavailable: 0 });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/event/${id}`);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (id) {
      axios.get(`/event/${id}/rsvps`)
        .then((response) => {
          const counts = response.data.reduce((acc, rsvp) => {
            acc[rsvp.status.toLowerCase()] = (acc[rsvp.status.toLowerCase()] || 0) + 1;
            return acc;
          }, {});
          setRsvpCounts(counts);
        })
        .catch((err) => {
          console.error("Error fetching RSVPs:", err);
        });
    }
  }, [id]);

  //! Copy Functionalities
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(linkToShare);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await axios.delete(`/event/${event.id}`);
      toast.success("Event deleted successfully");
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(error.response?.data?.error || "Failed to delete event");
    }
  };

  if (!event) return <div>Loading event details...</div>;

  return (
    <div className="flex flex-col mx-5 xl:mx-32 md:mx-10 mt-5 flex-grow">
      {event.image && (
        <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
          <img
            src={`${axios.defaults.baseURL}${event.imageUrl}`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-between mt-8 mx-2">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          {event.title?.toUpperCase()}
        </h1>
      </div>

      <div className="mx-2 mt-5 text-md md:text-lg">
        {event.description}
      </div>

      <div className="mx-2 mt-5 text-md md:text-xl font-bold text-primarydark">
        Organized By: {event.organizedBy || "Unknown"}
      </div>

      <div className="mx-2 mt-5 text-md md:text-lg">
        <span className="font-semibold">Category: </span>
        {event.category?.replace('_', ' ').toLowerCase()}
      </div>

      <div className="mx-2 mt-5">
        <h1 className="text-md md:text-xl font-extrabold">When and Where</h1>
        <div className="sm:mx-5 lg:mx-32 mt-6 flex flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <AiFillCalendar className="w-auto h-5 text-primarydark" />
            <div className="flex flex-col gap-1">
              <h1 className="text-md md:text-lg font-extrabold">
                Date and Time
              </h1>
              <div className="text-sm md:text-lg">
                Date: {event.date || "N/A"} <br />
                Time: {event.time || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MdLocationPin className="w-auto h-5 text-primarydark" />
            <div className="flex flex-col gap-1">
              <h1 className="text-md md:text-lg font-extrabold">Location</h1>
              <div className="text-sm md:text-lg">{event.location || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-5 text-md md:text-xl font-extrabold">
        Share with friends
        <div className="mt-10 flex gap-5 mx-10 md:mx-32">
          <button onClick={handleCopyLink}>
            <FaCopy className="w-auto h-6" />
          </button>

          <button onClick={handleWhatsAppShare}>
            <FaWhatsappSquare className="w-auto h-6" />
          </button>

          <button onClick={handleFacebookShare}>
            <FaFacebook className="w-auto h-6" />
          </button>
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="mx-2 mt-5">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Delete Event
          </button>
        </div>
      )}

      <div className="mx-2 mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Event Attendance</h2>
        <div className="flex gap-8 mb-4">
          <div className="text-center">
            <span className="text-2xl font-bold text-green-600">
              {rsvpCounts.attending || 0}
            </span>
            <p className="text-sm text-gray-600">Attending</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-red-600">
              {rsvpCounts.unavailable || 0}
            </span>
            <p className="text-sm text-gray-600">Unavailable</p>
          </div>
        </div>
        <RsvpButton eventId={event.id} />
      </div>
    </div>
  );
}