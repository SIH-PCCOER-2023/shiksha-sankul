const mongoose = require('mongoose');
const validator = require('validator');

const examSchema = mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    phoneno: {
      type: Number,
      required: [true, 'Please enter you phone no.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Exam = mongoose.model('Exam', facultySchema);

module.exports = Exam;
