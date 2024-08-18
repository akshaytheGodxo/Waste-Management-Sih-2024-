const express = require("express")
const app = express()
PORT = 3000;
app.use("/", (req, res) => {
    res.send("Server is Running")
})
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})
