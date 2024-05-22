import { logout, signin, signup, userProfile } from '../controllers/authController.js';
import express from "express"
const router = express.Router();


//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me',  userProfile);

export default router