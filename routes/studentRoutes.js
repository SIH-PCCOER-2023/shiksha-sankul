const express = require('express');
var multer = require('multer');
const studentController=require('../controllers/studentController');
const { importExcel, upload } = require('../utils/excellImportApi');
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

router.route("/upload").post(upload.single("uploadfile"), importExcel)

module.exports=router;