const mongoose = require('mongoose');
const validator = require('validator');



const adminSchema = mongoose.Schema(
    {
       /* admin :{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
      
      idcard :{
        type:String,
        required:[true,'please upload your id card'],
        default:'id.jpg'
      },*/
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: ['true', 'Please provide a email address'],
        validate: [validator.isEmail, 'Please provide a valid email address'],
      },
      password: {
        type: String,
        required: ['true', 'Please provide a password'],
        //minlength: [8, 'Password length must be atleast 8'],
        select: false,
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
          message: 'Passwords do not match',
        }
      },
      


      
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );


 


/*
  adminSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12 using (bcrypt)
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });
  
  adminSchema.pre('save', function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });
  
  // Query middleware - Pre hook
  adminSchema.pre(/^find/, function (next) {
    // this points to current query
    this.find({ active: { $ne: false } });
    next();
  });
  
  // Instance Methods - will be available on all documents of the schema
  adminSchema.methods.comparePassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimeStamp;
    }
    return false;
  };
  
  adminSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };*/
  
  const Admin=mongoose.model('Admin',adminSchema);

  module.exports=Admin;