export const sendToken = (res, user, statusCode, msg) => {
  const token = user.genToken();

  const userInfo = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    verification: user.verification,
    createdAt: user.createdAt,
  };

  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.TOKEN_EXP) * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(Number(statusCode))
    .cookie("token", token, cookieOptions)
    .json({ success: true, msg, user:userInfo });
};
