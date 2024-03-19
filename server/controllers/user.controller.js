import AppError from "../utils/appError.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const updateUser = catchAsyncError(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only update your account!", 401));

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...restUserInfo } = updatedUser._doc;

  res.status(200).json(restUserInfo);
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only delete your account!", 401));

  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token");
  res.status(200).json({ message: "User has been deleted!" });
});

export const getUserListings = catchAsyncError(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new AppError("You can only view your own listings!"));
  }

  const listings = await Listing.find({ userRef: req.params.id });
  res.status(200).json(listings);
});
