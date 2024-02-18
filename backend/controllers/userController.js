const Student = require("../models/studentModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = catchAsync(async (req, res, next) => {
  const docs = await User.find({ type: "STUDENT" }).limit(3);

  if (!docs) {
    return next(new AppError("Doc not found", 404));
  }

  res.status(200).json({
    status: "success",
    count: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Student.findOne({ user: req.params.id });

  if (!doc) {
    return next(new AppError("Doc not found", 404));
  }

  res.status(200).json({
    status: "success",

    data: {
      data: doc,
    },
  });
});
