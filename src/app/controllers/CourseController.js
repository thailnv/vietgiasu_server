const Convert = require("../../util/mongoose");
const Course = require("../models/Course");

class CourseController {
  async findOne(req, res, next) {
    let data = {};
    await Course.findOne(req.params.id, data);
    let { course } = data;
    let totalBenefit = course.plan.length;
    course.plan1 = course.plan.slice(0, Math.ceil(totalBenefit / 2));
    course.plan2 = course.plan.slice(Math.ceil(totalBenefit / 2));
    res.json({
      course,
    });
  }
  async findAll(req, res, next) {
    let data = {};
    await Course.findAll(data);
    let { courses } = data;
    res.json({ courses });
  }
  async regis(req, res, next) {
    res.json({
      status: "success",
    });
  }
}

module.exports = new CourseController();
