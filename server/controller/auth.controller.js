import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../modals/user.modal.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);

    const newuser = new User({ username, email, password: hashedpassword });
    await newuser.save();

    res.status(200).json({
      message: "User created successfully",
    });
  } catch (e) {
    next(e); //?
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({
      email,
    });

    if (!userExist) return next(errorHandler(404, "Wrong credentials"));

    const validPassword = bcryptjs.compareSync(password, userExist.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = userExist._doc;

    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (e) {
    next(e);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
      const { password, ...rest } = userExist._doc;

      res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatedPassword, 10);

      const newuser = new User({
        username,
        email,
        password: hashedpassword,
        avatar: photo || "", // Default to an empty string if photo is not provided
      });

      await newuser.save(); // Ensure the user is saved to the database

      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newuser._doc;

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
