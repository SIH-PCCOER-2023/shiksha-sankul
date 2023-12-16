const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory=require('./handlerFactory');

const Post=require('../../models/discussionModels/postModel');
const User=require('../../models/discussionModels/userModel');


exports.getAllPost=catchAsync(async(req,res,next)=>{
    let all_posts=await Post.find().populate("author","name -_id");
    

    if(!all_posts){
        return next(
            new AppError(' documents not found with that ID',404)
        );
    }

    res.status(200).json({
        status:"Success",
        data:{
            data:all_posts
        }
    })
});


exports.getPost=catchAsync(async(req,res,next)=>{

    const post = await Post.find({ _id: req.params.id }).populate(
        "author",
        "name username"
      );
    
    if(!post){
        return next(
            new AppError('No document found with that ID',404)
        );
    }
    const views = post[0].views;
    post[0].views = views + 1;
    const result = await post[0].save();
    res.send(post[0]);

    res.status(200).json({
        status:"success",
        data:{
            data:post
        }
    })
});


exports.createPost=catchAsync(async(req,res,next)=>{
    const tags = req.body.tags;
    const tags_array = [];
    for (let i = 0; i < tags.length; i++) {
      const tag_in_db = await Tag.findById(tags[i]);
      if (!tag_in_db) return res.status(400).send("Invalid Tag");
      tags_array.push(tag_in_db);
    }

    const post = new Post({
        title: req.body.title,
        tags: tags_array,
        description: req.body.description,
        author: req.user._id,
        views: 1,
    });



    const onePost= await post.save();

    if(!onePost){
        return next(
            new AppError('No Post created',404)
        );
    }

    res.status(201).json({
        status:"success",
        data:{
            data:onePost//post created
        }
    })

    
});


exports.updatePost=catchAsync(async(req,res,next)=>{
    const post= await Post.findById(req.params.id);

    if(!post){
        return next(
            new AppError('No Post found with that ID',404)
        );
    }
    if(post.author==req.user._id){
        return res.status(400).json({
            status:"error",
            message:"you can't upvote your own post"
        })
    }
    const upvoteArray = post.upvotes;
    const index = upvoteArray.indexOf(req.user._id);
    if (index === -1){
        upvoteArray.push(req.user._id);
    }else{
        upvoteArray.splice(index, 1);
      }
      
    post.upvotes = upvoteArray;
    const result = await post.save();
    const post_new = await Post.find({ _id: post._id }).populate(
        "author",
        "name username"
      );

      res.status(200).json({
        status:"success",
        data:{
            data:post_new
        }
      });


})


