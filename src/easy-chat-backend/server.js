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
    let userChangeResp = getBaseResponseObject();
    userChangeResp.responseData = { count: Object.keys(io.sockets.connected).length }
    io.emit('online-user-changed', userChangeResp);
    logMessage(`${socket.id} - online-user-changed: `, userChangeResp)

    socket.on('login', (theMessage) => {
        let responseObj = getBaseResponseObject();
        responseObj.requestData = theMessage;
        responseObj.responseData = theMessage;

        io.emit('login-broadcast', responseObj);
        logMessage(`${socket.id} - login-broadcast: `, responseObj)
    });

    socket.on('username-change', (theMessage) => {
        let responseObj = getBaseResponseObject();
        responseObj.requestData = theMessage;
        responseObj.responseData = theMessage;

        io.emit('username-change-broadcast', responseObj);
        logMessage(`${socket.id} - username-change-broadcast: `, responseObj)
    });

    socket.on('message', (theMessage) => {
        allMessages.push(theMessage);

        let responseObj = getBaseResponseObject();
        responseObj.requestData = theMessage;
        responseObj.responseData = theMessage;

        io.emit('message-broadcast', responseObj);
        logMessage(`${socket.id} - message-broadcast: `, responseObj)
    });


    socket.on('get-all-messages', () => {
        let responseObj = getBaseResponseObject();
        responseObj.requestData = {};
        responseObj.responseData = allMessages;

        socket.broadcast.to(socket.id).emit('all-messages', responseObj);
        logMessage(`${socket.id} - all-messages: `, responseObj)
    });

    socket.on('disconnect', () => {
        let responseObj = getBaseResponseObject();
        responseObj.responseData = { count: Object.keys(io.sockets.connected).length }

        io.emit('online-user-changed', responseObj);
        logMessage(`${socket.id} - online-user-changed: `, responseObj)
    });
});


function getBaseResponseObject() {
    const actDate = new Date();

    return {
        timestamp: actDate.toISOString(),
        requestData: {},
        responseData: {}
    };
}

function logMessage(msg, param) {
    const actDate = new Date();

    if (param) {
        console.log(`${actDate.toISOString()}: ${msg}`, param);
    } else {
        console.log(`${actDate.toISOString()}: ${msg}`);
    }
}