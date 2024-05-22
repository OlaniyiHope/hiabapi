import express from "express";
import { registeration } from "../controllers/hiabController.js";

const router = express.Router();

router.post("/registration", registeration);

export default router;
