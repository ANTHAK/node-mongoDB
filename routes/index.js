/*
 * @Author: Miles
 * @Date: 2024-06-25 15:37:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 14:43:29
 * @FilePath: \node-mongoDB\routes\index.js
 */

const router = require("express").Router()

router.use("/user",require("./user"))
router.use("/login",require("./auth"))

module.exports = router