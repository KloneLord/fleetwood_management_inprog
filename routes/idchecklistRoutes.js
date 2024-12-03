import express from 'express';
import { generateAndSaveID } from '../../controllers/idchecklistController.js';

const router = express.Router();

// Route to generate and save unique IDs
router.post('/generate', generateAndSaveID);

export default router;
