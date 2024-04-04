const express = require("express");
const slowLearnerPdfController = require("./../controllers/slowLearnerPdfController");
const router = express.Router();

//router.route("/getResources").get(resourceController.getAll);

router.route("/").get(slowLearnerPdfController.getAll).post(slowLearnerPdfController.createOne);

router
  .route("/:id")
  .patch(slowLearnerPdfController.updateOne)
  .get(slowLearnerPdfController.getOne)
  .delete(slowLearnerPdfController.deleteOne);

module.exports = router;