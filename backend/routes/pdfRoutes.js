const express = require("express");
const pdfController = require("../controllers/pdfController");
const router = express.Router();

//router.route("/getResources").get(resourceController.getAll);

router.route("/").get(pdfController.getAll).post(pdfController.createOne);

router
  .route("/:id")
  .patch(pdfController.updateOne)
  .get(pdfController.getOne)
  .delete(pdfController.deleteOne);

module.exports = router;
