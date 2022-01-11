// creating token and saving in cookie
import { COOKIE_EXPIRE } from "../config";
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //   Option for cookie
  const option = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 24 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
