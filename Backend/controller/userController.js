import { userModel } from "../models";
import { ErrorHandler, sendToken, sendEmail } from "../utils";
import { FRONTEND_URL } from "../config";
import crypto from "crypto";
import cloudinary from "cloudinary";
const userController = {
  async registerUser(req, res, next) {
    try {
      // console.log(req.body);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "eComUserProfile",
        width: 150,
        crop: "scale",
      });

      const { name, email, password } = req.body;

      const user = await userModel.create({
        name: req.body.name.trim(),
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      // console.log(user);
      sendToken(user, 201, res);
    } catch (error) {
      // console.log(error);
      return next(new ErrorHandler(error, 500));
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }
      const user = await userModel
        .findOne({ email: email })
        .select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid Email and password", 400));
      }
      const isPasswordMatched = await user.comparePassword(password);
      // console.log(isPasswordMatched);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email and password", 400));
      }
      const token = user.getJWTToken();
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  },

  async logout(req, res, next) {
    try {
      // console.log("req for logout taken");
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      // console.log("req for logout approve");
      res.status(200).json({
        success: true,
        message: "Successfully Logout",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  },
  async forgotPassword(req, res, next) {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is:- ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it\n\n `;

    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  },

  async resetPassword(req, res, next) {
    try {
      // console.log(req.params.token);
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
      // console.log(`reset password token: ${resetPasswordToken}`);
      const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return next(
          new ErrorHandler(
            "Reset password token is Invalid or has been expired",
            404
          )
        );
      }

      if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      sendToken(user, 200, res);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // if authenticated
  async getUserDetails(req, res, next) {
    try {
      // console.log("getuserdetail entry point");
      const user = await userModel.findById(req.user.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // if authenticated - admin
  async getAllUserDetails(req, res, next) {
    const user = await userModel.find();
    res.status(200).json({ success: true, user });
  },
  // if authenticated
  async updatePassword(req, res, next) {
    try {
      const user = await userModel.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password Is Incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Doesn't match", 400));
      }
      user.password = req.body.newPassword;
      await user.save();
      sendToken(user, 200, res);
      res.status(200).json({ success: true, user });
    } catch (error) {
      return new ErrorHandler(error, 500);
    }
  },
  // get single user - admin
  async getSingleUser(req, res, next) {
    try {
      const user = await userModel.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return new ErrorHandler(error, 500);
    }
  },
  async updateUserRole(req, res, next) {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

      // console.log(newUserData);
      await userModel.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return new ErrorHandler(error, 500);
    }
  },

  async updateUserDetails(req, res, next) {
    // console.log("entry point reach");
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
      // console.log("entry point reach2");
      if (req.body.avatar !== "") {
        const user = await userModel.findById(req.user.id);

        // console.log("entry point reach5");
        const imageId = user.avatar.public_id;
        // console.log("entry point reach4");

        await cloudinary.v2.uploader.destroy(imageId);
        // console.log("entry point reach6");

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
        // console.log("entry point reach3");

        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
        // console.log("entry point reach7");
      }

      // console.log("entry point reach8");
      const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      // console.log("entry point reach9");
      res.status(200).json({
        success: true,
      });

      next();
    } catch (error) {
      return new ErrorHandler(error, 500);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
      }

      await user.remove();

      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error) {
      return new ErrorHandler(error, 500);
    }
  },
};

export default userController;
