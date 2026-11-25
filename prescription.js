const express = require("express");
const Prescription = require("../models/Prescription");

const router = express.Router();

// Add Prescription
router.post("/add", async (req, res) => {
    try {
        const {
            userId,
            doctorName,
            prescriptionDate,
            notes
        } = req.body;

        const prescription = new Prescription({
            userId,
            doctorName,
            prescriptionDate,
            notes
        });

        await prescription.save();

        res.status(201).json({
            message: "Prescription added successfully",
            prescription
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add prescription",
            error: error.message
        });
    }
});

// Get Prescriptions
router.get("/:userId", async (req, res) => {
    try {
        const prescriptions = await Prescription.find({
            userId: req.params.userId
        });

        res.json(prescriptions);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get prescriptions",
            error: error.message
        });
    }
});

module.exports = router;