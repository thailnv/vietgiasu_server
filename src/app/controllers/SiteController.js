const { promisify } = require("util");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { create } = require("lodash");

const { User } = require("../models/User");
const Course = require("../models/Course");
const { fail } = require("assert");

const jwt_secret = "ahjwWIU12";
const jwt_time = 3600000;

const createToken = (user) => {
  return jwt.sign({ user }, jwt_secret, {
    expiresIn: jwt_time,
  });
};

class SiteController {
  async index(req, res, next) {
    let data = {};
    await Course.find({})
      .select("-description -plan -type -time")
      .populate("tutor", "name")
      .sort("-student")
      .limit(5)
      .lean()
      .then((course) => {
        data.hotCourse = course;
      })
      .catch((err) => {
        console.log(err);
        data.hotCourse = {};
      });
    await Course.find({})
      .select("-description -plan -type -time")
      .populate("tutor", "name")
      .sort("-_id")
      .limit(5)
      .lean()
      .then((course) => {
        data.newCourse = course;
      })
      .catch((err) => {
        console.log(err);
        data.newCourse = {};
      });
    res.json({ data });
  }

  async signup(req, res, next) {
    console.log("Signup request data: ", req.body);
    try {
      const doc = await User.findOne({ email: req.body.email });
      if (doc) {
        res.status(400).json({
          status: "fail",
          message: "Email đã được sử dụng!",
        });
      } else {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          balance: req.body.balance,
          phone: req.body.phone,
        });

        if (user.role === "tutor") {
          user.rating = req.body.rating;
          user.education = req.body.education;
          user.schedule = req.body.schedule;
          user.achieve = req.body.achieve;
          await user.save();
        }

        const token = createToken(_.pick(user, ["_id", "role", "email"]));

        //remove password before send response to client
        user.password = undefined;

        res.status(201).json({
          status: "success",
          token,
          user,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Có lỗi xảy ra vui lòng thử lại sau",
      });
      console.log("userController line 43 fail to create new user");
      console.log(err);
      next(err);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          status: "fail",
          message: "Vui lòng nhập đầy đủ thông tin",
        });
        return;
      }

      const user = await User.findOne({ email }).select(
        "-schedule -education -achive"
      );

      if (!user || !(await user.comparePassword(password, user.password))) {
        res
          .status(401)
          .json({
            status: "fail",
            message: "Email hoặc mật khẩu không chính xác !",
          });
        return;
      }

      user.password = undefined;
      const token = createToken(_.pick(user, ["_id", "role", "email"]));

      res.status(200).json({
        status: "success",
        token,
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Có lỗi xảy ra vui lòng thử lại sau!",
      });
      next(err);
    }
  }

  logout(req, res, next) {
    console.log("logout");
    res.json({
      status: "success",
    });
  }

  async checkBalance(req, res, next) {
    try {
      let user = await User.findById(req.params.id).lean();
      if (!user) {
        res.status(404).json({
          status: "fail",
          message: "Không tồn tại người dùng với id này",
        });
      } else {
        res.status(200).json({
          status: "success",
          balance: user.balance,
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
module.exports = new SiteController();
