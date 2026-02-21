import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { io } from "socket.io-client";

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const data = await api.getExpertById(id);
        setExpert(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpert();

    const socket = io("http://localhost:5000");

    socket.on("slotBooked", (booking) => {
  if (booking.expertId === id) {
    setExpert((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        availableSlots: prev.availableSlots.filter(
          (slot) => slot !== booking.timeSlot
        ),
      };
    });
  }
});

    return () => socket.disconnect();
  }, [id]);

  if (!expert) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{expert.name}</h2>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: ⭐ {expert.rating}</p>

      <h3>Available Slots</h3>

{expert.availableSlots?.length === 0 ? (
  <p style={{ color: "red" }}>No slots available</p>
) : (
  <ul>
  {expert.availableSlots?.map((slot, index) => {
    const isBooked = !expert.availableSlots.includes(slot);

    return (
      <li key={index} style={{ marginBottom: "10px" }}>
        {slot}

        <button
          disabled={isBooked}
          style={{
            marginLeft: "10px",
            padding: "4px 8px",
            cursor: isBooked ? "not-allowed" : "pointer",
            backgroundColor: isBooked ? "#ccc" : "#4CAF50",
            color: isBooked ? "#666" : "white",
            border: "none",
            borderRadius: "4px",
          }}
          onClick={() =>
            navigate(`/book/${expert._id}`, {
              state: { timeSlot: slot },
            })
          }
        >
          {isBooked ? "Booked" : "Book"}
        </button>
      </li>
    );
  })}
</ul>
)}
    </div>
  );
};

export default ExpertDetail;