const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const { protect } = require("./controllers/authController");

// Requiring modules
const authRoutes = require("./routes/authRoutes");
const viewRouter = require("./routes/viewRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const questionBankRoutes = require("./routes/questionBankRoutes");
const ILPRoutes = require("./routes/ILPRoutes/ILPRoutes");
const ILPTemplateRoutes = require("./routes/ILPRoutes/ILPTemplateRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const slowResourcesRoutes = require("./routes/slowResourcesRoutes");
const fastResourcesRoutes = require("./routes/fastResourcesRoutes");
const testRoutes = require("./routes/testRoutes");
const catchAsync = require("./utils/catchAsync");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/discussionForumRoutes/postsRoutes");
const replyRoutes = require("./routes/discussionForumRoutes/replyRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const slowLearnerPdfRoutes = require("./routes/slowLearnerPdfRoutes");
const fastLearnerPdfRoutes = require("./routes/fastLearnerPdfRoutes");
const tagsRoutes=require("./routes/discussionForumRoutes/tagsRoutes")
const todoListRoutes=require('./routes/todoListRoutes');
const ILPResourcesRoutes=require("./routes/ILPRoutes/ILPResourcesRoutes");
const User = require("./models/userModel");

// const predict = require('./ML/predict');

// Create express app
const app = express();
app.enable("trust-proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views", "templates"));

/* Global Middleware */

// Implement CORS
// app.use(cors());

// Access-Control-Allow-Origin *
// app.options('*', cors());
app.use(cookieParser()); // To parse the incoming cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Development Logging
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Cookie Session
app.use(
  cookieSession({
    name: "session",
    keys: ["shikshasankul"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// app.get(
//   '/api/v1/mlprediction',
//   catchAsync(async (req, res, next) => {
//     const newFeatures = req.body.newFeatures;
//     let independantFeatures = [];
//     let dependantFeature = [];

//     const users = await User.find();

//     for (let user of users) {
//       let marks;

//       if (user.marks) {
//         marks = user.marks;
//       }

//       marks && independantFeatures.push(marks.slice(3));
//       marks && dependantFeature.push(marks[marks.length - 1]);
//     }

//     // Run the Python script as a child process
//     // const command = `python model.py '${JSON.stringify({ oldFeatures })}'`;

//     // exec(command, (error, stdout, stderr) => {
//     //   if (error) {
//     //     console.error(`Error: ${error.message}`);
//     //     return res.status(500).json({ error: 'Internal Server Error' });
//     //   }
//     //   const predictions = JSON.parse(stdout).predictions;

//     //   res.status(200).json({ data: predictions });
//     // });
//     res.status(200).json({
//       dependantFeature,
//       independantFeatures,
//     });
//   })
// );

app.use("/api/v1/auth", authRoutes);
// app.use(protect);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/questions", questionBankRoutes);
app.use("/api/v1/ilps", ILPRoutes);
app.use("/api/v1/ilptemplates", ILPTemplateRoutes);
app.use("/api/v1/ilpresources",ILPResourcesRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/slowLearningResources",slowResourcesRoutes );
app.use("/api/v1/fastLearningResources",fastResourcesRoutes );
app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/postforums", postRoutes);
app.use("/api/v1/replyforums", replyRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/slowLearnerPdf",slowLearnerPdfRoutes);
app.use("/api/v1/fastLearnerPdf",fastLearnerPdfRoutes);
app.use("/api/v1/tagforums", tagsRoutes);
app.use("/api/v1/todolist",todoListRoutes);
// app.get('/api/v1/ml-prediction', predict);

// Rendered Routes

app.use("/", viewRouter);

app.all("*", function (req, res, next) {
  // Other than defined route
  next(
    new AppError(
      `Can't find the requested url ${req.originalUrl} on this server!`,
      404
    )
  );
});

// 3.) Global Error Handling
app.use(globalErrorHandler);

// Export app
module.exports = app;
