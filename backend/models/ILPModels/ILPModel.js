const mongoose = require("mongoose");

const ilpTemplateSchema = new mongoose.Schema({
  templateName: String,
  model: {
    type: Object,
  },
});

const ilpSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
      templateId: { type: mongoose.Schema.Types.ObjectId, ref: "ILPTemplate" },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      goals: [
        {
          name: String,
          status: String,
          dueDate: Date,
          progress: Number,
        },
      ],
      learningResources: [
        {
          title: String,
          type: String,
          url: String,
        },
      ],
      notes: String,
    },
    { strict: false }
  );

const ILPTemplate = mongoose.model("ILPTemplate", ilpTemplateSchema);
const ILP = mongoose.model("ILP", ilpSchema);

module.exports = ILPTemplate;
module.exports = ILP;

const communicationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Communication = mongoose.model("Communication", communicationSchema);

module.exports = Communication;

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  ilpId: { type: mongoose.Schema.Types.ObjectId, ref: "ILP" },
  eventType: String,
  details: String,
  timestamp: { type: Date, default: Date.now },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
