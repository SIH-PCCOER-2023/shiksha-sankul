const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
    .route("/managefaculty")
    .get(adminController.getAllFaculty)
    .post(adminController.createOneFaculty);

router
    .route("/managefaculty/:id")
    .patch(adminController.updateOneFaculty)
    .get(adminController.getOneFaculty)
    .delete(adminController.deleteOneFaculty);

// router.route("/managefaculty/upload").post(adminController.createManyFaculty);

router.route("/managefaculty/upload").post();


router
.route("/:id")
.patch(adminController.updateOne)
.get(adminController.getOne)
.delete(adminController.deleteOne);

router.route("/").get(adminController.getAll).post(adminController.createOne);
module.exports = router;
