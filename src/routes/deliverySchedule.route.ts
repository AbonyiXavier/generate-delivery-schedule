
import express from "express";
import { validateDataset } from "../validation/validateRequest.js";
import { generateDeliverySchedule } from "../controller/deliverySchedule.controller.js";

const router = express.Router();

// Your routes and middleware go here
router.post('/delivery/schedule', validateDataset, generateDeliverySchedule)

export default router;
