/*
1.)get one
getmany
getall
deleteone
deletemany
updateone
create


*/
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const Student=require('../models/studentmodel');


exports.deleteOne=catchAsync(async(req,res,next)=>{
    const doc= await Student.findByIdAndDelete(req.params.id);


    if(!doc){
        return next(
            new AppError('No document found with that ID',404)
        );
    }

    res.status(204).json({
        status:'success',
        data:null//data deleted
    });
});

exports.updateOne=catchAsync(async(req,res,next)=>{
    const doc= await Student.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true   
    });

    if(!doc){
        return next(
            new AppError('No document found with that ID',404)
        );
    }
    res.status(200).json({
        status: 'success',
        data: {
          data: doc, // Updated doc
        },
      });
});


exports.createOne=catchAsync(async(req,res,next)=>{
    const doc=await Student.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            data:doc//created doc
        }
    });
});

exports.getOne=catchAsync(async(req,res,next)=>{
    const doc=await Student.findById(req.params.id);

    if (!doc) {
        return next(
          new AppError('A document with that ID could not be found', 404)
        );
      }

    res.status(200).json({
        status:'success',
        data:{
            data:doc//document fetched
        }
    });
});

exports.getAll=catchAsync(async(req,res,next)=>{
    const doc=await Student.find();

    res.status(200).json({
        status:'success',
        resultno:doc.length,
        data:{
            data:doc//documents fetched
        }

    })
})