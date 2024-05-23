import Listing from "../modals/listing.modal.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    // if(!listing) res.status

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(401, "Listing not found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "you can only delete your own listing"));
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deleteListing)
      return next(errorHandler(401, "Error while deleting listing"));

    res.status(200).json("Listing has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
