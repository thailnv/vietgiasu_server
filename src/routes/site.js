const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");
const validator = require("../middleware/validate");
const { validate } = require("../app/models/User");

router.post("/dang-nhap", siteController.login);

router.post("/dang-ky", validator(validate), siteController.signup);

router.get("/so-du/:id", siteController.checkBalance);

router.get("/trang-chu", siteController.index);

module.exports = router;
