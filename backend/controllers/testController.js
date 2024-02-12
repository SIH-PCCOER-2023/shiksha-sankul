const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const Test = require("../models/testModel");
const studentController = require("./../controllers/studentController");
const Student = require("./../models/studentModel");
exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No test found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null, //data deleted
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No test found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc, // Updated doc
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Test.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc, //created doc
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const doc = await Test.findById(req.params.id);

  if (!doc) {
    return next(new AppError("A test with that ID could not be found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc, //test fetched
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Test.find();

  res.status(200).json({
    status: "success",
    resultno: doc.length,
    data: {
      data: doc, //tests fetched
    },
  });
});

// exports.getAllClassification=catchAsync (async (req,res,next)=>{
//         //const studentId=req.params.id;

//         const stats=await Test.aggregate([
//             {
//                 $match: { `student:'$student'` }
//             },
//             {
//                 $group:{
//                     _id:{},
//                     numObtainedScore:{$sum:1},
//                     numTotalScore:{$sum:1},
//                 }
//             },
//             {
//             //  $getField:${student}
//             }
//         ]);

//         res.status(200).json({
//             status:'success',
//             data:{
//                 stats
//             }
//         })

// })
// exports.updateOneStudent = catchAsync(async (req, res, next) => {
//   const doc = await Student.findByIdAndUpdate(req.params.id, req.body, {
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

// exports.getAllClassification = catchAsync(async (req, res, next) => {
//   const studentId = req.params.id;

//   const stats = await Test.aggregate([
//     {
//       $addFields: {
//         isMatchingStudent: {
//           $eq: ["$student", new mongoose.Types.ObjectId(studentId)],
//         },
//       },
//     },
//     {
//       $match: {
//         isMatchingStudent: true,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         obtainedScore: { $sum: "$obtainedScore" },
//         totalScore: { $sum: "$totalScore" },
//         count: { $sum: 1 }, // Count the number of documents for calculating average
//       },
//     },
//     {
//       $project: {
//         obtainedScore: 1,
//         totalScore: 1,
//         avgObtainedScore: { $divide: ["$obtainedScore", "$count"] },
//         avgTotalScore: { $divide: ["$totalScore", "$count"] },
//       },
//     },
//     {
//       $project: {
//         avgObtainedScore: 1,
//         learnerType: {
//           $switch: {
//             branches: [
//               { case: { $gte: ["$avgObtainedScore", 6] }, then: "fast" },
//               { case: { $lte: ["$avgObtainedScore", 6] }, then: "slow" },
//             ],
//             // default: "UNKNOWN",
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         learnerType: 1,
//       },
//     },
//   ]);
//   //console.log(stats);

//   //const filter = { student: new mongoose.Types.ObjectId(studentId) };
//   //console.log(filter);

//   const update = {
//     $set: {
//       learnerType: stats[0].learnerType,

//       // Any other fields you want to update
//     },
//   };

//   const result = await updateOneStudent(studentId, update);
//   console.log(stats[0]);
//   //console.log(result);

//   res.status(200).json({
//     status: "success",
//     data: {
//       result,
//     },
//   });
// });
