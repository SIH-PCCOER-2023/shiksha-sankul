const { request } = require("http");
const mongoose = require("mongoose");
const validator = require("validator");

const facultySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// facultySchema.post(/^find/, async function (doc, next) {
//     const requestObject = {
//         request: {
//             type: "GET",
//             url: "req.originalUrl" + "/" + doc._id,
//         },
//     };
//     // Object.assign(requestObject, doc._doc);
//     Object.assign(doc._doc, requestObject);

//     // return requestObject;

//     next();
// });

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
