/*
 * @Author: Miles
 * @Date: 2024-06-25 20:59:36
 * @LastEditors: Miles
 * @LastEditTime: 2024-06-26 15:01:07
 * @FilePath: \manager_node\model\user.js
 */
const mongoose = require("mongoose")

const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

function userValidator(data){
    const schema = Joi.object({
        email:Joi.string().email().trim().lowercase().min(6).max(30).required(),
        name:Joi.string().min(6).max(20).required(),
        password:Joi.string().pattern(/^[a-zA-Z0-9]{6,16}$/).required(),
        _id:Joi.objectId()
    })
    return schema.validate(data)
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxLength: 30,
        unique: true
    },
    name: {
        type: String,
        require: true,
        minlength: 6,
        maxLength: 30,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxLength: 30,
        select: false
    },
    __v: {
        type: Number,
        select: false
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User,
    userValidator
}