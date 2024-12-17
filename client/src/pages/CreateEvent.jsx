import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizedBy: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
  });

  // Use useEffect for navigation and checks
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please login to create events");
        navigate("/login");
      } else if (user.role !== "admin") {
        toast.error("Only administrators can create events");
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create events");
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      toast.error("Only administrators can create events");
      navigate("/");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("organizer", formData.organizedBy);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("location", formData.location);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post("/createEvent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      if (response.data.event) {
        toast.success("Event created successfully!");
        navigate("/events");
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        navigate("/login");
      } else if (error.response?.status === 403) {
        toast.error("Admin access required");
        navigate("/");
      } else {
        console.error("Error creating event:", error);
        toast.error(error.response?.data?.error || "Failed to create event");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex flex-col ml-20 mt-10">
      <div>
        <h1 className="font-bold text-[36px] mb-5">Post an Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col">
          Title:
          <input
            type="text"
            name="title"
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none w-80"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Organized By:
          <input
            type="text"
            name="organizedBy"
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none w-80"
            value={formData.organizedBy}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            className="rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-24 border-none w-80"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Event Date:
          <input
            type="date"
            name="date"
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none w-80"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Event Time:
          <input
            type="time"
            name="time"
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none w-80"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Location:
          <input
            type="text"
            name="location"
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none w-80"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-10 border-none w-80"
            required
          >
            <option value="">Select a category</option>
            <option value="CLUB_ACTIVITY">Club Activity</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="SEMINAR">Seminar</option>
          </select>
        </label>

        <label className="flex flex-col">
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            className="rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-12 border-none w-80"
            onChange={handleImageUpload}
          />
        </label>

        <button className="primary w-80" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
}
