var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


// start http server
http.listen(3000, () => {
    console.log('listening on *:3000');
});


// 
io.on('connection', (socket) => {
    console.log('new connection...');

    socket.on('message', (msg) => {
        console.log(`new message: `, msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});