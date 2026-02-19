const Booking = require("../models/Booking");

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // Emit real-time event
    const io = req.app.get("io");
    io.emit("slotBooked", booking);

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: "Slot already booked" });
  }
};


// GET /bookings?email=
exports.getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.query.email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
