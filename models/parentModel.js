const mongoose = require('mongoose');
const validator = require('validator');



const parentSchema = mongoose.Schema(
    {
        
      name:{
        type:String,
        required:[true,'Please enter your name'],
      },
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: ['true', 'Please provide a email address'],
        validate: [validator.isEmail, 'Please provide a valid email address'],
      },
      password: {
        type: String,
        required: ['true', 'Please provide a password'],
        //minlength: [8, 'Password length must be atleast 8'],
        select: false,
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
          message: 'Passwords do not match',
        }
      },


      phoneno : {
        type:Number,
        required:[true,'Please enter you phone no.']
      }

      
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );


  const Parent=mongoose.model('Parent',parentSchema);

  module.exports=Parent;