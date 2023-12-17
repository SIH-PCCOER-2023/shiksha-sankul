const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
const factory=require('../controllers/handlerFactory');

const Faculty=require("../models/facultymodel");
const Admin=require('../models/adminModel');






exports.deleteOne=catchAsync(async(req,res,next)=>{
    const doc= await Admin.findByIdAndDelete(req.params.id);


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
    const doc= await Admin.findByIdAndUpdate(req.params.id,req.body,{
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
    const doc=await Admin.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            data:doc//created doc
        }
    });
});

exports.getOne=catchAsync(async(req,res,next)=>{
    const doc=await Admin.findById(req.params.id);

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
    const doc=await Admin.find();

    res.status(200).json({
        status:'success',
        resultno:doc.length,
        data:{
            data:doc//documents fetched
        }

    })
})

exports.getAllFaculty=factory.getAll(Faculty)
exports.deleteOneFaculty = factory.deleteOne(Faculty);
exports.createOneFaculty=factory.createOne(Faculty);
exports.getOneFaculty=factory.getOne(Faculty);
exports.updateOneFaculty=factory.updateOne(Faculty);


