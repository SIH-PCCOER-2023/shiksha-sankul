const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Admin = require("./adminModel");
const Student = require("./studentModel");
const Faculty = require("./facultyModel");
const Parent = require("./parentModel");

const SALT_ROUNDS = 12;

// Creating user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: ["true", "Please provide your first name"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: ["true", "Please provide a email address"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    phoneno: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ["STUDENT", "FACULTY", "ADMIN", "PARENT"],
        message: "The value {VALUE} is not supported",
      },
      required: [true, "Please provide a user type"],
      default: "STUDENT",
    },
    password: {
      type: String,
      required: ["true", "Please provide a password"],
      select: false,
      default: "student",
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],

      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
      //   default: bcrypt.hashSync("student", SALT_ROUNDS),
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, strict: false }
);

// Document middleware - Pre hook
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12 using (bcrypt)
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.post("save", async function (doc) {
  console.log("%s has been saved", doc._id);
  if (doc.type === "STUDENT") {
    await Student.create({
      user: doc._id,
      class: this.class,
      rollno: this.rollno,
      learnerType: this.learnerType,
    });
  } else if (doc.type === "FACULTY") {
    await Faculty.create({
      user: doc._id,
    });
  } else if (doc.type === "ADMIN") {
    await Admin.create({
      user: doc._id,
    });
  } else if (doc.type === "PARENT") {
    await Parent.create({
      user: doc._id,
    });
  }
});

// Query middleware - Pre hook
userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});

// Instance Methods - will be available on all documents of the schema
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Creating user Model
const User = mongoose.model("User", userSchema);

// Exporting User Model
module.exports = User;
