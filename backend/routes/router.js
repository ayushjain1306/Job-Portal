import express from "express";
import { login, logout, signup } from "../controllers/user/accountController.js";

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Hello from Server.");
})

// User Routes
router.post('/user-login', login);
router.post('/user-signup', signup);
router.delete('/user-logout', logout);

// Admin Routes


// Employer Routes


export default router;