import express from "express";

import { createSchool } from "../controllers/School.js";

const router = express.Router();

router.post("/registerschool", createSchool);

export default router;
