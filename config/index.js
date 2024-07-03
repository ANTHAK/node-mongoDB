/*
 * @Author: Miles
 * @Date: 2024-06-25 14:58:40
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 15:04:09
 * @FilePath: \node-mongoDB\config\index.js
 */
module.exports = {
    app:{
        port:process.env.PORT ||3000
    },
    db:{
        url:process.env.MONGODB_URL || "mongodb://localhost:27017/dwzhihu"
    },
    secret:"ce2d71be-f30d-43fb-8a8c-55c51fc02734"
}