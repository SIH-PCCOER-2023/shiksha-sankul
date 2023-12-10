const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

// router.use(viewsController.alerts);

router.get('/', viewsController.getLoginUserType);

module.exports = router;
