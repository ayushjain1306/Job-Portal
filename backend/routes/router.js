import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import employerAuth from "../middleware/employerAuth.js";
import { login, logout, signup } from "../controllers/user/accountController.js";
import { adminLogin, adminLogout, changeAdminCredentials, getAdminAccountDetails } from "../controllers/admin/accountController.js";
import { addAdminSubscriptions, deleteAdminSubscriptions, getAdminSubscriptions } from "../controllers/admin/subscriptions.js";
import { getAdminJobs, updateAdminJobs } from "../controllers/admin/jobs.js";
import { getEmployerDetails, login as employerLogin, logout as employerLogout, registration as employerRegistration } from "../controllers/employer/accountController.js";
import { addEmployerJob, changeJobStatus, getEmployerJobs } from "../controllers/employer/jobsController.js";
import { addSkill, deleteSkill, getSkills } from "../controllers/admin/skills.js";
import { getSubsriptionPlans, payment } from "../controllers/employer/paymentsController.js";
import { getAllPayments } from "../controllers/admin/paymentsController.js";
import { getDashboardData, getSalesData, getTopSellingSubscriptions, getYears } from "../controllers/admin/dashboardController.js";

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
router.put('/admin-change-credentials', adminAuth, changeAdminCredentials);
router.get('/admin-get-subscriptions', adminAuth, getAdminSubscriptions);
router.post('/admin-add-subscription', adminAuth, addAdminSubscriptions);
router.delete('/admin-delete-subscription', adminAuth, deleteAdminSubscriptions);
router.get('/admin-get-all-jobs', adminAuth, getAdminJobs);
router.put('/admin-update-job-status', adminAuth, updateAdminJobs);
router.get('/admin-get-all-skills', adminAuth, getSkills);
router.post('/admin-add-skill', adminAuth, addSkill);
router.delete('/admin-delete-skill', adminAuth, deleteSkill);
router.get('/admin-get-all-payments', adminAuth, getAllPayments);
router.get('/admin-get-years', adminAuth, getYears);
router.get('/admin-get-sales-data', adminAuth, getSalesData);
router.get('/admin-get-top-selling-subscriptions', adminAuth, getTopSellingSubscriptions);
router.get('/admin-get-dashboard-data', adminAuth, getDashboardData);

// Employer Routes
router.post('/employer-login', employerLogin);
router.post('/employer-registration', employerRegistration);
router.delete('/employer-login', employerAuth, employerLogout);
router.get("/employer-get-details", employerAuth, getEmployerDetails);
router.get("/employer-get-all-jobs", employerAuth, getEmployerJobs);
router.post("/employer-add-job", employerAuth, addEmployerJob);
router.put("/employer-change-job-status", employerAuth, changeJobStatus);
router.get("/employer-get-all-subscription-plans", employerAuth, getSubsriptionPlans);
router.post('/employer-purchase-subscription', employerAuth, payment);

export default router;