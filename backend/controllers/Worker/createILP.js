// createILP.js
const { processILP } = require('./worker');
const ILP = require('./../../models/ILPModels/ILPModel');
const AppError = require("../../utils/appError");

exports.createILP = async (userId) => { // Modified to accept userId parameter
  try {
    const ilpData = await processILP(userId);
    console.log(ilpData);
    const newILP = await ILP.create(ilpData);
    return newILP; // Return the newly created ILP
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
