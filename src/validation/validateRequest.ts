import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateDataset = [
  check('postalCode').isInt({ min: 10000, max: 99999 }).withMessage('Postal code must be a valid 5-digit number'),
  check('products').isArray().withMessage('Products must be an array'),
  check('products.*.productId').isInt({ min: 1 }).withMessage('Product ID must be a positive integer'),
  check('products.*.name').notEmpty().withMessage('Product name is required'),
  check('products.*.deliveryDays').isArray({ min: 1 }).withMessage('At least one delivery day is required'),
  check('products.*.productType').isIn(['normal', 'external', 'temporary']).withMessage('Invalid product type'),
  check('products.*.daysInAdvance').isInt({ min: 0 }).withMessage('Days in advance must be a non-negative integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
