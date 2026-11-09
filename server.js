
require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Feedback Schema
const feedbackSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Save feedback
app.post("/api/feedback", async (req, res) => {
    try {
        const { visitorName, email, rating, message } = req.body || {};

        const cleanName = typeof visitorName === "string" ? visitorName.trim() : "";
        const cleanEmail = typeof email === "string" ? email.trim() : "";
        const cleanMessage = typeof message === "string" ? message.trim() : "";
        const numericRating = Number(rating);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            cleanName.length < 2 ||
            cleanName.length > 60 ||
            !emailPattern.test(cleanEmail) ||
            cleanEmail.length > 120 ||
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5 ||
            cleanMessage.length < 5 ||
            cleanMessage.length > 1000
        ) {
            return res.status(400).json({
                error: "Please enter valid feedback details."
            });
        }

        await Feedback.create({
            visitorName: cleanName,
            email: cleanEmail,
            rating: numericRating,
            message: cleanMessage
        });

        res.status(201).json({
            message: "Thank you! Your feedback has been submitted."
        });

    } catch (error) {
        console.error("Feedback save error:", error);

        res.status(500).json({
            error: "Unable to save feedback."
        });
    }
});

// Test server
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        application: "Student Portfolio Management System"
    });
});

// Connect MongoDB
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/studentPortfolioDB"
)
.then(() => {
    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
        console.log(`Website running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});
