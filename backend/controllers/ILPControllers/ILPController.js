const { ILP, ILPTemplate } = require("../../models/ILPModels/ILPModel");

// Get ILP by ID
exports.getILP = async (req, res) => {
  try {
    const ilp = await ILP.findById(req.params.id);
    res.json(ilp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ILP
exports.createILP = async (req, res) => {
  const ilp = new ILP(req.body);
  try {
    const newILP = await ilp.save();
    res.status(201).json(newILP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update ILP by ID
exports.updateILP = async (req, res) => {
  try {
    const updatedILP = await ILP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedILP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ILP by ID
exports.deleteILP = async (req, res) => {
  try {
    await ILP.findByIdAndDelete(req.params.id);
    res.json({ message: "ILP deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
