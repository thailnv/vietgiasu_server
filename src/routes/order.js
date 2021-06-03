const express = require("express");
const router = express.Router();

const OrderController = require("../app/controllers/OrderController");

router.get("/:id", OrderController.findOne);

module.exports = router;
