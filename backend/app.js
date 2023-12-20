const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { exec } = require('child_process');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { protect } = require('./controllers/authController');

// Requiring modules
const authRoutes = require('./routes/authRoutes');
const viewRouter = require('./routes/viewRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const ILPRoutes = require('./routes/ILPRoutes/ILPRoutes');
const ILPTemplateRoutes = require('./routes/ILPRoutes/ILPTemplateRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const testRoutes = require('./routes/testRoutes');
const catchAsync = require('./utils/catchAsync');

const User = require('./models/userModel');


// Create express app
const app = express();
app.enable('trust-proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'templates'));

/* Global Middleware */

// Implement CORS
// app.use(cors());

// Access-Control-Allow-Origin *
// app.options('*', cors());
app.use(cookieParser()); // To parse the incoming cookies
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development Logging
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
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
    name: 'session',
    keys: ['shikshasankul'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.post(
  '/api/v1/mlprediction/:id',
  catchAsync(async (req, res, next) => {
    const newFeatures = req.body.newFeatures;
    const users = await User.find();
    var currentUsermarks = [0, 0, 0];
    const commandpredict = `python3 ./ML/model-predict.py '${currentUsermarks}'`;
    exec(commandpredict, async (error, stdout, stderr) => {
      // console.log(stdout);
      const prediction = parseFloat(stdout);
      if (prediction > 60 && newFeatures.features[2] > prediction) {
        console.log('done');

        await User.findByIdAndUpdate(req.params.id, { learnerType: 'ADVANCED' },{
            new:true
        });
      } else {
        await User.findByIdAndUpdate(req.params.id, { learnerType: 'SLOW' },{
            new:true
        });
      }
      console.log(prediction);
      res
        .status(200)
        .json(`{'status' : 'success', 'prediction':'${prediction}'}`);
    });
  })
);

app.use('/api/v1/auth', authRoutes);
// app.use(protect);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/questions', questionBankRoutes);
app.use('/api/v1/ilps', ILPRoutes);
app.use('/api/v1/ilptemplates', ILPTemplateRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/tests', testRoutes);
// app.get('/api/v1/ml-prediction', predict);

// Rendered Routes

app.use('/', viewRouter);

app.all('*', function (req, res, next) {
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
