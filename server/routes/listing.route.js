import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/getlistings", verifyToken, getListings);
export default router;
