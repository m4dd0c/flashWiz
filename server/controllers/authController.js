import { log } from "console";
import { Auth } from "../Models/Auth.js";
import { Card } from "../Models/Card.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsync } from "../utils/catchAsyncError.js";
import { genOTP } from "../utils/genOTP.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
// login endpoint controller
export const login = catchAsync(async (req, res, next) => {
  console.log("insiders");
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler(404, "fill all fields"));
  const user = await Auth.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(401, "email/password isn't valid!"));
  const ideal = await user.comparePass(password);
  if (!ideal) return next(new ErrorHandler(401, "email/password isn't valid!"));
  sendToken(res, user, 200, "login successful");
});

// signup endpoint controller
export const signup = catchAsync(async (req, res, next) => {
  // console.log('in sider');
  const { name, email, password } = req.body;
  const file = req.files.avatar || null;
  console.log(file);
  if (!name || !email || !password || !file)
    return next(new ErrorHandler(404, "fill all fields"));
  const ideal = await Auth.findOne({ email });
  if (ideal)
    return next(
      new ErrorHandler(401, "Email Already associated with another account!")
    );
  const otp = genOTP();

  const html = `
  <!DOCTYPE html>
  <html>
      <head>
          <meta name='viewport' content="width=device-width initial-scale=1.0">
          <title>${otp} OTP - Verify Account | FlashCard</title>
      </head>
      <body>
          <div>
              <p>Confirm It's you: </p>
              <h5>${otp}</h5>
          </div>
          <h3>Verify Your Account within 10 minutes otherwise Your Account will be Deleted.</h3>
          <p><strong>Note: </strong>Please Don't share these OTP with anyone you don't believe.</p>
      </body>
  </html>`;

  const mail = sendMail(
    email,
    `${otp} OTP - Verify Your Account | FlashCard`,
    html
  );
  if (!mail)
    return next(
      new ErrorHandler(
        500,
        "Can't Create Account at the Moment.\nTry Again After Sometime"
      )
    );
  //uploading avatar file to cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "StudyCard",
  });
  //deleting local avatar file from temp folder
  fs.rmSync("./tmp", { recursive: true });
  const user = await Auth.create({
    name,
    email,
    password,
    verificationOTP: otp,
    verificationOTPExpire: new Date(
      Date.now() + Number(process.env.OTP_EXP) * 60 * 1000
    ),
    verification: false,
    avatar: {
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
    },
  });
  sendToken(res, user, 201, "signup successful\nPlease Verify your Account");
});

//change password endpoint controller
export const changePassword = catchAsync(async (req, res, next) => {
  const { currPass, newPass } = req.body;
  if (!currPass || !newPass)
    return next(new ErrorHandler(404, "fill all fields"));
  const userId = req.id;
  if (!userId)
    return next(new ErrorHandler(404, "Unauthorized Access, Login Again!"));
  const user = await Auth.findById(userId).select("+password");
  if (!user)
    return next(new ErrorHandler(401, "Unauthorized Access, Login Again!"));
  const ideal = await user.comparePass(currPass);
  if (!ideal)
    return next(
      new ErrorHandler(401, "You've Entered wrong Current Password!")
    );
  user.password = newPass;
  await user.save();
  res.status(200).json({ success: true, msg: "Password Changed" });
});

// logout
export const logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .cookie("token", null, cookieOptions)
    .json({ success: true, msg: "Logout Successful" });
});

// verify
export const verify = catchAsync(async (req, res, next) => {
  console.log('inthere');
  const { otp } = req.body;
  const userId = req.id;
  if (!userId)
  return next(new ErrorHandler(404, "Unauthorized Access, Login Again!"));
const user = await Auth.findById(userId);
if (!user)
return next(new ErrorHandler(401, "Unauthorized Access, Login Again!"));
console.log('inthere 1');
const ideal = await Auth.findOne({
  _id: userId,
  verificationOTP: otp,
  verificationOTPExpire: { $gt: Date.now() },
});
if (!ideal)
return next(
  new ErrorHandler(401, "You've Entered either Invalid or Expired OTP")
  );

  user.verificationOTP = null;
  user.verificationOTPExpire = null;
  user.verification = true;
  console.log('inthere 2');
  await user.save();
  res
  .status(200)
  .json({ success: true, msg: "Account Verification Successful" });
  console.log('inthere 3');
});
//editprofile
export const editProfile = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const file = req.files || null;
  const userId = req.id;
  if (!userId)
    return next(new ErrorHandler(404, "Unauthorized Access, Login Again!"));
  const ideal = await Auth.findById(userId);
  if (!ideal)
    return next(
      new ErrorHandler(401, "Email already associated with another account!")
    );
  if (file) {
    //deleting old file from cloudinary
    await cloudinary.v2.uploader.destroy(ideal.avatar.public_id);
    //storing new file
    const myCloud = await cloudinary.v2.uploader.upload(
      file.avatar.tempFilePath,
      {
        folder: "StudyCard",
      }
    );
    //deleting new file locally
    fs.rmSync("./tmp", { recursive: true });
    ideal.avatar.url = myCloud.secure_url;
    ideal.avatar.public_id = myCloud.public_id;
  }
  if (name) ideal.name = name;
  await ideal.save();
  res.status(200).json({ success: true, msg: "profile updated" });
});
//forget password
export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new ErrorHandler(404, "Provide an Email to Proceed further!"));
  const user = await Auth.findOne({ email });
  if (!user)
    return next(new ErrorHandler(401, "Unauthorized Access, Login Again!"));
  //gen reset otp
  const otp = genOTP();
  //sending mail

  const html = `
  <!DOCTYPE html>
  <html>
      <head>
          <meta name='viewport' content="width=device-width initial-scale=1.0">
          <title>${otp} OTP - Reset Password | FlashCard</title>
      </head>
      <body>
          <div>
              <p>Your Reset Password OTP: </p>
              <h5>${otp}</h5>
          </div>
          <p><strong>Note: </strong>Please Don't share these OTP with anyone otherwise your flashcard account can be compromised<br/>If You havent requested for Reset Password OTP<br/>You can Ignore this message.</p>
          <p><strong>Note: </strong>This OTP is valid for 10 minutes only.</p>
      </body>
  </html>`;

  const mail = sendMail(email, `${otp} OTP - Reset Password | FlashCard`, html);
  if (!mail)
    return next(
      new ErrorHandler(
        500,
        "Can't Send Reset OTP at the Moment.\nTry Again After Sometime"
      )
    );
  user.resetOTP = otp;
  user.resetOTPExpire = new Date(
    Date.now() + Number(process.env.OTP_EXP) * 60 * 1000
  );
  await user.save();
  res.status(200).json({ success: true, msg: "Mail Sent!" });
});

//reset Password
export const resetPassword = catchAsync(async (req, res, next) => {
  const { otp, newPass } = req.body;
  if (!otp || !newPass) return next(new ErrorHandler(404, "fill all fields"));
  const user = await Auth.findOne({
    resetOTP: otp,
    resetOTPExpire: { $gt: Date.now() },
  }).select("+password");
  if (!user)
    return next(
      new ErrorHandler(404, "You've Entered either Invalid or Expired OTP")
    );
  user.password = newPass;
  user.resetOTP = null;
  user.resetOTPExpire = null;
  await user.save();
  res.status(200).json({ success: true, msg: "Password Changed!" });
});

// get user
export const loadUser = catchAsync(async (req, res, next) => {
  const uid = req.id;
  if (!uid)
    return next(new ErrorHandler(401, "Unauthorized Access, Login Again!"));
  const user = await Auth.findById(uid);
  if (!user)
    return next(new ErrorHandler(401, "Unauthorized Access, Login Again!"));
  const userInfo = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    verification: user.verification,
    createdAt: user.createdAt,
  };
  res.status(200).json({ success: true, user: userInfo });
});

//delete profile
export const deleteProfile = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler(404, "fill all fields"));
  const user = await Auth.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(401, "email/password isnt valid!"));
  const ideal = await user.comparePass(password);
  if (!ideal) return next(new ErrorHandler(401, "email/password isnt valid!"));
  //deleting avatar from cloud
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.deleteOne();
  //delete all cards
  const cards = await Card.find({ userId: user._id });
  cards.forEach((card) => card.deleteOne());
  res.status(200).json({ success: true, msg: "Your Account Deleted!" });
});
// contact admin
export const contact = catchAsync(async (req, res, next) => {
  const { name, email, subject, msg } = req.body;

  const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name='viewport' content="width=device-width initial-scale=1.0">
            <title>FEEDBACK or CONTACT MAIL - FLASHCARD</title>
        </head>
        <body>
            <div>
                <p>A Mail From: </p>
                <br/>
                <h5>${name}</h5>
                <h5>${email}</h5>
            </div>
            <div>
                <p>Subject: </p>
                <h5>${subject}</h5>
            </div>
            <div>
                <p>Feedback or Contact Message: </p>
                <h5>${msg}</h5>
            </div>
        </body>
    </html>`;

  const mail = sendMail(
    process.env.SMTP_MAIL,
    "FEEDBACK or CONTACT MAIL - FLASHCARD",
    html
  );
  if (!mail)
    return next(
      new ErrorHandler(
        401,
        "Can't Send Mail At the Moment\nPlease Try Again after sometime"
      )
    );

  res.status(200).json({ success: true, msg: "mail sent!" });
});