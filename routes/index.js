/*
 * @Author: Miles
 * @Date: 2024-06-25 15:37:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-06-25 15:49:21
 * @FilePath: \manager_node\routes\index.js
 */

const router = require("express").Router()

router.use("/user",require("./user"))

module.exports = router