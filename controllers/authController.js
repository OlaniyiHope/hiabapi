import Users from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const usersExist = await Users.findOne({ email });
  if (usersExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    const users = await Users.create(req.body);
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
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

// export const signin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         //validation
//         if (!email) {
//             return next(new ErrorResponse("please add an email", 403));
//         }
//         if (!password) {
//             return next(new ErrorResponse("please add a password", 403));
//         }

//         //check user email
//         const users = await Users.findOne({ email });
//         if (!users) {
//             return next(new ErrorResponse("invalid credentials", 400));
//         }
//         //check password
//         const isMatched = await users.comparePassword(password);
//         if (!isMatched) {
//             return next(new ErrorResponse("invalid credentials", 400));
//         }

//         sendTokenResponse(users, 200, res);
//     } catch (error) {
//         next(error);
//     }
// }

const sendTokenResponse = async (users, codeStatus, res) => {
  const token = await users.getJwtToken();
  const options = { maxAge: 60 * 60 * 1000, httpOnly: true };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(codeStatus).cookie("token", token, options).json({
    success: true,
    id: users._id,
    role: users.role,
  });
};

//log out
export const logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

//user profile
export const userProfile = async (req, res, next) => {
  const users = await Users.findById(req.users.id).select("-password");
  res.status(200).json({
    success: true,
    users,
  });
};
