

const mongoose=require('mongoose');
const validator=require('validator');



const testSchema= mongoose.Schema(
    
    {
        test:{
            type:mongoose.Schema.ObjectId,

        },

        name:{
            type:String,
            required:[true,'Please enter your name'],
        },
        subject:{
            type:String,
            required:[true,'please enter the topic ']
        
        },
        marks:{
            type:Number,
            required:[true,'please enter the topic ']
        },
        level:{
            type:String,
            required:[true,'please enter the topic ']

        },
        explanation:{
            type:String
        },
        topic:{
            type:String,
            required:[true,'please enter the topic ']
        },
        subtopic:{
            type:String,
            required:[true,'please enter the subtopic ']
        },
        A:{
            type:String
        },
        B:{
            type:String
        },
        C:{
            type:String
        },
        D:{
            type:String
        },
        correctanswer:{
            type:String,
            required:[true,'give the corrected answer']
        },


        


    
      
        
      


    }
);


const Test=mongoose.model('Test',testSchema);

module.exports=Test;

