/*
 * @Author: Miles
 * @Date: 2024-07-02 13:44:09
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-03 15:45:52
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
    if(!userId || userId.length != 24) return res.status(400).json({
        code:400,
        msg:"userInfo Error"
    })
    let user = await User.findById(userId)
    if(!user) return  res.status(400).json({
        code:400,
        msg:"userId Error2"
    }) 
    
    return res.status(200).json({
        code:200,
        msg:"success",
        data:{
            user:{user}
        }
    })
    } catch (err) {
        next(err)
    }
};


// 编辑/修改指定用户
exports.updateUser = async (req, res, next) => {
    try {
        let userId = req.params.id
        console.log('userId: ', userId);
        let body = req.body
        const data = await User.findByIdAndUpdate(userId,body)
        console.log('data: ', data);
        if(!data) return  res.status(400).json({
            code:400,
            msg:"update userInfo Error"
        }) 
        return res.status(200).json({
            code:200,
            msg:"success",
            data:{
                user:{body}
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
        if(!data) return  res.status(400).json({
            code:400,
            msg:"delete userInfo Error"
        }) 
        return res.status(200).json({
            code:200,
            msg:"success",
            data:{
                user:{userId}
            }
        })

    } catch (err) {
        next(err);
    }
};