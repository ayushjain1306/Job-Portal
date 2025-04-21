import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import employerAuth from "../middleware/employerAuth.js";
import { login, logout, signup } from "../controllers/user/accountController.js";
import { adminLogin, adminLogout, changeAdminCredentials, getAdminAccountDetails } from "../controllers/admin/accountController.js";
import { addAdminSubscriptions, deleteAdminSubscriptions, getAdminSubscriptions } from "../controllers/admin/subscriptions.js";
import { getAdminJobs, updateAdminJobs } from "../controllers/admin/jobs.js";

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Hello from Server.");
})

// User Routes
router.post('/user-login', login);
router.post('/user-signup', signup);
router.delete('/user-logout', userAuth, logout);
router.put('/admin-change-credentials', adminAuth, changeAdminCredentials);
router.get('/admin-get-subscriptions', adminAuth, getAdminSubscriptions);
router.post('/admin-add-subscription', adminAuth, addAdminSubscriptions);
router.delete('/admin-delete-subscription', adminAuth, deleteAdminSubscriptions);
router.get('/admin-get-all-jobs', adminAuth, getAdminJobs);
router.put('/admin-update-job-status', adminAuth, updateAdminJobs);

// Admin Routes
router.get('/admin-get-account-details', adminAuth, getAdminAccountDetails);
router.post('/admin-login', adminLogin);
router.delete('/admin-logout', adminAuth, adminLogout);


// Employer Routes


export default router;