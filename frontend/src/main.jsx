import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SLpzo1DV0dupiazXeeG9POpmCKqMCL8YcsVNC1GFXPkkESuDe93XENQvkpOyJT0dR6NSt3k9eWXIDHNLSUxqKTJ00JvkdXmIR");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);