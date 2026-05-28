// App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";

const foodItems = [
  {
    name: "Hyderabadi Biryani",
    image:
      "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gongura Chicken",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pesarattu",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pulihora",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Kodi Vepudu",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Gutti Vankaya",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ragi Sangati",
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Royyala Iguru",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ulavacharu",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Bobbatlu",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
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

  const totalTables = 150;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBooking = () => {
    if (bookedTables < totalTables) {
      setBookedTables(bookedTables + 1);
      alert("Table booked successfully!");
    }
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h1>🍽️ Telugu Italiano Kitchen</h1>
        <p>{currentTime}</p>
      </header>

      {/* BOOKING SECTION */}
      <div className="booking-container">
        <input type="text" placeholder="Your Name" />
        <input type="date" />
        <input type="time" />
        <input type="number" placeholder="Members" />

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
              <img src={food.image} alt={food.name} />
              <h4>{food.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
