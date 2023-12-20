import express from "express";
import { UserModel } from "../models/UserModel";
import { authenticateUser } from "../middleware/authenticateUser";
const router = express.Router();

router.get("/user/media", authenticateUser, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, response: "User not found" });
        }

        const { imagePaths, filmPaths } = user;

        res.status(200).json({ success: true, response: { imagePaths, filmPaths } });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

export default router;
