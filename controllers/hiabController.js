import Register from "../models/Hiab.js";

export const registeration = async (req, res, next) => {
  try {
    const {
      fullName,

      email,

      phone,
      companyAddress,
      companyName,
      message,
    } = req.body;

    const newUser = new Register({
      fullName,

      email,

      phone,
      companyAddress,
      companyName,
      message,
    });

    console.log("New User Data:", newUser);

    await newUser.save();
    console.log("User has been registered successfully!");
    res.status(200).send("User has been created.");
  } catch (err) {
    console.error("Registration failed:", err);
    next(err);
  }
};
