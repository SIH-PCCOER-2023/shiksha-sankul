const { ILP, ILPTemplate } = require("../../models/ILPModels/ILPModel");
const Resources = require("../../models/resourceModel");
const AppError = require("../../utils/appError");
const Test = require("./../../models/testModel");
const QuestionBank = require("./../../models/QuestionBankModel");
const catchAsync = require("../../utils/catchAsync");
const createILPWorker = require("./../Worker/worker");

// Get ILP by ID
// exports.getILP = async (req, res) => {
//   try {
//     const ilp = await ILP.findById(req.params.id);
//     res.json(ilp);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Get all ILPs of a specific user
exports.getILP = catchAsync(async (req, res, next) => {
  const userId = req.params.userId; // Assuming userId is passed in the URL params
  const ilps = await ILP.find({ userId });
  if (!ilps) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: ilps,
    },
  });
});

// Create a new ILP
exports.createILP = async (req, res, next) => {
  exports.createILP = async (req, res, next) => {
    var userId = req.params.userId;
    //ILP['userId']=userId;

    // Find the latest test based on the createdAt field
    const latestTest = await Test.findOne({ student: userId })
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .limit(1); // Limit to only one result, which is the latest test

    if (!latestTest) {
      return next(
        new AppError("No test found for the specified student.", 404)
      );
    }

    // Now you can use the latestTest in your logic
    //console.log(latestTest);
    const done = latestTest.incorrectQuestions;
    // console.log(done);
    const incorrectQuestionIds = done.map((value) => {
      return value;
    });
    //console.log(incorrectQuestionIds)

    //finding the individual quesions from the question banks
    const questionBankData = await QuestionBank.find({
      _id: { $in: incorrectQuestionIds },
    });
    //console.log(questionBankData);

    // Extract topics from the retrieved QuestionBank documents
    const topics = questionBankData.map((question) => question.topic);
    console.log(topics);

    // Count occurrences of each topic
    const topicCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
    // ...

    // Find topics with the maximum occurrence
    let maxTopics = [];
    let maxCount = 0;

    for (const [topic, count] of Object.entries(topicCounts)) {
      if (count === maxCount) {
        // If count is equal to maxCount, add the topic to the maxTopics array
        maxTopics.push(topic);
      } else if (count > maxCount) {
        // If count is greater than maxCount, update maxTopics with a new array containing only the current topic
        maxTopics = [topic];
        maxCount = count;
      }
    }
    const finalTopic = maxTopics[0];
    //  var ilp_lr = ilp['learningResources'];

    const learningResources = await Resources.find({ topic: finalTopic });
    console.log(learningResources);
    //   const learningResources = [{title:"1", type:"visual", url:"localhost:8080/index.html"}]
    if (!learningResources) {
      return next(new AppError("No document found with that ID", 404));
    }
    // ilp['learningResources'] = learningResources;
    console.log(ilp);
    var ilp = new ILP({
      userId: userId,
      learningResources: learningResources,
      weakTopics: finalTopic,
    });

    const newILP = await ilp.save();
    if (!newILP) {
      return next(new AppError("Failed to save the ILP", 404));
    }
    res.status(201).json(newILP);
  };
};

// Update ILP by ID
exports.updateILP = catchAsync(async (req, res, next) => {
  const updatedILP = await ILP.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedILP) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: updatedILP,
    },
  });
});
exports.createILPWorker = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newILP = await createILPWorker(userId);
    res.status(201).json(newILP);
  } catch (error) {
    next(error); // Pass any error to the error handler middleware
  }
};

// Delete ILP by ID
exports.deleteILP = catchAsync(async (req, res, next) => {
  const doc = await ILP.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "ILP deleted",
  });
});
