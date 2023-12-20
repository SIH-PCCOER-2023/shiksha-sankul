const mongoose = require("mongoose");
const validator = require("validator");

const resourceSchema = mongoose.Schema(
    {
        title:String,
        type1:String,
        type2:String,
        url:String,
        topic:String
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

resourceSchema.virtual('type').get(function() {
    if(!this.type2){return [this.type1];}
    return [this.type1, this.type2];
  });
const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
