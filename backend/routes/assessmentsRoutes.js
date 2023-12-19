const express = require('express');
const assessmentController=require('../controllers/assessmentController');

const router=express.Router();

router
.route('/')
.get(assessmentController.getAll)
.post(assessmentController.storeResult)

module.exports=router;