const express = require('express');
const facultyController=require('../controllers/facultyController');
//const { updateOne, deleteOne } = require('../controllers/handlerFactory');
const router=express.Router();

router
.route('/')
.get(facultyController.getAll)
.post(facultyController.createOne)

router
.route("/:id")
.patch(facultyController.updateOne)
.get(facultyController.getOne)
.delete(facultyController.deleteOne)

module.exports=router;