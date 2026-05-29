// App.jsx

import React, { useEffect, useState } from "react";
import "./style.css";

const foodItems = [
  {
    name: "Hyderabadi Biryani",
    image:
      "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gongura Chicken",
    image:
      "https://www.indianrecipeinfo.com/wp-content/uploads/2021/06/Gongura-Chicken.jpg",
  },
  {
    name: "Pulihora",
    image:
      "https://th.bing.com/th/id/OIP.hy20fKqP8kR_GysRfIniWQHaE7",
  },
  {
    name: "Kodi Vepudu",
    image:
      "https://th.bing.com/th/id/OIP.fKL1ly_iFTtvh-gzxOL3mwHaFU",
  },
  {
    name: "Gutti Vankaya",
    image:
      "https://th.bing.com/th/id/OIP.Jau5-qzSDgwkiCvR4jOfEgHaEK",
  },
  {
    name: "Ragi Sangati",
    image:
      "https://th.bing.com/th/id/OIP.UmGtro7R3Hz-kwmkayK3-AHaE8",
  },
  {
    name: "Royyala Iguru",
    image:
      "https://th.bing.com/th/id/OIP.ZHpI91qW86CEpKirD6Dn2wHaFh",
  },
  {
    name: "Ulavacharu",
    image:
      "https://th.bing.com/th/id/OIP.POLObaU6vQKIfXiIEMPV8gHaFL",
  },
  {
    name: "Pizza Margherita",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Alfredo Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Lasagna",
    image:
      "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Bruschetta",
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Risotto",
    image:
      "https://images.unsplash.com/photo-1633436375795-12b3b339712f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ravioli",
    image:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Garlic Bread",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tiramisu",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gnocchi",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Spaghetti Carbonara",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function App() {
  const [bookedTables, setBookedTables] = useState(78);
const [currentTime, setCurrentTime] = useState("");

const [name, setName] = useState("");
const [members, setMembers] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");

  const totalTables = 150;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

const handleBooking = () => {
  if (!name || !date || !time || !members) {
    alert("Please fill all details");
    return;
  }

  if (bookedTables < totalTables) {
    setBookedTables((prev) => prev + 1);

    alert(
      `Table booked for ${name} on ${date} at ${time}`
    );

    setName("");
    setDate("");
    setTime("");
    setMembers("");
  }
};

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h1>🍽️ Ashu's Kitchen</h1>
        <p>{currentTime}</p>
      </header>

      {/* BOOKING SECTION */}
      <div className="booking-container">
        <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
        <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
        <input
  type="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
/>
        <input
  type="number"
  placeholder="Members"
  value={members}
  onChange={(e) => setMembers(e.target.value)}
/>
        <button
          onClick={handleBooking}
          disabled={bookedTables >= totalTables}
        >
          {bookedTables >= totalTables
            ? "All Tables Booked"
            : "Book Table"}
        </button>
      </div>

      {/* TABLE STATUS */}
      <div className="table-status">
        <h2>
          Tables Booked: {bookedTables} / {totalTables}
        </h2>

        <h3>Tables Available: {totalTables - bookedTables}</h3>
      </div>

      {/* FOOD CAROUSEL */}
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...foodItems, ...foodItems].map((food, index) => (
            <div className="food-card" key={index}>
              <img
                src={food.image}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <h4>{food.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
