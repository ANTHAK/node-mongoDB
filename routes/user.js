/*
 * @Author: Miles
 * @Date: 2024-06-25 15:28:02
 * @LastEditors: Miles
 * @LastEditTime: 2024-06-26 15:01:24
 * @FilePath: \manager_node\routes\user.js
 */
const router = require("express").Router()

const {
    User,
    userValidator
} = require("../model/user")

const validator = require("../middleware/validate")
// 用户注册
router.post("/user",validator(userValidator), (req, res, next) => {
    console.log('reqInfo ', req.body);
    // const user = new User({
    //     email:"fgj001khjk@qq.com",
    //     name:"Test999999",
    //     password:"5345345235"
    // })
    // const user = req?.body
    // user.save().then(item => {
    //         console.log("成功", userValidator(item));
    //         res.send("注册1111111")
    //     })
    //     ?.catch(err => {
    //         if (err) return console.error(err);
    //         console.log("註冊成功");
    //     })

    // user.save((err)=>{
    //     if(err) return console.error(err);
    //     console.log("註冊成功");
    // })
     res.send("注册1111111")
})

// 获取所有用户
router.get("/allUser", async (req, res, next) => {
    const data = await User.find().then(item => {
        console.log("成功iTEM", item);
        res.send(data)
    }).catch(err => {
        if (err) return console.error(err);
        console.log("成功");
    })

})

// 获取用户
router.get("/getUserInfo/:id", (req, res, next) => {
    res.send("获取用户")
})

// 修改用户
router.post("/fixUser/:id", (req, res, next) => {
    console.log(req.body);
    res.send("修改用户")
})

// 删除用户
router.post("/deleteUser/:id", (req, res, next) => {
    res.send("修改用户")
})

module.exports = router