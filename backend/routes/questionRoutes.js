import express from "express";
import { askBeyController } from "../controllers/openaiController";

const router = express.Router();

router.post("/ask-bey", askBeyController);

export default router;
