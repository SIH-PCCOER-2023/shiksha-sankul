const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("./../models/primary schema/coursesModel");
const Industry = require("./../models/primary schema/industryModel");

dotenv.config({ path: "./.env" });

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfull!"));

// READ JSON FILE

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, "utf-8")
);
const industry = JSON.parse(
  fs.readFileSync(`${__dirname}/industry.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Course.create(foods, { validateBeforeSave: false });
    await Industry.create(users, { validateBeforeSave: false });

    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Course.deleteMany();
    await Industry.deleteMany();

    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
