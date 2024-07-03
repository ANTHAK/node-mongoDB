/*
 * @Author: Miles
 * @Date: 2024-06-25 20:59:36
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-02 15:11:46
 * @FilePath: \node-mongoDB\model\user.js
 */
const mongoose = require("mongoose")

const Joi = require("joi")

const config = require("../config")
const jwtToken = require("jsonwebtoken")

Joi.objectId = require("joi-objectid")(Joi)

function userValidator(data) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(6).max(30).required().messages({
            "any.required": "缺少必选参数 email",
            "string.email": "email 格式错误",
            "string.min": "email 最少为6个字符",
            "string.max": "email 最多为30个字符",
        }),
        name: Joi.string().min(2).max(20).required().messages({
            "any.required": "缺少必选参数 name",
            "string.base": "name 必须为String类型",
            "string.min": "name 最少为2个字符",
            "string.max": "name 最多为20个字符",
        }),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{6,16}$/).required().messages({
            "any.required": "缺少必选参数 password",
            "string.min": "password 最少为6个字符",
            "string.max": "password 最多为16个字符",
        }),
        _id: Joi.objectId()
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
        minlength: 2,
        maxLength: 30,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxLength: 100,
        select: false
    },
    __v: {
        type: Number,
        select: false
    }
})

// token

userSchema.methods.generateToken = function() {
    return jwtToken.sign({
            _id: this._id,
        },
        config.secret, {
            expiresIn: "10d"
        }
    )
}

const User = mongoose.model("User", userSchema)

// mongoose.connection.on('error', function(err) {
//     console.error('MongoDB error: %s', err);
// });

module.exports = {
    User,
    userValidator
}