import Listing from "../models/listing.model.js";
import catchAsyncError from "../utils/catchAsyncError.js";

export const createListing = catchAsyncError(async (req, res, next) => {
  const listing = await Listing.create(req.body);

  return res.status(201).json(listing);
});
