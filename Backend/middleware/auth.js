import { JWT_SECRET } from "../config";
import { userModel } from "../models";
import { ErrorHandler } from "../utils";
import jwt from "jsonwebtoken";

const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }
  // console.log(`Authentication Token`, token);
  const decodeData = jwt.verify(token, JWT_SECRET);
  // console.log(decodeData);
  req.user = await userModel.findById(decodeData.id);
  next();
};

const authorizationRoles = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user.role, roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resources`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticatedUser, authorizationRoles };
