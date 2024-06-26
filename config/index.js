/*
 * @Author: Miles
 * @Date: 2024-06-25 14:58:40
 * @LastEditors: Miles
 * @LastEditTime: 2024-06-25 14:59:19
 * @FilePath: \manager_node\config\index.js
 */
module.exports = {
    app:{
        port:process.env.PORT ||3000
    },
    db:{
        url:process.env.MONGODB_URL || "mongodb://localhost:27017/dwzhihu"
    }
}