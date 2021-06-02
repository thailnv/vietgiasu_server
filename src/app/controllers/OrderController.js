const Order = require("../models/Order");

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
}

module.exports = new OrderController();
