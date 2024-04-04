const express = require("express");
var multer = require("multer");
const studentController = require("../controllers/studentController");
const authController = require("./../controllers/authController");
// const { importExcel, upload } = require('../utils/excellImportApi');
//const { updateOne, deleteOne } = require('../controllers/handlerFactory');
const router = express.Router();

router.post("/signup", authController.signup);

router
  .route("/")
  .get(studentController.getAll)
  .post(studentController.createOne);

router
  .route("/:id")

  .patch(studentController.updateOneStudent)
  .get(studentController.getOne);

router.route("/:userId/:studentId").delete(studentController.deleteOne);
router
  .route("/manageClassification/:id")
  .patch(studentController.getAllClassification);

router.route("/obtainedScore/:id").get(studentController.getObtainedScore);
router.route("/array/:rollno").get(studentController.getArray);

// router.route("/upload").post(upload.single("uploadfile"), importExcel)

module.exports = router;
