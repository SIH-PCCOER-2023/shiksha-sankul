const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const factory=require('./handlerFactory');
const Faculty=require('../models/facultymodel')
const Student=require('../models/studentmodel');
const Parent=require('../models/parentModel');

exports.deleteOne=catchAsync(async(req,res,next)=>{
    const doc= await Faculty.findByIdAndDelete(req.params.id);


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
    const doc= await Faculty.findByIdAndUpdate(req.params.id,req.body,{
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
    const doc=await Faculty.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            data:doc//created doc
        }
    });
});

exports.getOne=catchAsync(async(req,res,next)=>{
    const doc=await Faculty.findById(req.params.id);

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
    const doc=await Faculty.find();

    res.status(200).json({
        status:'success',
        resultno:doc.length,
        data:{
            data:doc//documents fetched
        }

    })
})

exports.getAllStudent=factory.getAll(Student);
exports.deleteOneStudent = factory.deleteOne(Student);
exports.createOneStudent=factory.createOne(Student);
exports.getOneStudent=factory.getOne(Student);
exports.updateOneStudent=factory.updateOne(Student);

exports.getAllParent=factory.getAll(Parent);
exports.deleteOneParent = factory.deleteOne(Parent);
exports.createOneParent=factory.createOne(Parent);
exports.getOneParent=factory.getOne(Parent);
exports.updateOneParent=factory.updateOne(Parent);







