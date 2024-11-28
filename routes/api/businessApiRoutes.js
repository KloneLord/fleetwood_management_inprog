import express from 'express';
import { registerBusiness } from '../../controllers/businessController.js';

const router = express.Router();

// Route for registering a business
router.post('/register', registerBusiness);

export default router;
