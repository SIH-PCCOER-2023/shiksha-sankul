const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Query middleware - Pre hook
adminSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});

// Instance Methods - will be available on all documents of the schema

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
