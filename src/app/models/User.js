const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcryptjs");

const salt = "$2a$12$t7M3OgpA4ML85VAwnlI10.";

const ScheduleSchema = mongoose.Schema(
  {
    day: String,
    time: [String],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    phone: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "tutor", "guest"],
      default: "guest",
    },
    balance: {
      type: Number,
      default: 0,
    },
    rating: Number,
    education: String,
    schedule: {
      type: [ScheduleSchema],
      default: undefined,
    },
    achieve: {
      type: [String],
      default: undefined,
    },
    img: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  //check password is modified or not
  if (this.isModified("password")) {
    //hashing password
    this.password = await (
      await bcrypt.hash(this.password, salt)
    ).slice(salt.length);
    //remove salt from hashed password
  }
  next();
});

userSchema.methods.comparePassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, salt.concat(originalPassword));
};

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().min(8).max(255).required(),
    password: joi.string().min(4).required(),
    rating: joi.number().min(0),
    balance: joi.number().min(0),
    education: joi.string(),
    role: joi.string(),
    phone: joi.string(),
    schedule: joi.array(),
    img: joi.string(),
    description: joi.string(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);
module.exports = {
  User,
  validate,
};
