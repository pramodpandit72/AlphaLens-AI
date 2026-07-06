import { AppError } from './errorHandler.js';

/**
 * Validates the /api/analyze request body
 * Ensures a company name is provided and is a valid string
 */
export const validateAnalyzeRequest = (req, res, next) => {
  const { company } = req.body;

  if (!company) {
    throw new AppError('Company name is required', 400);
  }

  if (typeof company !== 'string') {
    throw new AppError('Company name must be a string', 400);
  }

  const trimmed = company.trim();
  if (trimmed.length === 0) {
    throw new AppError('Company name cannot be empty', 400);
  }

  if (trimmed.length > 100) {
    throw new AppError('Company name is too long (max 100 characters)', 400);
  }

  // Sanitize — store trimmed version
  req.body.company = trimmed;
  next();
};
