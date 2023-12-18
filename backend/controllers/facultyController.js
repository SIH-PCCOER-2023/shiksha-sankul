const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { upload, importExcel } = require("../utils/excellImportApi");

const factory = require("./handlerFactory");
const Faculty = require("../models/facultyModel");
const studentController = require("./studentController");
const User = require("../models/userModel");
const multer = require("multer");

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
