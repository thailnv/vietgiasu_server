const User = require("../models/User");
const Course = require("../models/Course");

class SiteController {
  async index(req, res, next) {
    let data = {};
    await Course.findHotCourse(data);
    await Course.findNewCourse(data);
    res.json({ data });
  }

  async signup(req, res, next) {
    try {
      let result = {};
      await User.signup(req.body, result);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json({
        status: "fail",
      });
    }
  }

  async login(req, res) {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    let result = {};

    await User.login(data, result);

    console.log(result);
    res.json({
      ...result,
    });
  }

  logout(req, res, next) {
    console.log("logout");
    res.json({
      status: "success",
    });
  }

  denied(req, res, next) {
    res.status(403).render("403");
  }

  notfound(req, res, next) {
    res.status(404).render("404");
  }
}
module.exports = new SiteController();
