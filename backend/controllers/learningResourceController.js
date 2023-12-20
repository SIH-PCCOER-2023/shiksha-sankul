const LearningResources = require('../models/learningResourcesModel');

// Create a new learning resource
exports.createLearningResource = async (req, res) => {
  try {
    const newLearningResource = await LearningResources.create(req.body);
    res.status(201).json(newLearningResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all learning resources
exports.getAllLearningResources = async (req, res) => {
  try {
    const allLearningResources = await LearningResources.find();
    res.status(200).json(allLearningResources);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single learning resource by ID
exports.getLearningResourceById = async (req, res) => {
  try {
    const learningResource = await LearningResources.findById(req.params.id);
    if (!learningResource) {
      return res.status(404).json({ error: 'Learning resource not found' });
    }
    res.status(200).json(learningResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a learning resource by ID
exports.updateLearningResourceById = async (req, res) => {
  try {
    const updatedLearningResource = await LearningResources.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLearningResource) {
      return res.status(404).json({ error: 'Learning resource not found' });
    }
    res.status(200).json(updatedLearningResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a learning resource by ID
exports.deleteLearningResourceById = async (req, res) => {
  try {
    const deletedLearningResource = await LearningResources.findByIdAndDelete(req.params.id);
    if (!deletedLearningResource) {
      return res.status(404).json({ error: 'Learning resource not found' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
