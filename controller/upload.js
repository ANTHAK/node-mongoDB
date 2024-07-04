/*
 * @Author: Miles
 * @Date: 2024-07-03 15:55:46
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-03 20:42:15
 * @FilePath: \node-mongoDB\controller\upload.js
 */
// 文件上傳
exports.upload = async (req, res, next) => {
    try {
        res.status(200).json({
            code: 200,
            msg: "上传成功",
            data: "http://localhost:3000/" + "upload/" + req.file.originalname
          })

    } catch (err) {
        next(err);
    }
};