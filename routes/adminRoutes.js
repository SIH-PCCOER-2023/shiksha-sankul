const express = require('express');
const adminController=require('../controllers/adminController');
const router=express.Router();

router
.route('/')
.get(adminController.getAllFaculty)
.post(adminController.createOneFaculty)

router
.route("/:id")
.patch(adminController.updateOneFaculty)
.get(adminController.getOneFaculty)
.delete(adminController.deleteOneFaculty)

module.exports=router;