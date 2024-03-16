import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import catchAsyncError from "../utils/catchAsyncError.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

export const signup = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  res.status(201).json("User created successfully!");
});

export const signin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) return next(new AppError("User not found!", 404));

  const validPassword = bcrypt.compareSync(password, validUser.password);
  if (!validPassword) return next(new AppError("Wrong credentials!", 401));

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: pass, ...restUserInfo } = validUser._doc; //destructure password to send response without password to client-side
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(restUserInfo);
});
