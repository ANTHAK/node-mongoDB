/*
 * @Author: Miles
 * @Date: 2024-06-25 15:37:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-03 15:57:21
 * @FilePath: \node-mongoDB\routes\index.js
 */

const router = require("express").Router()

router.use("/user",require("./user"))
router.use("/login",require("./auth"))
router.use("/upload",require("./upload"))
router.use("/topic",require("./topic"))
module.exports = router