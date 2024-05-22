import express from "express";
import { createSchool, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/school", createSchool);
router.post("/login", login);

export default router;
