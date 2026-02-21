import React, { useState } from "react";
import { api } from "../services/api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const MyBookings = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (location.state?.success) {
      alert("Booking Confirmed 🎉");
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await api.getBookingsByEmail(email);
      setBookings(data);
    } catch (err) {
      alert(err.message);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h2>My Bookings</h2>
  <button onClick={handleLogout}>Logout</button>
</div>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={fetchBookings}>Get Bookings</button>

      <div style={{ marginTop: "20px" }}>
        {bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.timeSlot}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
