import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// FIND BY ID
router.get("/find/:id", getHotel);

// COUNT BY CITY
router.get("/countByCity", countByCity);

// COUNT BY TYPE
router.get("/countByType", countByType);

// GET ALL
router.get("/", getHotels);

// GET BY ID
router.get("/:id", getHotel);

export default router;
