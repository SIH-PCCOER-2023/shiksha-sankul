const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(
                new AppError("A document with that ID could not be found", 404)
            );
        }

        res.status(204).json({
            status: "success",
            data: null, // Deleted Doc
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(
                new AppError("A document with that ID could not be found", 404)
            );
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc, // Updated doc
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        // const doc = new Model(req.body)
        // doc.save()

        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                data: doc, // Created Doc
            },
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        // Model.findOne({_id: req.params.id})
        let query = Model.findById(req.params.id);
        if (popOptions) {
            query = query.populate(popOptions);
        }

        const doc = await query;

        if (!doc) {
            return next(
                new AppError("A document with that ID could not be found", 404)
            );
        }

        res.status(200).json({
            status: "success",
            data: { data: doc }, // Found Doc
        });
    });

exports.getAll = (Model, resourceUrl) =>
    catchAsync(async (req, res, next) => {
        // To allow for nested GET reviews on tour (hack)
        let filter = {};
        if (req.params.tourId) {
            filter = { tour: req.params.tourId };
        }

        // EXECUTE QUERY
        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        // const doc = await features.query.explain(); Used for indexing purposes
        const docs = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            count: docs.length,
            data: docs.map((doc) => {
                const requestObject = {
                    request: {
                        type: "GET",
                        url: resourceUrl + doc._id,
                    },
                };
                Object.assign(requestObject, doc._doc);
                return requestObject;
            }),
        });
    });
