import { validationResult } from 'express-validator';
import { ApiError } from '../utils/apierror.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const extractedErrors = [];
    errors.array().forEach((err) => extractedErrors.push({ [err.path]: err.msg }));

    return next(new ApiError(422, 'Validation Error', extractedErrors));
};