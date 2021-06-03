const express = require("express");
const router = express.Router();

const TutorController = require("../app/controllers/TutorController");

router.get("/", TutorController.findAll);

module.exports = router;
