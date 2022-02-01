import express from "express";
let userRoutes = express.Router();
import { userController } from "../controller";
import { isAuthenticatedUser, authorizationRoles } from "../middleware/auth";

// User userRoutes
userRoutes.post("/Register", userController.registerUser);
userRoutes.post("/Login", userController.login);
userRoutes.post("/password/forgotpassword", userController.forgotPassword);
userRoutes.put("/password/reset/:token", userController.resetPassword);
userRoutes.get("/Logout", userController.logout);

// After Login this url is used for user
userRoutes.get("/profile", isAuthenticatedUser, userController.getUserDetails);
userRoutes.put(
  "/changePassword",
  isAuthenticatedUser,
  userController.updatePassword
);
userRoutes.put(
  "/edit_profile",
  isAuthenticatedUser,
  userController.updateUserDetails
);

// admin
userRoutes.get(
  "/details",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getAllUserDetails
);
userRoutes.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getSingleUser
);
userRoutes.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.updateUserRole
);
userRoutes.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.deleteUser
);
export default userRoutes;
