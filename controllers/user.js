import Register from "../models/Register.js";

export const register = async (req, res, next) => {
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

    const newUser = new Register({
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
