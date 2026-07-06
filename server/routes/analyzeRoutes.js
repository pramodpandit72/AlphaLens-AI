import { Router } from 'express';
import { analyzeCompany } from '../controllers/analyzeController.js';
import { validateAnalyzeRequest } from '../middleware/validateRequest.js';

const router = Router();

/**
 * POST /api/analyze
 * Analyzes a company and returns investment recommendation
 */
router.post('/analyze', validateAnalyzeRequest, analyzeCompany);

export default router;
