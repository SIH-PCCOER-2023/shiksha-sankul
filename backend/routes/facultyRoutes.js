const express = require("express");
const facultyController = require("../controllers/facultyController");
const resourceController = require("../controllers/resourceController.js");
const StudentRoutes = require("./studentRoutes.js");
const router = express.Router();

router.use("/managestudent", StudentRoutes);
router.get("/manageResources", resourceController.getAll);
router.post("/bulkAddStudents", facultyController.bulkAddStudents);

router
  .route("/")
  .get(facultyController.getAll)
  .post(facultyController.createOne);

router
  .route("/:id")
  .patch(facultyController.updateOne)
  .get(facultyController.getOne)
  .delete(facultyController.deleteOne);

module.exports = router;
