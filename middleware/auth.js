/*
 * @Author: Miles
 * @Date: 2024-07-02 15:14:36
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 15:29:22
 * @FilePath: \node-mongoDB\middleware\auth.js
 */
const jwtToken = require("jsonwebtoken")
const config = require("../config")

module.exports = function (req, res, next) {
    const token = req.header("authorization")
    console.log('token: ', token);
    if (!token) {
        return res.status(400).json({
            code: 400,
            msg: "UnAuthorization"
        })
    }
    try {

        const user = jwtToken.verify(token,config.secret)
        console.log('user: ', user);
        req.userData = user
        next()
    } catch (err) {
        return res.status(401).json({
            code: 401,
            msg: "Authorization is unValid"
        })
    }
}