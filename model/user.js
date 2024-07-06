/*
 * @Author: Miles
 * @Date: 2024-06-25 20:59:36
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-05 17:47:45
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
        _id: Joi.objectId(),

        avatar_url: Joi.string().messages({
            "string.base": "图像地址必须为String类型"
        }),
        gender: Joi.any().valid("male", "female").default("male").messages({
            "any.only": "传入的值无效"
        }),
        headline: Joi.string().max(100).messages({
            "string.base": "headline 必须为String类型",
            "string.max": "headline 最多为100个字符",
        }),
        locations: Joi.array().items(Joi.objectId()).messages({
            "array.base": "locations 必须为数组",
            "string.pattern.name": "数组中必须为 objectId 类型"
        }),
        business: Joi.string().messages({
            "string.base": "business 必须为 objectId 类型"
        }),
        employments: Joi.array().items(
            Joi.object().keys({
                company: Joi.objectId(),
                job: Joi.objectId()
            })
        ).messages({
            "array.base": "employments 必须为数组类型",
            "object.unknown": "传入的数据有误"
        }),
        educations: Joi.array().items(
            Joi.object().keys({
                school: Joi.objectId(),
                major: Joi.objectId(),
                diploma: Joi.number().valid(1, 2, 3, 4, 5),
                entrance_year: Joi.number(),
                graduation_year: Joi.number()
            })
        ).messages({
            "array.base": "educations 必须为数组类型",
            "any.only": "diploma只能从[1, 2, 3, 4, 5]中选择",
            "string.base": "school 与 major 必须为 objectId 类型",
            "number.base": "entrance_year 与 graduation_year 必须为Number类型",
            "object.unknown": "传入的数据有误"
        }),

        following: Joi.array().items(
            Joi.object().keys({
                type: Joi.objectId()
            })
        ).messages({
            "array.base": "following 必须为数组类型",
        }),

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
    },
    // 个人资料部分
    // 封面/头像
    avatar_url: {
        type: String,
        select: false
    },
    // 性别
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
        required: true
    },
    // 一句话介绍
    headline: {
        type: String,
        maxLength: 100
    },
    // 居住地
    locations: {
        type: [{
            type: String
        }],
    },
    // 行业
    business: {
        type: String
    },
    // 职业经历
    employments: {
        type: [{
            company: {
                type: String
            },
            job: {
                type: String
            }
        }],
    },
    // 教育经历
    educations: {
        type: [{
            school: {
                type: String
            },
            major: {
                type: String
            },
            diploma: {
                type: Number,
                enum: [1, 2, 3, 4, 5]
            },
            entrance_year: {
                type: Number
            },
            grations_year: {
                type: Number
            }
        }],
    },

    // 关注与粉丝部分
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        select: false
    },


    //   // 话题部分
    //   followingTopic: {
    //     type: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Topic"
    //     }],
    //     select: false
    //   },

    //   likingAnswers: {
    //     type: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Answer"
    //     }],
    //     select: false
    //   },
    //   dislikingAnswers: {
    //     type: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Answer"
    //     }],
    //     select: false
    //   },

    //   // 收藏答案
    //   collectingAnswers: {
    //     type: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Answer"
    //     }],
    //     select: false
    //   },
})

// token

userSchema.methods.generateToken = function () {
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