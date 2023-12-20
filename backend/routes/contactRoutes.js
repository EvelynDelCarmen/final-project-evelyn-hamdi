import express from "express";
import { ContactModel } from "../models/ContactModel";
const router = express.Router();

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contactSubmission = new ContactModel({
            name,
            email,
            message,
        });

        await contactSubmission.save();

        // You can also send an email notification to yourself here using a service like Nodemailer

        res.status(201).json({ success: true, response: "Submission received" });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;
