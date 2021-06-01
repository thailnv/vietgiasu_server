const mongoose = require("mongoose");
const Tutor = require("./Tutor");
const CourseSchema = mongoose.Schema({
  name: String,
  price: String,
  type: String,
  img: String,
  description: String,
  rating: Number,
  votes: Number,
  student: Number,
  time: Number,
  plan: [String],
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "tutor" },
});

const CourseModel = mongoose.model("course", CourseSchema);

class Course {
  async create(course, result) {
    let doc = new CourseModel(course);
    await doc
      .save()
      .then((doc) => {
        result.status = "success";
        result.name = doc.name;
        result.id = doc._id;
      })
      .catch(() => {
        result.status = "fail";
      });
  }

  async findAll(data) {
    await CourseModel.find({})
      .populate("tutor")
      .lean()
      .then((courses) => {
        data.courses = courses;
      })
      .catch(() => {
        data.customers = [];
      });
  }

  async findOne(id, data) {
    console.log(id);
    await CourseModel.findById(id)
      .populate("tutor")
      .lean()
      .then((course) => {
        data.course = course;
      })
      .catch((err) => {
        console.log(err);
        data.course = {};
      });
  }

  async findHotCourse(data) {
    await CourseModel.find({})
      .populate("tutor")
      .sort("-student")
      .limit(5)
      .lean()
      .then((course) => {
        data.hotCourse = course;
      })
      .catch((err) => {
        console.log(err);
        data.course = {};
      });
  }

  async findNewCourse(data) {
    await CourseModel.find({})
      .populate("tutor")
      .sort("-_id")
      .limit(5)
      .lean()
      .then((course) => {
        data.newCourse = course;
      })
      .catch((err) => {
        console.log(err);
        data.course = {};
      });
  }
}

module.exports = new Course();
