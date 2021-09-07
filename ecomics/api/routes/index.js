const express = require("express");
const router = express.Router();
const userRoute = require("./users")
const orderRoute = require("./orders")
const productRoute = require("./products")
const cartRoute = require("./carts")

router.use("/user",userRoute)
router.use("/order",orderRoute)
router.use("/product",productRoute)
router.use("/cart",cartRoute)

module.exports = router;