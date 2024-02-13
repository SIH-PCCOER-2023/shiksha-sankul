const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { upload, importExcel } = require("../utils/excellImportApi");

const factory = require("./handlerFactory");
const Resource = require("../models/resourceModel");
const multer = require("multer");

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Resource.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null, //data deleted
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Resource.findByIdAndUpdate(req.params.id, req.body, {
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
  const doc = await Resource.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Resource.findById(req.params.id);

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
  const docs = await Resource.find();

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

exports.bulkAddResources = catchAsync(async (req, res, next) => {
  const uploader = upload.single("uploadfile");
  uploader(req, res, function (err) {
    if (!req.file || err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(new AppError("File upload failed", 503));
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
      return next(new AppError("Unknown error occourred", 500));
    } else {
      console.log("file upload successful", req.file.path);
    }

    // Everything went fine.
    const exceldata = importExcel(
      req.file.path,
      "Resources",
      (mappingCol2Key = {
        A: "subject",
        B: "title",
        C: "url",
        D: "topic",
        E: "type1",
        F: "type2",
      })
    );
    console.log(exceldata);
    Resource.insertMany(exceldata);
    // console.log(res);
    res.status(200).json({
      status: "success",
      message: "File imported successfully!",
    });
  });
});
