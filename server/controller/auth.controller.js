import User from "../modals/user.modal.js";
import bcryptjs from "bcrypt";

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
