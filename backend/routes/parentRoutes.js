const express = require('express');
//const facultyController=require('../controllers/facultyController');
//const { updateOne, deleteOne } = require('../controllers/handlerFactory');
const parentController=require('../controllers/parentController')
const router=express.Router();

router
.route('/')
.get(parentController.getAll)
.post(parentController.createOne)

router
.route("/:id")
.patch(parentController.updateOne)
.get(parentController.getOne)
.delete(parentController.deleteOne)

module.exports=router;