const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/appError");
const APIFeatures = require("./../../utils/apiFeatures");
const factory = require("./../handlerFactory");

const Post = require("./../../models/postModel");
const User = require("./../../models/userModel");
const Tag = require("../../models/discussionModels/tagModel");

exports.getAllPost = catchAsync(async (req, res, next) => {
  let allPosts = await Post.find();

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

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.find({ _id: req.params.id })
    .populate("upvotes")
    .populate("author");

  if (!post) {
    return next(new AppError("No document found with that ID", 404));
  }
  const views = post[0].views;
  post[0].views = views + 1;
  const result = await post[0].save();
  res.send(post[0]);

  res.status(200).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  //   const post = new Post({
  //     title: req.body.title,
  //     description: req.body.description,
  //     author: req.body.id,
  //     upvotes: req.body.upvotes,
  //     views: req.body.views,
  //   });
  //   const done = await post.save();
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
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No Post found with that ID", 404));
  }
  if (post.author == req.user._id) {
    return res.status(400).json({
      status: "error",
      message: "you can't upvote your own post",
    });
  }
  const upvoteArray = post.upvotes;
  const index = upvoteArray.indexOf(req.user._id);
  if (index === -1) {
    upvoteArray.push(req.user._id);
  } else {
    upvoteArray.splice(index, 1);
  }

  post.upvotes = upvoteArray;
  const result = await post.save();
  const post_new = await Post.find({ _id: post._id }).populate(
    "author",
    "name username"
  );

  res.status(200).json({
    status: "success",
    data: {
      data: post_new,
    },
  });
});
