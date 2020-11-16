var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;


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
    io.emit('online-user-changed', { count: Object.keys(io.sockets.connected).length });
    logMessage(`user connected [ID: ${socket.id}, connected: ${Object.keys(io.sockets.connected).length}]`);

    socket.on('login', (theMessage) => {
        logMessage(`new login [ID: ${socket.id}]: `, theMessage);
        io.emit('login-broadcast', theMessage);
    });

    socket.on('username-change', (theMessage) => {
        logMessage(`new username-change [ID: ${socket.id}]: `, theMessage);
        io.emit('username-change-broadcast', theMessage);
    });

    socket.on('message', (theMessage) => {
        allMessages.push(theMessage);
        logMessage(`new message [ID: ${socket.id}]: `, theMessage);
        io.emit('message-broadcast', theMessage);
    });


    socket.on('get-all-messages', () => {
        socket.broadcast.to(socket.id).emit('all-messages', allMessages);
    });

    socket.on('disconnect', () => {
        io.emit('online-user-changed', { count: Object.keys(io.sockets.connected).length });
        logMessage(`user disconnected [ID: ${socket.id}, connected: ${Object.keys(io.sockets.connected).length}]`);
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