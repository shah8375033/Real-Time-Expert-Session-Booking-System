import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertsList from "./pages/ExpertsList";
import ExpertDetail from "./pages/ExpertDetail";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SLpzo1DV0dupiazXeeG9POpmCKqMCL8YcsVNC1GFXPkkESuDe93XENQvkpOyJT0dR6NSt3k9eWXIDHNLSUxqKTJ00JvkdXmIR");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpertsList />} />

        {/* FIXED plural route */}
        <Route path="/experts/:id" element={<ExpertDetail />} />

        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;