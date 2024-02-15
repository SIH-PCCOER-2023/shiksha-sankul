const express = require("express");
//const auth = require("../middleware/auth");
const User = require("./../../models/userModel");
const Tag = require("./../../models/discussionModels/tagModel");
const _ = require("lodash");
const catchAsync = require("../../utils/catchAsync");
//const router = express.Router();

exports.getAllTag=catchAsync(async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

exports.createTag=catchAsync( async (req, res) => {
  //const { error } = validateTag(req.body);
  //if (error) return res.status(400).send("enter a valid tag");
  const tag = await Tag.create(req.body)
  
  console.log("tag created");
  res.send(_.pick(tag, ["_id","name", "used" ]));
  
});

