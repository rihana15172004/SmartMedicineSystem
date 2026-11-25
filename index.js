const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const medicineRoutes = require("./routes/medicine");
const prescriptionRoutes = require("./routes/prescription");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// Medicine Routes
app.use("/api/medicine", medicineRoutes);

// Prescription Routes
app.use("/api/prescription", prescriptionRoutes);

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/smartMedicineDB")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Medicine System Backend is Running"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});