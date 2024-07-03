/*
 * @Author: Miles
 * @Date: 2024-06-25 15:28:02
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 15:21:42
 * @FilePath: \node-mongoDB\routes\user.js
 */
const router = require("express").Router()

const {
    User,
    userValidator
} = require("../model/user")

const validator = require("../middleware/validate")
const auth = require("../middleware/auth")
const user = require("../controller/user")
// 用户注册
router.post("/user", validator(userValidator), user.register)

// 获取所有用户
router.get("/allUser", auth, user.getUserList)

// 获取用户
router.get("/getUserInfo/:id", user.getUser)

// 修改用户
router.post("/fixUser/:id", user.updateUser)

// 删除用户
router.post("/deleteUser/:id", user.deleteUser)

module.exports = router