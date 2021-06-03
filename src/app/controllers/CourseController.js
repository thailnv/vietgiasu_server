const Convert = require("../../util/mongoose");
const Course = require("../models/Course");
const Order = require("../models/Order");
const { User } = require("../models/User");

class CourseController {
  async findOne(req, res, next) {
    let course = await Course.findById(req.params.id).populate("tutor").lean();
    let totalBenefit = course.plan.length;
    course.plan1 = course.plan.slice(0, Math.ceil(totalBenefit / 2));
    course.plan2 = course.plan.slice(Math.ceil(totalBenefit / 2));
    res.json({
      course,
    });
  }

  async findAll(req, res, next) {
    let courses = await Course.find({})
      .populate("tutor", "name")
      .select("-schedule -description -plan");
    res.json({ courses });
  }

  async regis(req, res, next) {
    try {
      let user = await User.findById(req.body.user_id);
      let course = await Course.findById(req.body.course_id);
      console.log(user, course);
      user.balance = user.balance - course.price * req.body.time.length;
      await user.save();
      let order = await Order.create({
        student: req.body.user_id,
        course: req.body.course_id,
        time: req.body.time,
      });
      req.body.confirmLink = `https://www.giasuviet.online/xac-nhan/${order._id}`;
      console.log(req.body.confirmLink);
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    }
  }
}

module.exports = new CourseController();
