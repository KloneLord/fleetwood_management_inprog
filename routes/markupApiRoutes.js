import express from 'express';
import { addMarkup, listMarkups, deleteMarkup } from '../../controllers/markUpController.js';

const router = express.Router();

router.get('/', listMarkups); // Pass licenseNumber in query params
router.post('/', addMarkup); // Include licenseNumber in request body
router.delete('/:id', deleteMarkup);

export default router;
