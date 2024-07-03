/*
 * @Author: Miles
 * @Date: 2024-06-26 15:22:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 14:21:56
 * @FilePath: \node-mongoDB\model\index.js
 */
const mongoose = require("mongoose")
const config = require("../config")


console.log('config: ', config);

mongoose.connect(config.db.url)

const db = mongoose.connection

db.on("error", err => {
    console.log("服务器错误", err);
})

db.on("open", () => {
    console.log('DataBase连接成功');
})