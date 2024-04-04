const mongoose = require('mongoose');

const ilpTemplateSchema = new mongoose.Schema
(
  {
    templateName: String,
    model: 
    {
      type: Object,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ilpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
    //templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'ILPTemplate' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    goals: 
    [
      {
        title: String,
        status: {
          type: String,
          enum: ['PENDING', 'COMPLETE'],
          default: 'PENDING',
          required:true
        },
        dueDate: Date,
        progress: Number,
      },
    ],
    learningResources: [Object],
    // {
    //     title: String,
    //     type: String,
    //     url: String,
    //   },
    notes: [Object],
    weakTopics: [String]
  },
  { strict: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ilpTestSchema=new mongoose.Schema(  )

const ILPTemplate = mongoose.model('ILPTemplate', ilpTemplateSchema);
const ILP = mongoose.model('ILP', ilpSchema);



module.exports.ILP = ILP;
module.exports.ILPTemplate = ILPTemplate;
// module.exports = Communication;
// module.exports = Analytics;


// const communicationSchema = new mongoose.Schema({
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     message: String,
//     timestamp: { type: Date, default: Date.now },
// });

// const Communication = mongoose.model("Communication", communicationSchema);

// const analyticsSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
//     ilpId: { type: mongoose.Schema.Types.ObjectId, ref: "ILP" },
//     eventType: String,
//     details: String,
//     timestamp: { type: Date, default: Date.now },
// });

// const Analytics = mongoose.model("Analytics", analyticsSchema);