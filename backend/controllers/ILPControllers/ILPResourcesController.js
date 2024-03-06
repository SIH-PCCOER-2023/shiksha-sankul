const { ILP, ILPTemplate } = require("../../models/ILPModels/ILPModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { upload, importExcel } = require("../utils/excellImportApi");
const Test=require('./../../models/testModel');


exports.createResourcesILP=catchAsync(async(req,res,next)=>{
    const updated= await Test.find({incorrectQuestions})
    







    const done=  ILP.create()
})

