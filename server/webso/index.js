const express = require('express')
const WebSocket = require('ws')
const app = express()
const http = require('http').createServer(app)

app.use('/',(req,res)=> {
    var ws = new WebSocket('ws://localhost:2000');
    ws.on('open', function open() {
        ws.send('something');
      });
       
      ws.on('message', function incoming(data) {
        console.log(data);
      });
})

http.listen(5000, () => {
    console.log("[Server Started WEBSO]")
})