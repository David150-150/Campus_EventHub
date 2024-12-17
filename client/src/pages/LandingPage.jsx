import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-Width Background Image Section */}
      <div
        className="w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('event.jpg')" }} // Add your image path here
      ></div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-20 px-10 text-center"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }} // Add your hero image path
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            WELCOME TO OUR UNIQUE EVENT HUB
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            DISCOVER, THE SEAMILESS OF CREATING RSVP, SMOOTH EVENT.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/events">
              <button className="px-6 py-3 bg-black text-white-700 font-bold rounded-lg hover:bg-blue-200 transition duration-300">
                Browse Events
              </button>
            </Link>
            <Link to="/createEvent">
              <button className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-blue-200 transition duration-300">
                Create Event
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-navy-100 py-16 px-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          Why Choose Us
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              title: "Event Calendar",
              img: "/assets/calendar-icon.png",
              description: "Stay organized with an intuitive calendar view of all events.",
              bgColor: "bg-black opacity-50",  // Black background with 50% opacity
            },
            {
              title: "Quick RSVP",
              img: "/assets/rsvp-icon.png",
              description: "Join events instantly and manage your participation seamlessly.",
              bgColor: "bg-black opacity-50",  // Black background with 50% opacity
            },
            {
              title: "Admin Features",
              img: "/assets/admin-tools-icon.png",
              description: "Admins can create, manage, and oversee events effortlessly.",
              bgColor: "bg-black opacity-50",  // Black background with 50% opacity
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center max-w-xs text-center p-4 rounded-lg shadow hover:shadow-lg transition duration-300 ${feature.bgColor}`}
            >
              <img src={feature.img} alt={feature.title} className="w-24 mb-4" />
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16 px-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          What Our Users Are Saying.
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { quote: "This platform has revolutionized how we connect and engage with events on campus!", author: "Kofi Ankamah" },
            { quote: "A game-changer for managing campus events effortlessly and staying connected!", author: "Bishop Bobo" },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700">{`"${testimonial.quote}"`}</p>
              <p className="mt-4 text-green-700 font-bold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8 text-center">
        <nav className="flex justify-center gap-6">
          {["Events", "Create Event", "Calendar", "Login"].map((link, index) => (
            <Link
              key={index}
              to={`/${link.toLowerCase().replace(" ", "")}`}
              className="hover:underline hover:text-gray-300 transition duration-300"
            >
              {link}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Campus Event Management Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
