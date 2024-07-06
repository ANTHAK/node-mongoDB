/*
 * @Author: Miles
 * @Date: 2024-07-06 16:06:31
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-06 16:51:34
 * @FilePath: \node-mongoDB\model\topics.js
 */
const mongoose = require("mongoose")

const Joi = require("joi")

Joi.objectId = require("joi-objectid")

const topicSchema = new mongoose.Schema({
    __v: {
        type: Number,
        select: false
    },
    // 话题的名称
    name: {
        type: String,
        required: true
    },
    // 图像
    avatar_url: {
        type: String
    },
    // 简介
    introduction: {
        type: String,
        maxLength: 500,
        select: false
    }
})

// 创建 Model
const Topic = mongoose.model("Topic", topicSchema)

// 校验
function topicValidator(data) {
    console.log('data:.0................... ', data);
    const schema = Joi.object({
        name: Joi.string().required(),
        avatar_url: Joi.string(),
        introduction: Joi.string().max(500)
    })
    return schema.validate(data)
}

module.exports = {
    Topic,
    topicValidator
}