const express = require("express");
const router = express.Router();

const CourseController = require("../app/controllers/CourseController");
const { sendOrderEmail } = require("../middleware/mailService");

router.get("/:id", CourseController.findOne);

router.post("/dang-ky", CourseController.regis, sendOrderEmail);

router.get("/", CourseController.findAll);

module.exports = router;
