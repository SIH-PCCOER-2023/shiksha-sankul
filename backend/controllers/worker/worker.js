const Test = require('./../../models/testModel'); // Import your Test model
const QuestionBank = require('./../../models/QuestionBankModel'); // Import your QuestionBank model
const Resources = require('./../../models/resourceModel'); // Import your Resources model
const { ILP, ILPTemplate } = require('../../models/ILPModels/ILPModel'); // Import your ILP model
const AppError = require('./../../utils/appError'); // Import your AppError utility
const Pdf=require('./../../models/pdfModel');

async function createILP(userId) {
  try {
    // Find the latest test based on the createdAt field
    const latestTest = await Test.findOne({ student: userId }).sort({ createdAt: -1 }).limit(1);
    console.log(latestTest)

    if (!latestTest) {
      throw new AppError('No test found for the specified student.', 404);
    }

    const done = latestTest.incorrectQuestions;
    const incorrectQuestionIds = done.map(value => value);

    // Finding individual questions from the question banks
    const questionBankData = await QuestionBank.find({ _id: { $in: incorrectQuestionIds } });

    // Extract topics from the retrieved QuestionBank documents
    const topics = questionBankData.map(question => question.topic);

    // Count occurrences of each topic
    const topicCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});

    // Find topics with the maximum occurrence
    let maxTopics = [];
    let maxCount = 0;

    for (const [topic, count] of Object.entries(topicCounts)) {
      if (count === maxCount) {
        maxTopics.push(topic);
      } else if (count > maxCount) {
        maxTopics = [topic];
        maxCount = count;
      }
    }

    const finalTopic = maxTopics[0];

    // Find learning resources for the final topic
    const learningResources = await Resources.find({ topic: finalTopic });
    console.log(learningResources);

    if (!learningResources) {
      throw new AppError('No learning resources found for the final topic.', 404);
    }

    //appending notes 
    const pdfResources=await Pdf.find({title:finalTopic});
    console.log(pdfResources);

    if (!pdfResources) {
      throw new AppError('No learning resources found for the final topic.', 404);
    }

    // Create a new ILP document
    const newILP = new ILP({
      userId: userId,
      learningResources: learningResources,
      weakTopics: finalTopic,
      notes:pdfResources
    });
    console.log(newILP);

    // Save the new ILP
    const savedILP = await newILP.save();

    if (!savedILP) {
      throw new AppError('Failed to save the ILP.', 500);
    }

    return savedILP;
  } catch (error) {
    throw error;
  }
}

module.exports = createILP;
