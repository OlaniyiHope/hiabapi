import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getsingleCategory,
} from "../controllers/Category.js";

const router = express.Router();

//CREATE
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

router.get("/", getCategory);
router.get("/find/:id", getsingleCategory);

export default router;
