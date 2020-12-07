const LOOKUP_LIMIT = 20;
const ON_FIRE_LIMIT = 5;

function markActiveUsers(usernameMapping, messageStorage){
    const onlyMessages = messageStorage.getAllMessages();

    onlyMessages.splice(0, onlyMessages.length - LOOKUP_LIMIT);
    
    Object.entries(usernameMapping).forEach(([socketId, user]) => {
        user.onFire = isOnFire(socketId, onlyMessages);
        if (user.onFire){
            console.log(`### user ${user.currentUsername} is on fire!!!`);
        }
    })

    return usernameMapping;
}

function isOnFire(socket, allMessages){
    return allMessages.filter(msg => msg.senderSocket === socket).length >= ON_FIRE_LIMIT;
}

module.exports = {markActiveUsers};