const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const toDo=require('./../models/todoListModel')

exports.getAll=catchAsync(async (req,res,next)=>{
    const toDos=await toDo.find();
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

exports.updateOne=catchAsync(async (req,res,next)=>{
    const toDos=await toDo.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
    })
    if(!toDos){
        return next(new AppError("No toDos found with that ID", 404))
    }
    res.status(200).json({
        status:'success',
        data:{
            data:toDos
        }
    })
})

exports.getOne=catchAsync(async(req,res,next)=>{
    const toDos=await toDo.findById(req.params.id)
    if(!toDos){
        return next(new AppError("No toDos found with that ID", 404))
    }
    res.status(200).json({
        status:'success',
        data:{
            data:toDos
        }
    })
})

exports.deleteOne=catchAsync(async (req,res,next)=>{
    const toDos = await toDo.findByIdAndDelete(req.params.id);

    if (!toDos) {
        return next(new AppError("No toDos found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null, 
    });
})