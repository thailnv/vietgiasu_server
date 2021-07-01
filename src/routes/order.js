const express = require("express");
const router = express.Router();

const OrderController = require("../app/controllers/OrderController");

router.get("/:id", OrderController.findOne);

router.post("/:id", OrderController.updateOne);

module.exports = router;
