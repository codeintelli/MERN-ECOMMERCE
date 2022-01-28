import { JWT_SECRET } from "../config";
import { userModel } from "../models";
import { ErrorHandler } from "../utils";
import jwt from "jsonwebtoken";

const isAuthenticatedUser = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;

    if (!authToken) {
      console.log("token not found");
      return next(
        new ErrorHandler("Please Login to access this resources", 401)
      );
    }

    const token = authToken.split(" ")[1];
    if (token === "undefined") {
      return new ErrorHandler("Please Login to access this resources", 401);
    }
    const decodeData = jwt.verify(token, JWT_SECRET);
    req.user = await userModel.findById(decodeData.id);
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 401));
  }
};

const authorizationRoles = (...roles) => {
  return (req, res, next) => {
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
