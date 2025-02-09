import User from "../models/User.js";

import School from "../models/School.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const createSchool = async (req, res, next) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      gender,
      nationality,
      email,
      date,
      phone,
      address,
      classes,
      courses,
    } = req.body;

    const newUser = new School({
      firstname,
      middlename,
      lastname,
      gender,
      nationality,
      email,
      date,
      phone,
      address,
      classes,
      courses,
    });

    console.log("New User Data:", newUser);

    await newUser.save();
    console.log("User has been saved successfully!");
    res.status(200).send("User has been created.");
  } catch (err) {
    console.error("Registration failed:", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
