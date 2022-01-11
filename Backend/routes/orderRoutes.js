import express from "express";
let orderRoutes = express.Router();
import { orderController } from "../controller";
import { isAuthenticatedUser, authorizationRoles } from "../middleware/auth";
orderRoutes.post("/order", isAuthenticatedUser, orderController.createNewOrder);
orderRoutes.get(
  "/order",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  orderController.GetAllOrder
);
orderRoutes.get(
  "/order/:id",
  isAuthenticatedUser,
  orderController.GetSingleOrder
);
orderRoutes.get(
  "/user/order",
  isAuthenticatedUser,
  orderController.GetLoginUserOrder
);
orderRoutes.put(
  "/order/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  orderController.UpdateOrderStatus
);
orderRoutes.delete(
  "/order/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  orderController.DeleteOrder
);

export default orderRoutes;
