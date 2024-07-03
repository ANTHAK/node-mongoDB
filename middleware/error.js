/*
 * @Author: Miles
 * @Date: 2024-07-02 13:53:59
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 13:57:28
 * @FilePath: \node-mongoDB\middleware\error.js
 */
module.exports = (err,req,res,next) =>{
    res.status(500).json({
        code:500,
        msg:"服务器错误"
    })
    console.log(err);
}
