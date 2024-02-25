/*
1.)get one
getmany
getall
deleteone
deletemany
updateone
create


*/

const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const Student = require("../models/studentModel");

const Test = require("./../models/testModel");
const User = require("../models/userModel");

exports.deleteOne = catchAsync(async (req, res, next) => {
  const stud = await Student.findByIdAndDelete(req.params.studentId);
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!stud && !user) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null, //data deleted
  });
});

// exports.updateOne = catchAsync(async (req, res, next) => {
//   const doc = await User.findByIdAndUpdate("User.id", req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!doc) {
//     return next(new AppError("No document found with that ID", 404));
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       data: doc, // Updated doc
//     },
//   });
// });

exports.updateOneStudent = catchAsync(async (req, res, next) => {
  const doc = await Student.findByIdAndUpdate(req.params.id, req.body, {
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
  const doc = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Student.findById({ "user.id": req.params.id }).populate(
    "user"
  );

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
  const doc = await Student.find().populate("user");
  if (!doc) {
    return next(new AppError("Failed to fetch data", 500));
  }
  res.status(200).json({
    status: "success",
    count: doc.length,
    data: doc.map((doc) => {
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

exports.getOneStudentByUserId = catchAsync(async (req, res, next) => {
  const doc = await Student.find({ user: req.params.userId }).populate("user");

  if (!doc) {
    return next(new AppError("Failed to fetch data", 500));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getAllClassification = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;

  const stats = await Test.aggregate([
    {
      $addFields: {
        isMatchingStudent: {
          $eq: ["$student", new mongoose.Types.ObjectId(studentId)],
        },
      },
    },
    {
      $match: {
        isMatchingStudent: true,
      },
    },
    {
      $group: {
        _id: null,
        obtainedScore: { $sum: "$obtainedScore" },
        totalScore: { $sum: "$totalScore" },
        count: { $sum: 1 }, // Count the number of documents for calculating average
      },
    },
    {
      $project: {
        obtainedScore: 1,
        totalScore: 1,
        avgObtainedScore: { $divide: ["$obtainedScore", "$count"] },
        avgTotalScore: { $divide: ["$totalScore", "$count"] },
      },
    },
    {
      $project: {
        avgObtainedScore: 1,
        learnerType: {
          $switch: {
            branches: [
              { case: { $gte: ["$avgObtainedScore", 6] }, then: "fast" },
              { case: { $lte: ["$avgObtainedScore", 6] }, then: "slow" },
            ],
            // default: "UNKNOWN",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        learnerType: 1,
      },
    },
  ]);
  //console.log(stats);

  const filter = { user: new mongoose.Types.ObjectId(studentId) };
  //console.log(filter);

  const update = {
    $set: {
      learnerType: stats[0].learnerType,

      // Any other fields you want to update
    },
  };

  const result = await Student.updateOne(filter, update);
  console.log(stats[0]);
  //console.log(result);

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getObtainedScore = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;

  const stats = await Test.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(studentId),
      },
    },
    {
      $group: {
        _id: null, // Use null if you want to group all documents into one result
        obtainedScores: { $push: "$obtainedScore" },
        totalScore: { $sum: "$totalScore" },
        // Add more aggregation stages if needed
      },
    },
    {
      $project: {
        _id: 0,
        obtainedScores: 1,
      },
    },
  ]);
  console.log(stats);

  const filter = { user: new mongoose.Types.ObjectId(studentId) };
  const update = { $set: { obtainedScores: stats[0].obtainedScores } };
  ////

  const score = await Student.updateOne(filter, update);

  console.log(stats[0]);

  // Handle or send response with 'stats' data
  res.status(200).json({
    status: "success",
    data: score,
  });
});

// exports.getArray = catchAsync(async (req, res, next) => {
//   const doc = await Student.findOne({ user: req.params.id });

//   if (!doc) {
//     return next(
//       new AppError("A document with that ID could not be found", 404)
//     );
//   }

//   // Extract the obtainedScores array from the document
//   const obtainedScores = doc.obtainedScores || [];

//   res.status(200).json({
//     status: "success",
//     data: {
//       obtainedScores,
//     },
//   });
// });

// exports.getArray = catchAsync(async (req, res, next) => {
//   const roll = req.body.rollno;
//   const doc = await Student.findOne({ rollno: roll });

//   if (!doc) {
//     return next(
//       new AppError("A document with that ID could not be found", 404)
//     );
//   }

//   const obtainedScores = doc.obtainedScores || [];

//   res.status(200).json({
//     status: "success",
//     data: {
//       data: obtainedScores,
//     },
//   });
// });

exports.getArray = catchAsync(async (req, res, next) => {
  const roll = req.params.rollno;
  //   const doc = await Student.findOne({ rollno: roll });
  const doc = await Student.findOne({ rollno: roll });

  if (!doc) {
    return next(
      new AppError("A document with that ID could not be found", 404)
    );
  }

  const obtainedScores = doc.obtainedScores || [];

  res.status(200).json({
    status: "success",
    data: {
      data: obtainedScores,
    },
  });
});
