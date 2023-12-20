const express = require('express');
const router = express.Router();
const learningResourcesController = require('../controllers/learningResourceController');

// Create a new learning resource
router.post('/', learningResourcesController.createLearningResource);

// Get all learning resources
router.get('/', learningResourcesController.getAllLearningResources);

// Get a single learning resource by ID
router.get('/:id', learningResourcesController.getLearningResourceById);

// Update a learning resource by ID
router.put('/:id', learningResourcesController.updateLearningResourceById);

// Delete a learning resource by ID
router.delete('/:id', learningResourcesController.deleteLearningResourceById);

module.exports = router;
