// routes/templateApiRoutes.js
import express from "express";
import { addTemp, listTemp, getTemp } from "../controllers/templateController.js";

const router = express.Router();

router.post("/add", addTemp); // Add new entry
router.get("/list", listTemp); // List all entries
router.get("/:id", getTemp); // View individual entry by ID

export default router;
