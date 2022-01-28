import express from "express";
let paymentRoutes = express.Router();
import { paymentController } from "../controller";
import { isAuthenticatedUser } from "../middleware/auth";

paymentRoutes.post(
  "/payment/process",
  isAuthenticatedUser,
  paymentController.processPayment
);

paymentRoutes.get(
  "/stripeapikey",
  isAuthenticatedUser,
  paymentController.sendStripeAPIKey
);
export default paymentRoutes;
