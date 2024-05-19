import Listing from "../modals/listing.modal.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    // if(!listing) res.status

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
