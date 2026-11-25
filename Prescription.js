const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    doctorName: {
        type: String,
        required: true
    },

    prescriptionDate: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);