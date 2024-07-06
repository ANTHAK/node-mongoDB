/*
 * @Author: Miles
 * @Date: 2024-07-05 18:30:01
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-05 18:31:23
 * @FilePath: \node-mongoDB\middleware\checkUser.js
 */

const {User} = require("../model/user")
module.exports = async (req,res,next)=>{

    const userId = req.params.id
    
    const data = await User.findById(userId)
    if (!data) return res.status(400).json({
        code: 400,
        msg: "user Error"
    })
    next()

}