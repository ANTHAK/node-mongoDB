/*
 * @Author: Miles
 * @Date: 2024-07-02 14:36:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 14:46:31
 * @FilePath: \node-mongoDB\routes\auth.js
 */
const router = require("express").Router()

const auth = require("../controller/auth")

const validator = require("../middleware/validate")
const {
    userValidator
} = require("../model/user")
router.post("/", validator(userValidator), auth.login)

// 登錄接口

module.exports = router