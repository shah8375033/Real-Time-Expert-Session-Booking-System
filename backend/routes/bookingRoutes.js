const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} = require("../controllers/bookingController");

// Create booking
router.post("/", createBooking);

// Get bookings by email
router.get("/", getBookingsByEmail);

// Update booking status
router.patch("/:id/status", updateBookingStatus);

module.exports = router;