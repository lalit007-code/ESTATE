import Listing from "../modals/listing.modal.js";
import User from "../modals/user.modal.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.json({
    message: "iiiii",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
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
      { new: true } // for setting and always getting new info from db
    );

    //new line apart from learning
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    new error();
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listing"));
  }
};
