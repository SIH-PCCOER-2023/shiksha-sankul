const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const toDo=require('./../models/todoListModel')

exports.getAll=catchAsync(async (req,res,next)=>{
    const toDos=await toDo.find().populate({
        path: "author",
        select: "name -_id ",
      });
    res.status(200).json({
        status: "success",
        data: {
          data: toDos
        }
      });
})

exports.createOne=catchAsync(async (req,res,next)=>{
    const toDos = await toDo.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: toDos, //created doc
        },
    });
})


exports.getOne = catchAsync(async (req, res, next) => {
    
    const userId = req.params.id;
    const toDos = await toDo.find({ author: userId })
    //.populate({
    //     path: "author",
    //     select: "name -_id ",
    // });

    if (!toDos || toDos.length === 0) {
        return next(new AppError("No to-dos found for this user ID", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: toDos
        }
    });
});
exports.updateOne = catchAsync(async (req, res, next) => {
    const todoId = req.params.todoId;
    
    const toDos = await toDo.findByIdAndUpdate(
        todoId,
        req.body,
        { new: true, runValidators: true }
    );

    if (!toDos) {
        return next(new AppError("No to-do found with that ID", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: toDos
        }
    });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const todoId = req.params.todoId;

    const toDos = await toDo.findByIdAndDelete(todoId);

    if (!toDos) {
        return next(new AppError("No to-do found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});


// exports.updateOne = catchAsync(async (req, res, next) => {
//     const todoId = req.params.todoId;
//     const userId = req.params.userId;
    
//     const toDos = await toDo.findOneAndUpdate(
//         { _id: todoId, author: userId }, // Find specific todo belonging to the user
//         req.body,
//         { new: true, runValidators: true }
//     );

//     if (!toDos) {
//         return next(new AppError("No to-do found with that ID for this user", 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: toDos
//         }
//     });
// });

// exports.deleteOne = catchAsync(async (req, res, next) => {
//     const todoId = req.params.todoId;
//     const userId = req.params.userId;

//     const toDos = await toDo.findOneAndDelete({ _id: todoId, author: userId });

//     if (!toDos) {
//         return next(new AppError("No to-do found with that ID for this user", 404));
//     }

//     res.status(204).json({
//         status: "success",
//         data: null,
//     });
// });
