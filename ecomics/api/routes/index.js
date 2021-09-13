const express = require("express");
const router = express.Router();
const userRoute = require("./users")
const orderRoute = require("./orders")
const productRoute = require("./products")
const cartRoute = require("./carts")
const adminRoute = require('./admin')
const categoryRoute = require('./category')

router.use("/user",userRoute)
router.use("/order",orderRoute)
router.use("/product",productRoute)
router.use("/cart",cartRoute)
router.use("/admin", adminRoute)
router.use("/category", categoryRoute)

module.exports = router;