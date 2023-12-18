var mongoose = require("mongoose");
var path = require("path");
var excelToJson = require("convert-excel-to-json");
var multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

function importExcel2JSON(
    filePath,
    sheetName = "Sheet1",
    mappingCol2Key,
    model
) {
    // -> Read Excel File to Json Data
    // requires uploaded file path,
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [
            {
                // Excel Sheet Name
                name: sheetName,

                // Header Row -> be skipped and will not be present at our result object.
                header: {
                    rows: 1,
                },

                // Mapping columns to keys
                // columnToKey: {
                //   A: "_id",
                //   B: "name",
                //   C: "address",
                //   D: "age",
                // },
                columnToKey: mappingCol2Key,
            },
        ],
    });

    // -> Log Excel Data to Console
    //   console.log(excelData);

    /**
    { 
        Customers:
        [ 
            { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
            { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
            { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
            { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
            { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
        ] 
    }
    */

    // Insert Json-Object to MongoDB
    // model.insertMany(jsonObj, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.redirect("/");
    //   }
    // });

    fs.unlinkSync(filePath);
    return excelData;
}

exports.importExcel = (filename, sheetName, mappingCol2Key, model) => {
    const res = importExcel2JSON(filename, sheetName, mappingCol2Key, model);
    return res[sheetName];
};

exports.upload = upload;
