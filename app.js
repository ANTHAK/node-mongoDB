/*
 * @Author: Miles
 * @Date: 2024-06-26 15:22:43
 * @LastEditors: Miles
 * @LastEditTime: 2024-07-03 20:44:17
 * @FilePath: \node-mongoDB\app.js
 */
/*
 * @Author: Miles
 * @Date: 2024-06-25 14:40:43
 * @LastEditors: Miles
 * @LastEditTime: 2024-06-26 14:30:58
 * @FilePath: \manager_node\app.js
 */

const config = require("./config/index")

const cors = require("cors")
const morgan = require("morgan")

require("./model")

const express = require("express")

const app = express()

app.use(express.json())
app.use(morgan())

app.use(express.static("public"))

app.use(cors())
// app.get("/", (req, res) => {
//     res.send("OK")
// })
// app.post("/", (req, res) => {
//     console.log(req.body);
//     res.send("hello")
// })

app.use("/api", require("./routes"))

app.use(require("./middleware/error"))
app.listen(config.app.port, () => {
    console.log("OK 4000");
})