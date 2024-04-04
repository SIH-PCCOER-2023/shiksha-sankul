const { ILP, ILPTemplate } = require("../../models/ILPModels/ILPModel");
const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/appError");
const APIFeatures = require("./../../utils/apiFeatures");
const { upload, importExcel } = require("./../../utils/excellImportApi");
const Test=require('./../../models/testModel');
const Resource=require('./../../models/resourceModel');
const QuestionBank=require('./../../models/QuestionBankModel');

exports.createResourcesILP = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;

    // Find the latest test based on the createdAt field
    const latestTest = await Test.findOne({ student: studentId })
        .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
        .limit(1); // Limit to only one result, which is the latest test

    if (!latestTest) {
        return next(new AppError('No test found for the specified student.', 404));
    }

    // Now you can use the latestTest in your logic
    //console.log(latestTest);
    const done=latestTest.incorrectQuestions;
   // console.log(done);
    const incorrectQuestionIds = done.map((value)=>{
        return value;
     });
     //console.log(incorrectQuestionIds)
    //finding the individual quesions from the question banks
    const questionBankData = await QuestionBank.find({ _id: { $in: incorrectQuestionIds } });
    

    // Extract topics from the retrieved QuestionBank documents
    const topics = questionBankData.map(question => question.topic);
    console.log(topics)

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

console.log('Max Topics:', maxTopics, 'Max Count:', maxCount);

    // Continue with your logic...


    

    res.status(201).json({
        status: 'success',
        data: {
            updated:{
                latestTest
            },
            maxTopics
        }
    });
});

