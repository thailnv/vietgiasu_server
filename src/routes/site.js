const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

router.post("/api/user/login", siteController.login);

router.post("/api/user/logout", siteController.logout);

router.post("/api/user/signup", siteController.signup);

router.get("/", siteController.index);

router.get("*", siteController.notfound);

module.exports = router;
