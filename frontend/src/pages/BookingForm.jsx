import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";

const BookingForm = () => {
  const { id: expertId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
   name: loggedUser?.name || "",
  email: loggedUser?.email || "",
  phone: "",
  date: "",
  timeSlot: location.state?.timeSlot || "",
  notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Send booking data to payment page
  navigate("/payment", {
    state: {
      expertId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      timeSlot: form.timeSlot,
      notes: form.notes,
    },
  });
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Session</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          value={form.email}
          disabled
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="timeSlot"
          placeholder="Time Slot (e.g. 10:00 AM)"
          value={form.timeSlot}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
