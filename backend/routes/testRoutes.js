const express = require("express");
const testController = require("../controllers/testController");

const router = express.Router();

//router.route('/manageClassification/:id').patch(testController.getAllClassification);
router.route("/").get(testController.getAll).post(testController.createOne);

router
  .route("/:id")
  .get(testController.getOne)
  .patch(testController.updateOne)
  .delete(testController.deleteOne);

module.exports = router;
