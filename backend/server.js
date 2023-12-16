const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuring environment variables
dotenv.config({
  path: './.env',
});

// Require app
const app = require('./app');

// DB Configuration
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('Database connected successfully');
});

// PORT
const port = process.env.PORT || 3000;

// Connect to server
app.listen(port, () => {
  console.log(`Express app started in ${app.get('env')} mode on port ${port} `);
});
