const catchAsync = require("../utils/catchAsync");
const Results = require("../models/resultsModel");

exports.storeResult = catchAsync(async (req, res, next) => {
    const doc = await Results.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getAll = catchAsync(async (req, res, next) => {
    const docs = await Results.find().populate("user");

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