const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const crypto = require("crypto");

const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Faculty = require("../models/facultyModel");
const Admin = require("../models/adminModel");
const Parent = require("../models/parentModel");

// CookieOptions
const cookieOptions = {
  httpOnly: true,
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
};

// Sign the token
const signToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create the Token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  res.cookie("jwt", token, cookieOptions);
  res.cookie("user", user, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// UserType
exports.loginUserType = catchAsync(async (req, res) => {
  const users = ["STUDENT", "FACULTY", "ADMIN", "PARENT"];
  const userLoginType = req.body.type;

  if (!users.includes(userLoginType)) {
    return next(new AppError("Invalid User Type", 400));
  }

  res.cookie("userLoginType", userLoginType, cookieOptions);
  res.status(200).json({ status: "success" });
});

// Sign Up User
exports.signup = catchAsync(async (req, res) => {
  if (req.cookies.userLoginType) {
    req.body.type = req.cookies.userLoginType;
  }
  // 1.) Create new user based on req.body
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    type: req.body.type,
    phoneno: req.body.phoneno,
    passwordChangedAt: req.body.passwordChangedAt,
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: req.body.passwordResetExpires,
    active: req.body.active,
  });

  // 2.) Sign JSON token and sennd back to client
  createSendToken(newUser, 201, req, res);
});

// Login User
exports.login = catchAsync(async (req, res, next) => {
  // 1.) Get email and password from req.body
  const { email, password } = req.body;

  //2. Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please enter email and password", 400));
  }

  //3. Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new AppError("Invalid email or password. User does not exist", 401)
    );
  }

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //4. Send JWT back to client, if everything is ok
  createSendToken(user, 200, req, res);
});

// LogOut User
exports.logout = (req, res) => {
  /*res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });*/
  res.clearCookie("jwt");
  res.clearCookie("userLoginType");
  res.clearCookie("user");
  res.status(200).json({ status: "success" });
};

// Protect Routes--Only for Logged In Users
exports.protect = catchAsync(async (req, res, next) => {
  //1. Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access.", 401)
    );
  }

  //2. Verification: Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  //4. Check if user changed password if token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again!", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.type = currentUser;
  res.locals.type = currentUser;
  next();
});

// Only for rendered pages, there will be no error
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 1.) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2.) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3.) Check if user changed password if token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    }
    next();
  } catch (err) {
    next();
  }
};

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError("There is no user with that email address", 404));

  //2. Generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetPassword/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetURL} \n\nIf you have not requested this email then, please ignore it.`;

    // 3.) Send email
    await new SendEmail(user, resetURL, message).sendPasswordReset();

    await res.status(200).json({
      status: "success",
      message: `Email sent to ${user.email} successfully !!`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1.) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2. If token has not expired and there is a user, set new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //3. Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res) => {
  //1. Get user from collection
  const user = await User.findById(req.user._id).select("+password");

  //2. Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    throw new Error("Your current password is incorrect");
  }

  //3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4. Log user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.getTestsOfStudent = catchAsync(async (req, res, next) => {
  const doc = await User.find({ student: req.params.studentId });

  res.status(200).json({
    status: "success",
    resultno: doc.length,
    data: {
      data: doc, //tests fetched
    },
  });
});
