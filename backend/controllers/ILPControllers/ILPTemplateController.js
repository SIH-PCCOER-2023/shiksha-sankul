const { types } = require('node-sass');
const { ILP, ILPTemplate } = require('../../models/ILPModels/ILPModel');
const Resources = require('../../models/resourceModel')
const AppError = require("../../utils/appError");

// Get ILP by ID
exports.getILPTemplate = async (req, res) => {
  try {
    const ilp = await ILPTemplatefindById(req.params.id);
    res.json(ilp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ILP Template
exports.createILPTemplate = async (req, res) => {
  const ilp = new ILP(req.body);
  try {
    const newILP = await ilp.save();
    res.status(201).json(newILP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update ILP by ID
exports.updateILPTemplate = async (req, res) => {
  try {
    const updatedILP = await ILPTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedILP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete ILP by ID
exports.deleteILPTemplate = async (req, res) => {
  try {
    await ILPTemplatefindByIdAndDelete(req.params.id);
    res.json({ message: 'ILP deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// generate ilp
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
    console.log(ILP);
    const ilpTemplates = await ILPTemplate.find();
    ilpTemplates.map((template)=>{
        template['path'] = `http://localhost:8080/ilptemplates/generateILP/${template._id}/:userId`
    })
    res.json(ilpTemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateILPfromTemplate = async (req, res,next) => {
  var ilptemplateId = req.params.templateId;
  var userId = req.params.userId;
  const ilptemplate = await ILPTemplate.findById(ilptemplateId);
  var ilp = new ILP(ilptemplate.model);
  ilp['userId'] = userId;
  var ilp_lr = ilp['learningResources'];

  const learningResources = await Resources.find({ type1: ilp_lr });
//   const learningResources = [{title:"1", type:"visual", url:"localhost:8080/index.html"}]
  if (!learningResources) {
    return next(new AppError('No document found with that ID', 404));
  }
  ilp['learningResources'] = learningResources;
  const newILP = await ilp.save();
  if (!newILP) {
    return next(new AppError('Failed to save the ILP', 404));
  }
  res.status(201).json(newILP);
};
