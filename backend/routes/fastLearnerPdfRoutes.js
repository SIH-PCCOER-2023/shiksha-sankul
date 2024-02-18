const express = require("express");
const fastLearnerPdfController = require("./../controllers/fastLearnerPdfController");
const router = express.Router();

//router.route("/getResources").get(resourceController.getAll);

router.route("/").get(fastLearnerPdfController.getAll).post(fastLearnerPdfController.createOne);

router
  .route("/:id")
  .patch(fastLearnerPdfController.updateOne)
  .get(fastLearnerPdfController.getOne)
  .delete(fastLearnerPdfController.deleteOne);

module.exports = router;