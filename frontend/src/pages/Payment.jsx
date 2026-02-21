import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // Booking data passed from BookingForm
  const { expertId, timeSlot, name, email } = location.state || {};

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    // ❗ Prevent payment if booking data missing
    if (!expertId || !timeSlot || !name || !email) {
      alert("Missing booking details. Please book again.");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create PaymentIntent from backend
      const res = await fetch("http://localhost:5000/api/payment/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }),
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) throw new Error("Failed to get client secret");

      // 2️⃣ Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ If payment success → create booking
      if (paymentIntent.status === "succeeded") {
        await api.createBooking({
          expertId,
          timeSlot,
          name,
          email,
          status: "Confirmed",
        });

        // 🎉 Success UX
        navigate("/my-bookings", { state: { success: true } });
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Pay ₹500</h2>

      <div
        style={{
          border: "1px solid #555",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
          background: "#111",
        }}
      >
        <CardElement />
      </div>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing Payment..." : "Pay & Confirm Booking"}
      </button>
    </div>
  );
};

export default Payment;