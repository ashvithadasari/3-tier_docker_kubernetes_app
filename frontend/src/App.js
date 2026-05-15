import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const TOTAL_TABLES = 50;

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    time: "",
    people: "",
    date: ""
  });

  const [message, setMessage] = useState("");

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      const res = await fetch("/api/reservations");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- SUBMIT ----------------
  const submit = async () => {
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      setMessage(result.message);

      fetchData();
    } catch (err) {
      setMessage("Booking failed");
    }
  };

  // ---------------- CALCULATE AVAILABLE TABLES ----------------
  const bookedTables = data.length;
  const availableTables = TOTAL_TABLES - bookedTables;

  return (
    <div className="container">

      {/* TITLE */}
      <h1 className="title">Ashu Restaurant 🍽️</h1>

      {/* TAGLINE */}
      <h3 className="tagline">“Eat good, feel good”</h3>

      {/* ADDRESS */}
      <p className="address">
        Opposite JNTU, Kukatpally, Hyderabad
      </p>

      {/* TABLE STATUS */}
      <div className="table-info">
        <h2>Total Tables: 50</h2>
        <h3>Available Tables: {availableTables}</h3>
      </div>

      {/* IMAGE */}
      <img
        className="banner"
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        alt="restaurant"
      />

      {/* BOOKING */}
      <div className="booking-box">
        <h2>Reserve Your Table</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          placeholder="Time"
          onChange={(e) =>
            setForm({ ...form, time: e.target.value })
          }
        />

        <input
          placeholder="People"
          onChange={(e) =>
            setForm({ ...form, people: e.target.value })
          }
        />

        <button onClick={submit}>Book Table</button>

        <p>{message}</p>
      </div>

      {/* MENU SCROLL */}
      <div className="scrolling-menu">
        <marquee behavior="scroll" direction="left">
          🍛 Biryani &nbsp;&nbsp; 🍕 Pizza &nbsp;&nbsp; 🍔 Burger &nbsp;&nbsp;
          🍦 Ice Cream &nbsp;&nbsp; 🍝 Pasta &nbsp;&nbsp; 🥗 Salad &nbsp;&nbsp;
          🍗 Chicken Fry &nbsp;&nbsp; 🥪 Sandwich &nbsp;&nbsp;
          🍩 Donuts &nbsp;&nbsp; 🥤 Mocktails
        </marquee>
      </div>

      {/* RESERVATIONS */}
      <div className="reservations">
        <h2>Reservations</h2>

        {data.length === 0 ? (
          <p>No reservations yet</p>
        ) : (
          data.map((r, i) => (
            <div key={i} className="reservation-card">
              <p><b>Name:</b> {r.name}</p>
              <p><b>Date:</b> {r.date}</p>
              <p><b>Time:</b> {r.time}</p>
              <p><b>People:</b> {r.people}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
