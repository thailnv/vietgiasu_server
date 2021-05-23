const express = require("express");
const router = express.Router();

const CourseController = require("../app/controllers/CourseController");
const { scheduleEmail } = require("../middleware/mailService");

router.get("/:id", CourseController.findOne);

router.post("/dang-ky", scheduleEmail, CourseController.regis);

router.get("/", CourseController.findAll);

module.exports = router;
