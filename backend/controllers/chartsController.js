const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { upload, importExcel } = require("../utils/excellImportApi");

const factory = require("./handlerFactory");
const Test = require("../models/testModel");
const Chart = require("../models/chartsModel");
const User = require("../models/userModel");

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Chart.create(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      data: doc,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Chart.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      data: doc,
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const docs = await Chart.find();

  res.status(200).json({
    status: "success",
    count: docs.length,
    data: docs.map((doc) => {
      const requestObject = {
        request: {
          type: "GET",
          url: req.originalUrl + "/" + doc._id,
        },
      };
      Object.assign(doc._doc, requestObject);
      return doc;
    }),
  });
});
