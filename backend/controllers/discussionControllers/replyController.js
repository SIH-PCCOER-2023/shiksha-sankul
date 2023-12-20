const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
const factory=require('../handlerFactory');



const Reply=require('../../models/discussionModels/replyModel');
const Post=require('../../models/discussionModels/postModel');
const User=require('../../models/userModel');



exports.createReply=catchAsync(async(req,res,next)=>{
    console.log(req.params.id);
    const post =await Post.findById(req.params.id);

    if(!post){
        return next(new AppError("There is no such post with this ID",404));
    }
    const reply = new Reply({
        post: req.params.id,
        comment: req.body.comment,
        author: req.params.id,
    });
    await  reply.save();
    const reply_populated = await Reply.find({ id: reply.id }).populate(
        "author",
        "name -_id"
    );
    res.status(200).json({
        status:"success",
        data:{
            data:reply_populated//reply prodeuced

        }
    })

});

exports.updateReply=catchAsync(async(req,res,next)=>{
    console.log(req.params.id);
    const post = await Reply.findById(req.params.id);
    
    if(!post){
        return next(
            new AppError("reply doesn't exists")
        )
    }
    if(reply.author ==req.user.id){
        return res.status(400).send("you cant upvote your own reply");
    }
    



  const upvoteArray = reply.upvotes;
  const index = upvoteArray.indexOf(req.user.id);
  if (index === -1) {
    upvoteArray.push(req.user.id);
  } else {
    upvoteArray.splice(index, 1);
  }
  reply.upvotes= upvoteArray;
  
  const result = await reply.save();
  const reply_new = await Reply.find({ id: reply.id }).populate(
    "author",
    "name username"
  );

  res.status(200).json({
    status:"success",
    data:{
        data:reply_new
    }
  })
});


exports.getReply=catchAsync(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(
            new AppError("rreply doesn't exists")
        )
    }
    const replies = await Reply.find({ post: req.params.id }).populate(
        "author",
        "name username"
    );

    res.status(200).json({
        status:"success",
        data:{
            data:replies
        }
    });
});


