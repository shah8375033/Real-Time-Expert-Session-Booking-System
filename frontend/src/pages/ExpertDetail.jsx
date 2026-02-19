import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { io } from "socket.io-client";
const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
  fetchExpert();

  const socket = io("http://localhost:5000");

  socket.on("slotBooked", (booking) => {
    if (booking.expertId === id) {
      setExpert((prev) => ({
        ...prev,
        availableSlots: prev.availableSlots.filter(
          (slot) => slot !== booking.timeSlot
        ),
      }));
    }
  });

  return () => socket.disconnect();
}, []);


  const fetchExpert = async () => {
    try {
      const data = await api.getExpertById(id);
      setExpert(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!expert) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{expert.name}</h2>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: ⭐ {expert.rating}</p>

      <h3>Available Slots</h3>
      <ul>
        {expert.availableSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>

      <button
        onClick={() => navigate(`/book/${expert._id}`)}
        style={{ marginTop: "20px", padding: "8px 12px" }}
      >
        Book This Expert
      </button>
    </div>
  );
};

export default ExpertDetail;
