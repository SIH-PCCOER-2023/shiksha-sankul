const express = require("express");
var multer = require("multer");
const userController = require("../controllers/userController");
// const { importExcel, upload } = require('../utils/excellImportApi');
//const { updateOne, deleteOne } = require('../controllers/handlerFactory');
const router = express.Router();

router.route("/").get(userController.getAll);
router.route("/:id").get(userController.getOne);

// router
//   .route("/:id")
//   .patch(userController.updateOne)
//   .get(userController.getOne)
//   .delete(userController.deleteOne);

// router.route("/upload").post(upload.single("uploadfile"), importExcel)

module.exports = router;
