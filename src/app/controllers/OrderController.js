const Order = require("../models/Order");
const { User } = require("../models/User");
const Course = require("../models/Course");

class OrderController {
  async findOne(req, res, next) {
    try {
      let order = await Order.findById(req.params.id)
        .populate("student", "name phone")
        .populate("course", "name price")
        .lean();
      res.json({
        order,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    }
  }
  async updateOne(req, res, next) {
    try {
      let order = await Order.findByIdAndUpdate(req.params.id, req.body);
      if (order) {
        if (req.body.status === "confirmed") {
          let course = await Course.findById(order.course);
          let user = await User.findById(course.tutor);
          user.balance += req.body.tutorEarn;
          await user.save();
        }
        res.status(201).json({
          status: "success",
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "Không tìm thấy ID này",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
    }
  }
}

module.exports = new OrderController();
