const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory=require('./handlerFactory');


const Reply=require('../../models/discussionModels/replyModel')
const User=require('../../models/discussionModels/userModel');



exports.