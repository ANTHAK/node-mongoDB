/*
 * @Author: Miles
 * @Date: 2024-07-02 14:38:43
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 15:13:06
 * @FilePath: \node-mongoDB\controller\auth.js
 */

const {
    date
} = require("joi")
const {
    User
} = require("../model/user")

const bcrypt = require("bcrypt")
const {
    token
} = require("morgan")

exports.login = async (req, res, next) => {
    try {
        const validValue = req.validValue
        const user = await User.findOne({
            email: validValue?.email
        }).select("+password")
        if (!user) {
            return res.status(400).json({
                code: 400,
                msg: "用戶名或密碼錯誤"
            })
        }
        let status = await bcrypt.compare(validValue.password, user.password)
        if (!status) {
            return res.status(400).json({
                code: 400,
                msg: "用戶名或密碼錯誤"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: "登陸成功",
            data: {
                Authorization: user.generateToken()
            }
        })
        // console.log('req: ', req);
        res.send("登陸成功")
    } catch (err) {
        next(err)
    }
}