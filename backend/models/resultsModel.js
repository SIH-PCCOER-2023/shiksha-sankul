const mongoose=require('mongoose');
const validator=require('validator');

const resultSchema=mongoose.Schema(
    {
        student:{
            type:mongoose.Types.ObjectId,
            ref:'Student'
        },
        score:{
            type:Number,
            required:[true,'score is required']
        },
        totalscore:{
            type:Number,
            required:[true,'score is required']
        },
        timestamp:{type:Date,default: Date.now}
        }
)

const Results = mongoose.model("Results", resultSchema);

module.exports = Results;
