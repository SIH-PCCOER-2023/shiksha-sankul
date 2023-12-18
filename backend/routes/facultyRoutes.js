const express = require('express');
const facultyController=require('../controllers/facultyController');

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



router
.route('/managestudent/')
.get(facultyController.getAllStudent)
.post(facultyController.createOneStudent)

router
.route("/managestudent/:id")
.patch(facultyController.updateOneStudent)
.get(facultyController.getOneStudent)
.delete(facultyController.deleteOneStudent)


// router
// .route('/manageparent')
// .get(facultyController.getAllParent)
// .post(facultyController.createOneParent)

// router
// .route("/manageparent/:id")
// .patch(facultyController.updateOneParent)
// .get(facultyController.getOneParent)
// .delete(facultyController.deleteOneParent)


module.exports=router;