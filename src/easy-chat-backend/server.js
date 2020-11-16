var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = 3000;


let allMessages = [];


// start http server
http.listen(PORT, () => {
    console.log(`webserver is running on *:${PORT}`);
});

// TESTPAGE
app.get('/', (req, res) => {
    res.send('<h1>API is running</h1>');
});

// SOCKET.io
io.on('connection', (socket) => {
    const count = Object.keys(io.sockets.connected).length;
    logMessage(`user connected [ID: ${socket.id}, connected: ${count}]`);

    socket.on('login', (theMessage) => {
        logMessage(`new login [ID: ${socket.id}]: `, theMessage);
        socket.emit('login-broadcast', theMessage);
    });

    socket.on('username-change', (theMessage) => {
        logMessage(`new username-change [ID: ${socket.id}]: `, theMessage);
        socket.emit('username-change-broadcast', theMessage);
    });

    socket.on('message', (theMessage) => {
        allMessages.push(theMessage);
        logMessage(`new message [ID: ${socket.id}]: `, theMessage);
        socket.emit('message-broadcast', theMessage);
    });

    socket.on('disconnect', () => {
        logMessage(`user disconnected [ID: ${socket.id}, connected: ${count}]`);
    });
});


function logMessage(msg, param) {
    const actDate = new Date();

    if (param) {
        console.log(`${actDate.toISOString()}: ${msg}`, param);
    } else {
        console.log(`${actDate.toISOString()}: ${msg}`);
    }
}