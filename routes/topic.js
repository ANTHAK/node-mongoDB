/*
 * @Author: Miles
 * @Date: 2024-07-02 14:36:41
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-06 17:05:31
 * @FilePath: \node-mongoDB\routes\topic.js
 */
const router = require("express").Router()

const topic = require("../controller/topics")

const validator = require("../middleware/validate")
const {
    topicValidator
} = require("../model/topics")

router.post("/getTopicList", topic.getTopicsList)
router.post("/getTopic/:id", topic.getTopic)
router.post("/createTopic", validator(topicValidator), topic.createTopic)
router.post("/updateTopic/:id", validator(topicValidator), topic.updateTopic)
router.post("/deleteTopic/:id", topic.deleteTopic)


module.exports = router