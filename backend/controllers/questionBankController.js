const { upload, importExcel } = require("../utils/excellImportApi");
const QuestionBank = require("../models/QuestionBankModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const AppError = require("../utils/appError");


exports.getOne = catchAsync(async (req, res, next) => {
    const doc = await QuestionBank.findById(req.params.id);

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
    const docs = await QuestionBank.aggregate().sample(2);
    // console.log(docs);
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
            Object.assign(doc, requestObject);
            return doc;
        }),
    });
});

exports.bulkAddQuestions = catchAsync(async (req, res, next) => {
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
                A: "subject",
                B: "topic",
                C: "subtopic",
                E: "level",
                F: "question",
                G: "A",
                H: "B",
                I: "C",
                J: "D",
                K: "correctanswer",
                L: "explanation",
                M: "marks",
            })
        );
        // console.log(exceldata);
        QuestionBank.insertMany(exceldata);
        // console.log(res);
        res.status(200).json({
            status: "success",
            message: "File imported successfully!",
        });
    });
});
