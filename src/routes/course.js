const express = require("express");
const router = express.Router();

const CourseController = require("../app/controllers/CourseController");

router.get("/:id", CourseController.findOne);

router.get("/", CourseController.findAll);

module.exports = router;
