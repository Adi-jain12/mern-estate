import Listing from "../models/listing.model.js";
import AppError from "../utils/appError.js";
import catchAsyncError from "../utils/catchAsyncError.js";

export const createListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.create(req.body); // create method to store multiple documents

  return res.status(201).json(listing);
});

export const deleteListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new AppError("Listing not found!", 404));
  }
  if (req.user.id !== listing.userRef) {
    return next(new AppError("No permission to delete the listing!", 401));
  }

  await Listing.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Listing has been deleted!" });
});

export const editListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (req.user.id !== listing.userRef) {
    return next(new AppError("No permission to edit the listing!"));
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedListing);
});
