/*
 * @Author: Miles
 * @Date: 2024-07-02 13:44:09
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-06 13:49:41
 * @FilePath: \node-mongoDB\controller\user.js
 */
// 注册用户

const {
    User
} = require("../model/user")

const bcrypt = require("bcrypt")

exports.register = async (req, res, next) => {
    try {
        console.log("1111111111", req.body);
        console.log("222222", req.validValue);
        let {
            email,
            name,
            password
        } = req.validValue

        let user = await User.findOne({
            email
        })
        console.log('user: ', user);
        if (user) {
            return res.status(400).json({
                code: 400,
                msg: "郵箱已經被註冊，請重新輸入",
                data: {
                    email
                }
            })
        }
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        user = new User({
            email,
            password,
            name
        })

        await user.save()
        res.status(200).json({
            code: 200,
            msg: "註冊成功"
        })
        // res.send("注册成功")

    } catch (err) {
        next(err)

    }
}

// 获取所有用户
exports.getUserList = async (req, res, next) => {
    try {
        let userList = await User.find()
        if (!userList) return res.status(400).json({
            code: 400,
            msg: "查詢失敗",
        })
        res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                list: {
                    userList
                }
            }
        })
        // res.send("获取所有用户")
    } catch (err) {
        next(err)
    }
};

// 获取指定用户
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        console.log('userId:0000 ', userId);
        if (!userId || userId.length != 24) return res.status(400).json({
            code: 400,
            msg: "userInfo Error"
        })
        let user = await User.findById(userId)
        if (!user) return res.status(400).json({
            code: 400,
            msg: "userId Error2"
        })

        return res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                user: {
                    user
                }
            }
        })
    } catch (err) {
        next(err)
    }
};


// 编辑/修改指定用户
exports.updateUser = async (req, res, next) => {
    try {
        const {
            fields = ''
        } = req.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
        let userId = req.params.id
        console.log('userId: ', userId);
        let body = req.body
        const salt = await bcrypt.genSalt(10)
        body.password = await bcrypt.hash(body.password, salt)
        const data = await User.findByIdAndUpdate(userId, body).select(selectFields)
        console.log('data: ', data);
        if (!data) return res.status(400).json({
            code: 400,
            msg: "update userInfo Error"
        })
        return res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                user: {
                    body
                }
            }
        })
    } catch (err) {
        next(err)
    }
};

// 删除指定用户
exports.deleteUser = async (req, res, next) => {
    try {
        let userId = req.params.id
        const data = await User.findByIdAndUpdate(userId)
        if (!data) return res.status(400).json({
            code: 400,
            msg: "delete userInfo Error"
        })
        return res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                user: {
                    userId
                }
            }
        })

    } catch (err) {
        next(err);
    }
};

exports.listFollowing = async (req, res, next) => {
    try {
        let userId = req.params.id
        const data = await User.findById(userId).select("+following").populate("following")
        if (!data) return res.status(400).json({
            code: 400,
            msg: "followingList Error"
        })
        return res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                user: {
                    data
                }
            }
        })
        // res.send("關注列表")

    } catch (err) {
        next(err);
    }
};

exports.addFollowing = async (req, res, next) => {
    try {
        let userId = req.params.id
        const data = await User.findById(userId.toString()).select("+following")

        if (!data) return res.status(400).json({
            code: 400,
            msg: "following Error"
        })
        if (data.following.map(id => id.toString()).includes(userId)) res.status(400).json({
            code: 400,
            msg: "following"
        })
        data.following.push(userId)
        await data.save()
        return res.status(200).json({
            code: 200,
            msg: "following success",
            data: {
                user: {
                    data
                }
            }
        })

    } catch (err) {
        next(err);
    }
};

exports.unFollowing = async (req, res, next) => {
    try {
        let userId = req.params.id
        const data = await User.findById(userId.toString()).select("+following")

        if (!data) return res.status(400).json({
            code: 400,
            msg: "following Error"
        })
        const index = data.following.map(id => id.toString()).indexOf(userId)

        if (index == -1) res.status(400).json({
            code: 400,
            msg: "unFollowing"
        })
        data.following.splice(index, 1)
        return res.status(200).json({
            code: 200,
            msg: "unFollowing success",
            data: {
                user: {
                    data
                }
            }
        })


    } catch (err) {
        next(err);
    }
};

exports.followList = async (req, res, next) => {
    try {
        let userId = req.params.id
        const data = await User.find({following:userId})
        if (!data) return res.status(400).json({
            code: 400,
            msg: "List Error"
        })
        return res.status(200).json({
            code: 200,
            msg: "success",
            data: {
                user: {
                    data
                }
            }
        })

    } catch (err) {
        next(err);
    }
}