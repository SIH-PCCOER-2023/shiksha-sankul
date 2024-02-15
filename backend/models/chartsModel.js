const mongoose = require("mongoose");

const chartSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  test: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Test",
    },
  ],
});

const Chart = mongoose.model("Chart", chartSchema);

module.exports = Chart;
