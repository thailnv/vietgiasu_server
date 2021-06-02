const mongoose = require("mongoose");

const { User } = require("./User");
const Course = require("./Course");

const OrderSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  time: [String],
  status: {
    type: String,
    enum: ["denied", "confirmed", "pending"],
    default: "pending",
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
