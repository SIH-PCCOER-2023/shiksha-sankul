const express = require('express');
const adminController=require('../controllers/adminController');
const router=express.Router();

router
.route('/managefaculty')
.get(adminController.getAllFaculty)
.post(adminController.createOneFaculty)

router
.route("/managefaculty/:id")
.patch(adminController.updateOneFaculty)
.get(adminController.getOneFaculty)
.delete(adminController.deleteOneFaculty)



router
.route('/')
.get(adminController.getAll)
.post(adminController.createOne)

router
.route("/:id")
.patch(adminController.updateOne)
.get(adminController.getOne)
.delete(adminController.deleteOne)








module.exports=router;