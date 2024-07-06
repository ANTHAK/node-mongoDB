/*
 * @Author: Miles
 * @Date: 2024-06-25 15:28:02
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-05 18:34:27
 * @FilePath: \node-mongoDB\routes\user.js
 */
const router = require("express").Router()

const {
    User,
    userValidator
} = require("../model/user")

const validator = require("../middleware/validate")

const checkUser = require("../middleware/checkUser")
const auth = require("../middleware/auth")
const user = require("../controller/user")
// 用户注册
router.post("/user", validator(userValidator), user.register)

// 获取所有用户
router.get("/allUser", auth, user.getUserList)

// 获取用户
router.get("/getUserInfo/:id", user.getUser)

// 修改用户
router.post("/fixUser/:id", validator(userValidator), user.updateUser)

// 删除用户
router.post("/deleteUser/:id", user.deleteUser)

// 關注列表

router.get("/:id/following", auth, user.listFollowing)

// 關注

router.post("/addFollow/:id", auth, user.addFollowing)

// 取消關注

router.post("/unFollowing/:id", auth, user.unFollowing)

// 獲取粉絲列表

router.get("/follows/:id", [checkUser, auth], user.followList)

module.exports = router