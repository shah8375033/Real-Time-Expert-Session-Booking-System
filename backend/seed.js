const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Expert = require("./models/Expert");

const seedExperts = async () => {
  try {
    await connectDB();

    await Expert.deleteMany();

    const experts = [
      {
        name: "Rahul Sharma",
        category: "Web Development",
        experience: 5,
        rating: 4.5,
        availableSlots: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      },
      {
        name: "Priya Verma",
        category: "Data Science",
        experience: 4,
        rating: 4.7,
        availableSlots: ["9:00 AM", "1:00 PM", "3:00 PM"],
      },
      {
        name: "Amit Patel",
        category: "Mobile Development",
        experience: 6,
        rating: 4.8,
        availableSlots: ["11:30 AM", "2:30 PM", "5:00 PM"],
      },
      {
        name: "Sneha Iyer",
        category: "UI/UX Design",
        experience: 3,
        rating: 4.3,
        availableSlots: ["10:30 AM", "12:00 PM", "3:30 PM"],
      },
      {
        name: "Arjun Mehta",
        category: "DevOps",
        experience: 7,
        rating: 4.9,
        availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
      },
    ];

    await Expert.insertMany(experts);
    console.log("Expert data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedExperts();
