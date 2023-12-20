const mongoose=require('mongoose');
const validator=require('validator');

const resultSchema=mongoose.Schema(
    {   
        student:{
            type:mongoose.Types.ObjectId,
            ref:'Student'
        },
        timestamp:{
            type:date,
        
        },
        score:{
            type:Number,
            required:[true,'score is required']
        },
        totalscore:{
            type:Number,
            required:[true,'score is required']
        },
        



    }
)