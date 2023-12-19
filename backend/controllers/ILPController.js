const { ILP, ILPTemplate } = require("../models/ILPModel");

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

// ILP Template controller code

exports.createILPTemplate = async (req, res) => {
  const ilptemplate = new ILPTemplate(req.body);
  try {
    const newILP = await ilptemplate.save();
    res.status(201).json(newILP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all ILP templates
exports.getAllILPTemplates = async (req, res) => {
  try {
    const ilpTemplates = await ILPTemplate.find();
    res.json(ilpTemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateILPfromTemplate = async (req, res) => {
  try {
		var ilptemplateId = req.params.id;
		var userId = req.cookies.id;
    const ilptemplate = await ILPTemplate.findById(req.params.id);
    var ilp = new ILP(ilptemplate.model);
    try {
      const newILP = await ilp.save();
      res.status(201).json(newILP);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    res.json(ilp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
