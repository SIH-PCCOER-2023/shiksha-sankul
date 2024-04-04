const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const factory = require("./handlerFactory");
const { upload, importExcel } = require("../utils/excellImportApi");

const Faculty = require("../models/facultyModel");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const facultyController = require("../controllers/facultyController");

exports.bulkAddFaculty = catchAsync(async (req, res, next) => {
  const uploader = upload.single("uploadfile");
  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(new AppError("File upload failed", 503));
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(new AppError("Unknown error occourred", 500));
    }

    // Everything went fine.
    importExcel(
      req.file.filename,
      (mappingCol2Key = {
        A: "",
      })
    );
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Admin.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null, //data deleted
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc, // Updated doc
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Admin.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Admin.findById(req.params.id).populate("user");

  if (!doc) {
    return next(
      new AppError("A document with that ID could not be found", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc, //document fetched
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const docs = await Admin.find().populate("user");
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
      Object.assign(requestObject, doc._doc);
      return requestObject;
    }),
  });
});

exports.getAllFaculty = facultyController.getAll;
exports.deleteOneFaculty = facultyController.deleteOne;
exports.createOneFaculty = factory.createOne(User);
exports.getOneFaculty = facultyController.getOne;
exports.updateOneFaculty = factory.updateOne(User);
