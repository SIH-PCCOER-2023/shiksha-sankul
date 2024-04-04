const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/appError");
const APIFeatures = require("./../../utils/apiFeatures");
const factory = require("./../handlerFactory");

const Post = require("./../../models/postModel");
const User = require("./../../models/userModel");
const Tag = require("../../models/discussionModels/tagModel");

exports.getAllPost = catchAsync(async (req, res, next) => {
   let allPosts = await Post.find()
    .populate({
      path: "author",
      select: "name -_id ",
    })

    //.populate({ path: "upvotes", select: "name -_id" });

  if (!allPosts) {
    return next(new AppError(" documents not found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      data: allPosts,
    },
  });
});

// exports.getPost = catchAsync(async (req, res, next) => {
//   const post = await Post.find({ _id: req.params.id })
//     .populate("upvotes")
//     .populate("author");

//   if (!post) {
//     return next(new AppError("No document found with that ID", 404));
//   }
//   const views = post[0].views;
//   post[0].views = views + 1;
//   const result = await post[0].save();
//   res.send(post[0]);

//   res.status(200).json({
//     status: "success",
//     data: {
//       data: post,
//     },
//   });
// });





exports.getPost = catchAsync(async (req, res, next) => {

  const done = await Post.findById(req.params.id)
    .populate("author", "name -_id").exec();


  if (!done) {
    return next(new AppError("No document found with that ID", 404));
  }

  // Increment the views count by 1

  // done.views += 1;
  // await done.save();

  // // Calculate the upvote count
  // const upvoteCount = done.upvotes.length;

  // // Create a new object containing the done data along with the upvote count
  // const postWithUpvoteCount = {
  //   _id: done._id,
  //   // Include other fields of the done as needed
  //   views: done.views,
  //   // Include other fields of the done as needed
  //   upvoteCount: upvoteCount,
  //   author: done.author.name,
  // };

  // Send the done with the upvote count as a response
  res.status(200).json(
  {
    status: "success",
    data: 
    {
      data: done,

    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {

  const done = await Post.create(req.body);

  if (!done) {
    return next(new AppError("No Post created", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      data: done, //post created
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id);

  if (!post) {
    return next(new AppError("No Post found with that ID", 404));
  }
  // if (post.author == req.user._id) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: "you can't upvote your own post",
  //   });
  // }
  // const upvoteArray = post.upvotes;
  // const index = upvoteArray.indexOf(req.user._id);
  // if (index === -1) {
  //   upvoteArray.push(req.user._id);
  // } else {
  //   upvoteArray.splice(index, 1);
  // }

  // post.upvotes = upvoteArray;
  // const result = await post.save();
  // const post_new = await Post.find({ _id: post._id }).populate(
  //   "author",
  //   "name username"
  // );

  res.status(200).json({
    status: "success",
    data: {
      data: post,
    },
  });
});



exports.updateVote = catchAsync(async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    
    // Find the post by postId
    const post = await Post.findById(postId);
    
    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "Fail",
        message: "Post not found",
      });
    }
    
    // Initialize upvotes array if it's undefined
    if (!post.upvotes) {
      post.upvotes = [];
    }
    
    // Check if userId is already in upvotes
    if (post.upvotes.includes(userId)) {
      return res.status(400).json({
        status: "Fail",
        message: "User already voted for this post",
      });
    }
    
    // Push userId to upvotes array
    post.upvotes.push(userId);
    
    // Save the updated post
    await post.save();
    
    // Log the updated post
    console.log(post);
    
    res.status(200).json({
      status: "Success",
      data: {
        post: post,
      },
    });
  } 
  catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// exports.updateVote = catchAsync(async (req, res, next) => {
//   const userId = req.params.userId;
//   const postId = req.params.postId;
//   const doc = await Post.findById(postId);

//   Post.upvotes.push(userId);
//   console.log(doc);

//   res.status(200).json({
//     status: "Success",
//     data: {
//       data: doc,
//     },
//   });
// });
