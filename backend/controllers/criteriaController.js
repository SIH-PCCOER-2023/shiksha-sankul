const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const Criteria=require('../models/criteriaModel');

/*const categorizeByTenthMarks = (data) => {
    const categorizedData = {
        fastLearners: [],
        intermediateLearners: [],
        slowLearners: [],
    };

    data.forEach((item) => {
        const tenthMarks = item.tenthMarks; // Assuming tenthMarks property exists in the Criteria model

        if (tenthMarks >= 60) {
            categorizedData.highAchievers.push(item);
        } else if (tenthMarks >= 60 && tenthMarks < 80) {
            categorizedData.averagePerformers.push(item);
        } else {
            categorizedData.belowAverage.push(item);
        }
    });

    return categorizedData;
};

const categorizeByTwelfthMarks = (data) => {
    const categorizedData1 = {
        fastLearners: [],
        intermediateLearners: [],
        slowLearner: [],
    };

    data.forEach((item) => {
        const twelfthMarks = item.twelfthMarks; // Assuming twelfthMarks property exists in the Criteria model

        if (twelfthMarks >= 60) {
            categorizedData.highAchievers.push(item);
        } else if (twelfthMarks >= 40 && twelfthMarks < 60) {
            categorizedData.averagePerformers.push(item);
        } else {
            categorizedData.belowAverage.push(item);
        }
    });

    return categorizedData1;
};

const categorizeByPrerequisite=(data)=>{
    const categorizeData2={
        fastLearners: [],
        intermediateLearners: [],
        slowLearner: [],
    };

    data.forEach((item)=>{
        const prerequisite=item.prerequisite;
        if (prerequisite >= 60) {
            categorizedData2.highAchievers.push(item);
        } else if (prerequisite >= 40 && prerequisite < 60) {
            categorizedData2.averagePerformers.push(item);
        } else {
            categorizedData2.belowAverage.push(item);
        }

    });
    return categorizedData2;

}*/

const categorizeFastLearner=(data)=>{
    const fastLearners=[];

    data.forEach((item) => {
        const tenthMarks=item.tenthMarks;
        const twelthMarks=item.twelthMarks;
        const prerequisiteMarks=item.prerequisiteMarks;
        if (tenthMarks>=60 && twelthMarks>=60){
            fastLearners.push(item);
    
        }
        else if(twelthMarks>60 && prerequisiteMarks>50){
            fastLearners.push(item);

        }
    });
    return fastLearners;


}
const categorizeSlowLearner=(data)=>{
    const slowLearners=[];

    data.forEach((item)=>{
        const tenthMarks=item.tenthMarks;
        const twelthMarks=item.twelthMarks;
        const prerequisiteMarks=item.prerequisiteMarks;
        if(tenthMarks<=40 && twelthMarks<=40){
            slowLearners.push(item);
        } 
        else if(twelthMarks<40 && prerequisiteMarks<=40){
            slowLearners.push(item);
        }
    })
}
const categorizeIntermediateLearner=(data)=>{
    const intermediateLearners=[];

    data.forEach((item)=>{
        const tenthMarks=item.tenthMarks;
        const twelthMarks=item.twelthMarks;
        const prerequisiteMarks=item.prerequisiteMarks;
        if(tenthMarks>=40 && tenthMarks<=60){
            intermediateLearners.push(item);
        } 
        else if(twelthMarks>=40 && twelthMarks<=60){
            intermediateLearners.push(item);
        }
        else if(prerequisiteMarks>=40 && prerequisiteMarks<=60){
            
        }
    })
}









const createCriteria=catchAsync(async(req,res,next)=>{
    const done= await Criteria.find();

    if(!done){
        return nect(new AppError("no such criteria found",404));
    }
    const FastLearner=await categorizeFastLearner(done);
    const slowLarner=await categorizeSlowLearner(done);
    const intermediate=await categorizeIntermediateLearner(done);
    res.status(200).json({
        status:"success",
    
    })



})

