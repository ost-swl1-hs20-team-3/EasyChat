var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var MessageStorage = require('./messagestorage.js');

const PORT = process.env.PORT || 3000;
const allowedOrigins = [
    'http://easy-chat-frontend.herokuapp.com/',
    'https://easy-chat-frontend.herokuapp.com/',
    'http://easy-chat-frontend-test.herokuapp.com/',
    'https://easy-chat-frontend-test.herokuapp.com/'
];

if (PORT === 3000) {
    allowedOrigins.push('http://localhost');
    allowedOrigins.push('https://localhost')
}

let usernameMapping = {};
const messageStorage = new MessageStorage();

// start http server
http.listen(PORT, () => {
    console.log(`webserver is running on *:${PORT}`);
});

// TESTPAGE
app.get('/', (req, res) => {
    res.send('<h1>API is running</h1>');
});

// SOCKET.io
io.origins((origin, callback) => {
    const originUrl = origin.replace(/:\d+/, '');

    if (!allowedOrigins.includes(originUrl)) {
        return callback('origin not allowed', false);
    }
    callback(null, true);
});

io.on('connection', (socket) => {

    // ------------------------------------------------
    // OnConnect
    // ------------------------------------------------
    usernameMapping[socket.id] = [];
    sendReservedUsernamesBroadcast(io, socket);
    sendOnlineUserBroadcast(io, socket);


    // ------------------------------------------------
    // onLogin
    // ------------------------------------------------
    socket.on('login', (theMessage) => {
        const userName = theMessage.username;
        let type = theMessage.type;

        mapUserNameToSocket(socket.id, userName);

        let responseObj = getBaseResponseObject(socket.id);
        responseObj.requestData = theMessage;
        responseObj.responseData = { type: type, username: userName };

        messageStorage.push(responseObj.responseData);

        io.emit('login-broadcast', responseObj);
        logMessage(`${socket.id} - login-broadcast: `, responseObj)

        sendReservedUsernamesBroadcast(io, socket);
        sendOnlineUserBroadcast(io, socket);
    });

    // ------------------------------------------------
    // onUsernameChange
    // ------------------------------------------------
    socket.on('username-change', (theMessage) => {
        let senderSocket = socket.id;
        let type = theMessage.type;
        let oldUsername = theMessage.oldUsername;
        let newUsername = theMessage.newUsername;

        mapUserNameToSocket(socket.id, newUsername);

        let responseObj = getBaseResponseObject(socket.id);
        responseObj.requestData = theMessage;
        responseObj.responseData = { type: type, senderSocket: senderSocket, oldUsername: oldUsername, newUsername: newUsername };

        messageStorage.push(responseObj.responseData);

        io.emit('username-change-broadcast', responseObj);
        logMessage(`${socket.id} - username-change-broadcast: `, responseObj)

        sendReservedUsernamesBroadcast(io, socket);
        sendOnlineUserBroadcast(io, socket);
    });

    // ------------------------------------------------
    // onMessage
    // ------------------------------------------------
    socket.on('message', (theMessage) => {
        let senderSocket = socket.id;
        let type = theMessage.type;
        let sender = theMessage.sender;
        let content = theMessage.content;
        let timestamp = new Date().toISOString();

        let responseObj = getBaseResponseObject(socket.id);
        responseObj.requestData = theMessage;
        responseObj.responseData = { type: type, senderSocket: senderSocket, sender: sender, content: content, timestamp: timestamp };

        messageStorage.push(responseObj.responseData);

        io.emit('message-broadcast', responseObj);
        logMessage(`${socket.id} - message-broadcast: `, responseObj)
    });


    // ------------------------------------------------
    // onGetAllMessages
    // ------------------------------------------------
    socket.on('get-all-messages', () => {
        let responseObj = getBaseResponseObject(socket.id);
        responseObj.requestData = {};
        responseObj.responseData = messageStorage.getAll();

        socket.emit('all-messages', responseObj);
        logMessage(`${socket.id} - all-messages: `, responseObj)
    });

    // ------------------------------------------------
    // OnDisconnect
    // ------------------------------------------------
    socket.on('disconnect', () => {
        delete usernameMapping[socket.id];

        sendReservedUsernamesBroadcast(io, socket);
        sendOnlineUserBroadcast(io, socket);
    });
});


// ------------------------------------------------
// Send functions
// ------------------------------------------------
function sendReservedUsernamesBroadcast(io, socket) {
    let reservedUsernames = [];
    Object.entries(usernameMapping).forEach(([key, value]) => { reservedUsernames.push(...value); })

    let responseObj = getBaseResponseObject(socket.id);
    responseObj.responseData = { reservedUsernames: reservedUsernames };

    io.emit('reserved-usernames-changed', responseObj);
    logMessage(`${socket.id} - reserved-usernames-changed: `, responseObj)
}

function sendOnlineUserBroadcast(io, socket) {
    let responseObj = getBaseResponseObject(socket.id);
    responseObj.responseData = usernameMapping;

    io.emit('online-user-changed', responseObj);
    logMessage(`${socket.id} - online-user-changed: `, responseObj)
}

// ------------------------------------------------
// Helper functions
// ------------------------------------------------
function mapUserNameToSocket(socket, username) {
    let socketUsernames = usernameMapping[socket];

    socketUsernames = socketUsernames.filter((val) => {
        return val !== username;
    });

    socketUsernames.push(username);

    usernameMapping[socket] = socketUsernames;
}

function getBaseResponseObject(socketId) {
    const actDate = new Date();

    return {
        timestamp: actDate.toISOString(),
        socketId: socketId,
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