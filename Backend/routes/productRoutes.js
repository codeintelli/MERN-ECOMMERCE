import express from "express";
let productRoutes = express.Router();
import { productController, reviewController } from "../controller";
import { isAuthenticatedUser, authorizationRoles } from "../middleware/auth";

// Product Routes
productRoutes.get("/product", productController.AllProduct);
productRoutes.post(
  "/product",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  productController.AddProduct
);
productRoutes.put(
  "/product/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  productController.EditProduct
);
productRoutes.delete(
  "/product/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  productController.RemoveProduct
);

productRoutes.get("/product/:id", productController.SpecificProduct);
productRoutes.get(
  "/admin/product",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  productController.AdminAllProducts
);

productRoutes.put(
  "/review",
  isAuthenticatedUser,
  reviewController.CreateProductReview
);
productRoutes.get("/review", reviewController.GetProductReview);
productRoutes.delete(
  "/review",
  isAuthenticatedUser,
  reviewController.DeleteProductReview
);

export default productRoutes;
