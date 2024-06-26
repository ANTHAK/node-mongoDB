const mongoose = require("mongoose")
const config = require("../config")


console.log('config: ', config);

mongoose.connect(config.db.url)

const db = mongoose.connection

db.on("error",err=>{
    console.log(err);
})

db.on("open",()=>{
    console.log('DataBase连接成功');
})