const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  used: {
    type: Number,
    default: 0
  }
});


const Tag = mongoose.model("Tag", tagSchema);


//exports.tagSchema = tagSchema;
module.exports=Tag;