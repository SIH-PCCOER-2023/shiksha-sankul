const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');

const AppError = require('../utils/appError');
const University = require('./../models/universityModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// Get University of Current User
exports.getUniversityOfUser = catchAsync(async (req, res, next) => {
  const universityAdmin = req.user.id;

  if (!universityAdmin) {
    return next(new AppError('You are not allowed to access this page', 400));
  }

  const universityData = await University.findOne({ universityAdmin });

  if (!universityData) {
    return next(
      new AppError('A document with that ID could not be found', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: universityData,
    },
  });
});

// Creating new s3 instance
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// Multer Configuration
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'ss-textract-async-process',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const suffix = path.extname(file.originalname);
      const length = req.files.length - 1;
      const names = req.body.names;
      const finalNames = names.split(',');

      let year = '';
      let uniName = '';

      if (length === 0) {
        uniName = finalNames[0].split('-')[0];
        year = finalNames[0].split('-')[1];
      } else if (length === 1) {
        uniName = finalNames[1].split('-')[0];
        year = finalNames[1].split('-')[1];
      } else if (length === 2) {
        uniName = finalNames[2].split('-')[0];
        year = finalNames[2].split('-')[1];
      } else {
        uniName = finalNames[3].split('-')[0];
        year = finalNames[3].split('-')[1];
      }

      cb(
        null,
        `${uniName}/${req.body.categoryOfDepartment}/${
          req.body.nameOfDepartment
        }/${year}-${uuid()}${suffix}`
      );
    },
  }),
});

exports.uploadS3 = upload.array('syllabus', 4);

// Upload Syllabus to AWS and Store link in MongoDb
exports.uploadSyllabus = catchAsync(async (req, res, next) => {
  const files = req.files;

  // Getting new data
  const id = req.params.id;
  const { categoryOfDepartment, nameOfDepartment, nameOfHod } = req.body;

  const newSyllabusOfDepartment = [];

  files.forEach(async (file) => {
    const uploaded = file.location;
    newSyllabusOfDepartment.push(uploaded);
  });

  // New Department Info
  const newDepartmentsInfo = {
    categoryOfDepartment: categoryOfDepartment,
    nameOfDepartment: nameOfDepartment,
    nameOfHod: nameOfHod,
    syllabusOfDepartment: newSyllabusOfDepartment,
  };

  // Getting Old Data
  const oldUnivesityData = await University.findById(id);
  const oldDepartmentInfo = [...oldUnivesityData.departmentsInfo];

  const updatedUniversityData = await University.updateOne(
    { _id: id },
    { departmentsInfo: [...oldDepartmentInfo, newDepartmentsInfo] }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUniversityData,
    },
  });
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const university = await University.findById(req.params.id);

  if (!university) {
    return next(
      new AppError('A document with that id could not be found', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: university,
  });
});

// CRUD Operations
exports.getUniversity = factory.getOne(University);
exports.getAllUniversities = factory.getAll(University);

exports.createUniversity = factory.createOne(University);
exports.updateUniversity = factory.updateOne(University);
exports.deleteUniversity = factory.deleteOne(University);
