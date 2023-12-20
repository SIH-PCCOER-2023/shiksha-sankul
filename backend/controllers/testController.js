const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Test = require('../models/testModel');

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No test found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null, //data deleted
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No test found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc, // Updated doc
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Test.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findById(req.params.id);

  if (!doc) {
    return next(new AppError('A test with that ID could not be found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc, //test fetched
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Test.find();

  res.status(200).json({
    status: 'success',
    resultno: doc.length,
    data: {
      data: doc, //tests fetched
    },
  });
});
