const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// Add Medicine
router.post("/add", async (req, res) => {
    try {
        const {
            userId,
            medicineName,
            dosage,
            time,
            instructions
        } = req.body;

        const medicine = new Medicine({
            userId,
            medicineName,
            dosage,
            time,
            instructions
        });

        await medicine.save();

        res.status(201).json({
            message: "Medicine added successfully",
            medicine
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add medicine",
            error: error.message
        });
    }
});

// Get Medicines
router.get("/:userId", async (req, res) => {
    try {
        const medicines = await Medicine.find({
            userId: req.params.userId
        });

        res.json(medicines);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get medicines",
            error: error.message
        });
    }
});

// Update Medicine
router.put("/:id", async (req, res) => {
    try {
        const {
            medicineName,
            dosage,
            time,
            instructions
        } = req.body;

        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            {
                medicineName,
                dosage,
                time,
                instructions
            },
            { new: true }
        );

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        res.json({
            message: "Medicine updated successfully",
            medicine
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update medicine",
            error: error.message
        });
    }
});

// Delete Medicine
router.delete("/:id", async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);

        res.json({
            message: "Medicine deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete medicine",
            error: error.message
        });
    }
});

module.exports = router;