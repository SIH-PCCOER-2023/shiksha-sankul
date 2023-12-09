const express = require('express');
const studentController=require('../controllers/studentcontroller');
//const { updateOne, deleteOne } = require('../controllers/handlerFactory');
const router=express.Router();

router
.route('/')
.get(studentController.getAll)
.post(studentController.createOne)

router
.route("/:id")
.patch(studentController.updateOne)
.get(studentController.getOne)
.delete(studentController.deleteOne)

module.exports=router;