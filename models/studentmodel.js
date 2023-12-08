const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./userModel');


const studentSchema = mongoose.Schema(
    {
        student : {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
      class : {
        type:Number,
        required:[true,'enter the class']
      },
      rollno :{
        type:Number,
        required:[true,'Enter the roll no ']
      },
      class10th: {
        type:Number,
        required:[true,'Enter the class 10th marks']
      },
      class12th:{
        type:Number,
        required:[true,'Enter the class 12th marks']
      },

    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );



  const Student= mongoose.model('Student',studentSchema);

  module.exports=Student;