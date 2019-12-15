const express = require('express')
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

var users = []
io.on("connection", (socket) => {
    console.log("[User Connected]", socket.id)

    socket.on("User_Connected",(username) => {
        users[username] = socket.id;
        io.emit("User_Connected", username)
    })
    socket.on("send_message", (data) => {
        var socketId = users[data.receiver]
        io.to(socketId).emit("new_message",data)
    })
})


http.listen(2000, () => {
    console.log("[Server Started]")
})