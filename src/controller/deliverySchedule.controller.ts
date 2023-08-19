
import { Request, Response } from 'express';
import { deliverySchedule } from '../types.js';
import { getDeliveryDates } from '../utils.js';


export const generateDeliverySchedule = (req: Request, res: Response) => {
  const { postalCode, products } = req.body;

  const result = getDeliveryDates(postalCode, products);

  const response: deliverySchedule = {
    status: true,
    message: 'View available delivery schedule generated',
    deliverySchedule: result,
  };

  return res.status(200).json(response);
}