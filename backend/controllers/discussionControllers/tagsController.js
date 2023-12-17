const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/appError');
const APIFeatures = require('../../../utils/apiFeatures');
const factory=require('../handlerFactory');



const Tag=require('../../models/discussionModels/tagModel');


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
    exports.createTag = catchAsync(async (req, res, next) => {
        const tag = new Tag({
            name: req.body.name,
        });
    
        const done = await tag.save();
        console.log("Tag created");
    
        res.status(201).json({
            status: "success",
            data: {
                tag: _.pick(done, ["_id", "name", "used"]) // Assuming 'done' contains the saved tag
            }
        });
    });
    
})