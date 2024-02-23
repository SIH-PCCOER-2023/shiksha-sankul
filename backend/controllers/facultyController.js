const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { upload, importExcel } = require("../utils/excellImportApi");

const factory = require("./handlerFactory");

//const Faculty = require("../models/facultyModel");
const Student = require("./../models/studentModel");
const studentController = require("./studentController");
const User = require("../models/userModel");
const multer = require("multer");

exports.bulkAddStudents = catchAsync(async (req, res, next) => {
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
      "Sheet1",
      (mappingCol2Key = {
        A: "email",
        B: "name",
        C: "phoneno",
        D: "class",
        E: "rollno",
        F: "password",
        G: "passwordConfirm",
        H: "learnerType",
        // I: "test2",
        // J: "test3",
        // K: "test4",
        // L: "test5",
        // M: "test6",
        // A: "class",
        // B: "rollno",
        // c: "",
      })
    );
    console.log(exceldata);
    const result = catchAsync(User.create(exceldata));
    console.log(result);
    if (!result) {
      return next(new AppError("Failed to insert data in bulk", 400));
    }
    res.status(200).json({
      status: "success",
      message: "File imported successfully!",
    });
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Faculty.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null, //data deleted
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
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
  const doc = await Faculty.create(req.body);
  if (!doc) {
    return next(
      new AppError("Failed to create the account. Please try again!", 500)
    );
  }

  res.status(201).json({
    status: "success",
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Faculty.findById(req.params.id).populate("user");

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
  const docs = await Faculty.find().populate("user");

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

exports.getAllStudent = studentController.getAll;
exports.deleteOneStudent = studentController.deleteOne;
exports.createOneStudent = factory.createOne(User);
exports.getOneStudent = studentController.getOne;
exports.updateOneStudent = factory.createOne(User);

// exports.getAllParent=Parent.getAll;
// exports.deleteOneParent = Parent.deleteOne;
// exports.createOneParent=Parent.createOne;
// exports.getOneParent=Parent.getOne;
// exports.updateOneParent=Parent.updateOne;
