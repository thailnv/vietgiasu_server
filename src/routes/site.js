const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

router.post("/dang-nhap", siteController.login);

router.post("/dang-ky", siteController.signup);

router.get("/trang-chu", siteController.index);

router.get("*", siteController.notfound);

module.exports = router;
