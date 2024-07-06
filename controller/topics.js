/*
 * @Author: Miles
 * @Date: 2024-07-06 16:19:57
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-06 17:14:30
 * @FilePath: \node-mongoDB\controller\topics.js
 */
const {
    Topic
} = require("../model/topics")


exports.getTopicsList = async (req, res, next) => {
    try {
        // 当前是第几页
        const page = Math.max(req.query.page * 1, 1) - 1;
        // 每页有几条数据
        const {
            per_page = 10
        } = req.query;
        const perPage = Math.max(per_page * 1, 1);

        const topicInfo = await Topic.find({
                name: new RegExp(req.query.keyword),
            })
            .limit(perPage)
            .skip(page * perPage);
        if (!topicInfo) {
            return res.status(400).json({
                code: 400,
                msg: "列表信息錯誤"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: "獲取成功",
            data: {
                topicInfo
            }
        })
        res.send("列表數據")
    } catch (error) {
        next(error)
    }
}

exports.getTopic = async (req, res, next) => {
    try {
        const {
            field = ""
        } = req.query
        const selectFields = field.split(";").filter(f => f).map(f => "+" + f).join("")
        const topicInfo = await Topic.findById(req.params.id).select(selectFields)
        if (!topicInfo) {
            return res.status(400).json({
                code: 400,
                msg: "信息錯誤"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: "獲取成功",
            data: {
                topicInfo
            }
        })
        res.send("話題訊息")
    } catch (error) {
        next(error)
    }
}

exports.createTopic = async (req, res, next) => {
    try {
        const data = req.body
        let topic = await Topic.findOne(data)
        //   console.log('topic: ', topic);
        if (topic) {
            return res.status(400).json({
                code: 400,
                msg: "話題已存在"
            })
        }
        topic = new Topic(data)
        await topic.save()
        return res.status(200).json({
            code: 200,
            msg: "創建成功",
            data: {
                data
            }
        })
        res.send("話題訊息")
    } catch (error) {
        next(error)
    }
}

exports.updateTopic = async (req, res, next) => {
    try {
        const topicId = req.params.id
        let topic = await Topic.findByIdAndUpdate(topicId, req.body)
        //   console.log('topic: ', topic);
        if (!topic) {
            return res.status(400).json({
                code: 400,
                msg: "話題不存在"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: "更新成功",
            data: {
                data
            }
        })
        res.send("話題訊息")
    } catch (error) {
        next(error)
    }
}

exports.deleteTopic = async (req, res, next) => {
    try {
        const topicId = req.params.id
        let topic = await Topic.findByIdAndDelete(topicId)
        //   console.log('topic: ', topic);
        if (!topic) {
            return res.status(400).json({
                code: 400,
                msg: "話題不存在"
            })
        }
        return res.status(200).json({
            code: 200,
            msg: "刪除成功",
        })
        res.send("話題訊息")
    } catch (error) {
        next(error)
    }
}