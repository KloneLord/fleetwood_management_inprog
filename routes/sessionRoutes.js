import express from 'express';
import { getSessionInfo } from '../controllers/sessionController.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define the route to retrieve session info
router.get(
    '/info',
    ensureAuthenticated, // Middleware to ensure user is authenticated
    (req, res, next) => {
        console.log('Received request for /api/sessions/info');
        next(); // Proceed to the controller
    },
    getSessionInfo // Controller to handle the response
);

export default router;
