import express from "express";
import {
  countByCity,
  countByType,
  createProperties,
  deleteProperties,
  getPropCategory,
  // getPropertiesByTitle,
  getProperties,
  getPropertiesBySlug,
  getpropertiess,
  updateProperties,
} from "../controllers/properties.js";
import Properties from "../models/Properties.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createProperties);

//UPDATE
router.put("/:id", updateProperties);
//DELETE
router.delete("/:id", deleteProperties);
//GET

router.get("/find/:id", getProperties);
router.get("/find-by-slug/:slug", getPropertiesBySlug); // Add this route

//GET
// router.get("/find/:title", getProperties);

router.get("/finds/:categories", getPropCategory);
//GET ALL

router.get("/", getpropertiess);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
