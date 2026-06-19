import express from "express";
import multer from "multer";

import { signUp, logIn } from "../controllers/userController.js";
import { getAllApartments, getApartmentAndReviews, addReview, addComment } from "../controllers/apartmentController.js";
import { uploadImage } from "../controllers/cloudinaryController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// User POST Endpoints
router.post("/auth/signup", signUp);
router.post("/auth/login", logIn);

// Apartment GET Endpoints
router.get("/apartments", auth, getAllApartments);
router.get("/apartment/:id", auth, getApartmentAndReviews);

// Apartment POST Endpoints
router.post("/apartments/:id/review", auth, addReview);
router.post("/reviews/:id/comment", auth, addComment);

// Image POST Endpoint
router.post("/upload", auth, upload.single("image"), uploadImage);

export default router;