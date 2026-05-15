import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [form, setForm] = useState({ name: "", time: "", people: "" });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://backend-service:5000/reservations");
    setData(await res.json());
  };

  const submit = async () => {
    await fetch("http://backend-service:5000/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    fetchData();
  };

  return (
    <div>
      <h1>Ashu Restaurant 🍽️</h1>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})}/>
      <input placeholder="Time" onChange={(e) => setForm({...form, time: e.target.value})}/>
      <input placeholder="People" onChange={(e) => setForm({...form, people: e.target.value})}/>

      <button onClick={submit}>Book</button>

      <h2>Reservations</h2>
      {data.map((r,i)=>(
        <p key={i}>{r.name} | {r.time} | {r.people}</p>
      ))}
    </div>
  );
}

export default App;