const mongoose = require('mongoose');
const validator = require('validator');



const facultySchema = mongoose.Schema(
    {
        faculty :{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
      
      /*idcard :{
        type:String,
        required:[true,'please upload your id card'],
        default:'id.jpg'
      },*/
      phoneno : {
        type:Number,
        required:[true,'Please enter you phone no.']
      }

      
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );


  const Faculty=mongoose.model('Faculty',facultySchema);

  module.exports=Faculty;