import express from 'express';
import { getSessionInfo } from '../../controllers/sessionController.js';
import { ensureAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/info', ensureAuthenticated, (req, res, next) => {
    console.log('Received request for /api/sessions/info');
    next(); // Proceed to the controller
}, getSessionInfo);

export default router;
