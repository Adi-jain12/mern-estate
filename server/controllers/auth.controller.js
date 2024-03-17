import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import catchAsyncError from "../utils/catchAsyncError.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

export const signUp = catchAsyncError(async (req, res, next) => {
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

export const signIn = catchAsyncError(async (req, res, next) => {
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

export const google = catchAsyncError(async (req, res, next) => {
  const { name, email, photo } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...restUserInfo } = user._doc;

    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(restUserInfo);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8); // Generate Random Password for google login because password is required in schema
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4), // creating random username by joining display name coming from google login as username is unique in schema
      email,
      password: hashedPassword,
      avatar: photo,
    });
    await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...restUserInfo } = user._doc;

    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(restUserInfo);
    w;
  }
});

export const signOut = catchAsyncError(async (req, res, next) => {
  res.clearCookie("access_token");

  res.status(200).json("User has been logged out!");
});
