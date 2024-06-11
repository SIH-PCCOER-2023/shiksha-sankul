const express = require("express");
var multer = require("multer");
const ILPController = require("../../controllers/ILPControllers/ILPController.js");
const router = express.Router();

router
  .route("/generateilp/:userId")
  // .get(ILPController.getAll)
  .post(ILPController.createILP);

router.route("/:userId").get(ILPController.getILP);
router
  .route("/:id")
  .patch(ILPController.updateILP)
  .get(ILPController.getILP)
  .delete(ILPController.deleteILP);

//worker routes
router.route("/startworker/:userId").get(ILPController.createILPWorker);

module.exports = router;
