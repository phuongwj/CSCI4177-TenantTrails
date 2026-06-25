import express from "express";
import multer from "multer";

import { signUp, logIn, getMe } from "../controllers/userController.js";
import { getAllApartments, getApartmentAndReviews, addReview, addComment } from "../controllers/apartmentController.js";
import { getUserProfile, updateReview, deleteReview } from "../controllers/profileController.js";
import { uploadImage } from "../controllers/cloudinaryController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// =================================
// User Endpoints
// =================================

router.post("/auth/signup", signUp);
router.post("/auth/login", logIn);
router.get("/auth/me", auth, getMe);

// =================================
// User Profile Endpoints
// =================================

router.get("/profile", auth, getUserProfile);
router.put("/profile/review/:id", auth, updateReview);
router.delete("/profile/review/:id", auth, deleteReview);

// =================================
// Apartment Endpoints
// =================================

router.get("/apartments", auth, getAllApartments);
router.get("/apartment/:id", auth, getApartmentAndReviews);

router.post("/apartments/:id/review", auth, addReview);
router.post("/reviews/:id/comment", auth, addComment);

// =================================
// Image Endpoints
// =================================

router.post("/upload", auth, upload.single("image"), uploadImage);

export default router;