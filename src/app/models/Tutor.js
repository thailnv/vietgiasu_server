const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema({
  day: String,
  time: [String],
});

const TutorSchema = mongoose.Schema({
  name: String,
  rating: Number,
  education: String,
  schedule: [ScheduleSchema],
});

const TutorModel = mongoose.model("tutor", TutorSchema);

class Tutor {
  async create(course, result) {
    let doc = new TutorModel(course);
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
    TutorModel.find({})
      .then((courses) => {
        courses = Convert.cvDataToObjects(courses);
        data.customers = customers;
      })
      .catch(() => {
        data.customers = [];
      });
  }

  async findOne(id, data) {
    console.log(id);
    await TutorModel.findById(id)
      .lean()
      .then((tutor) => {
        data.tutor = tutor;
      })
      .catch((err) => {
        console.log(err);
        data.tutor = {};
      });
  }
}

module.exports = new Tutor();
