const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
const factory=require('../handlerFactory');


const Tag=require('../../backend/models/discussionModels/tagModel');


exports.getAllTag=catchAsync(async(req,res,next)=>{
    const tags= await Tag.find();


    
    if(!tags){
        return next(new AppError("There is no such post with this ID",404));
    }


    res.status(200).json({
        status:"success",
        data:{
            data:tags//tags fetched
        }
    });
    
    
});


exports.createTag=catchAsync(async(req,res,next)=>{
    const tag = new Tag({
        name: req.body.name,
    });
    const done=await tag.save();
    console.log("tag created");
    res.send(_.pick(tag, ["_id","name", "used" ]));

    res.status(200).json({
        status:"success",
        data:{
            data:done
        }
    })
})