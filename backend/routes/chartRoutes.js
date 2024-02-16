const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const chartsController = require("../controllers/chartsController");

router.route("/").get(chartsController.getAll);
