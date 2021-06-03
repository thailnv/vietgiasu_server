const { User } = require("../models/User");

class TutorController {
  async findAll(req, res, next) {
    try {
      let tutors = await User.find({ role: "tutor" }).select(
        "name img description education"
      );
      res.status(200).json({ tutors });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
      });
    }
  }
}
module.exports = new TutorController();
