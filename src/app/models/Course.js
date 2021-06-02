const mongoose = require("mongoose");
const { User } = require("./User");
const CourseSchema = mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  img: String,
  description: String,
  rating: Number,
  votes: Number,
  student: Number,
  time: Number,
  plan: [String],
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
