import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import employerAuth from "../middleware/employerAuth.js";
import { login, logout, signup } from "../controllers/user/accountController.js";
import { adminLogin, adminLogout, getAdminAccountDetails } from "../controllers/admin/accountController.js";

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Hello from Server.");
})

// User Routes
router.post('/user-login', login);
router.post('/user-signup', signup);
router.delete('/user-logout', userAuth, logout);

// Admin Routes
router.get('/admin-get-account-details', adminAuth, getAdminAccountDetails);
router.post('/admin-login', adminLogin);
router.delete('/admin-logout', adminAuth, adminLogout);

// Employer Routes


export default router;