const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});
// Payment routes
const paymentRoutes = require("./routes/paymentRoutes");

// Make io accessible in controllers
app.set("io", io);

// Routes
app.use("/experts", require("./routes/expertRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running with Socket.io on port ${PORT}`)
);
