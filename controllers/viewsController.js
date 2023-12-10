const catchAsync = require('../utils/catchAsync');

exports.getLoginUserType = catchAsync(async (req, res, next) => {
  res.status(200).render('login-user-type', {
    title: 'User Type',
  });
});
