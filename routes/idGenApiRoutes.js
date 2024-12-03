import express from 'express';
import { createUniqueId } from '../../controllers/idGenController.js';

const router = express.Router();

// POST route to generate an ID
router.post('/generate', createUniqueId);

export default router;
