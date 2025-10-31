
import express from "express";
import { connectDB } from "./config/db.js";
import Students from "./models/booking.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Synergia Event Booking API is running!");
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Students.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/bookings/search", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email query parameter required" });
    }
    const bookings = await Students.find({ email: { $regex: email, $options: "i" } });
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/bookings/filter", async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) {
      return res.status(400).json({ success: false, message: "Event query parameter required" });
    }
    const bookings = await Students.find({ eventName: { $regex: event, $options: "i" } });
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, eventName, eventDate } = req.body;
    if (!name || !email || !eventName || !eventDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newBooking = new Students({ name, email, eventName, eventDate });
    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Students.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Students.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: deletedBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Students.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
