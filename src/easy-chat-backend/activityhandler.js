const LOOKUP_LIMIT = 20;
const ZERO_TIME_BASE_IN_SECONDS = 240;
const TIMELINESS_REWARD_FACTOR = 1.1;
const ON_FIRE_THRESHOLD = 3 * ZERO_TIME_BASE_IN_SECONDS ** TIMELINESS_REWARD_FACTOR;

class ActivityHandler {

    constructor(messageStorage) {
        this._messageStorage = messageStorage;
    }

    markActiveUsers(usernameMapping) {
        const onlyMessages = this._messageStorage.getAllMessages();
        onlyMessages.splice(0, onlyMessages.length - LOOKUP_LIMIT);

        this.zeroTime = new Date();
        this.zeroTime.setMinutes(this.zeroTime.getMinutes() - ZERO_TIME_BASE_IN_SECONDS);

        Object.entries(usernameMapping).forEach(([socketId, user]) => {
            user.onFire = this.isOnFire(socketId, onlyMessages);
            if (user.onFire) {
                console.log(`### user ${user.currentUsername} is on fire!!!`);
            }
        })

        return usernameMapping;
    }

    isOnFire(socket, allMessages) {
        let acitviyScore = 0;

        allMessages.filter(message => message.senderSocket === socket).forEach(message => {
            let messageTime = new Date(Date.parse(message.timestamp));
            let diff = this._diff_seconds(this.zeroTime, messageTime);
            if (diff <= ZERO_TIME_BASE_IN_SECONDS){
                let weight = ZERO_TIME_BASE_IN_SECONDS - diff;
                acitviyScore += weight ** TIMELINESS_REWARD_FACTOR;
            }
        })

        return acitviyScore >= ON_FIRE_THRESHOLD;
    }

    _diff_seconds(dt1, dt2) {
        var diff = (dt1.getTime() - dt2.getTime()) / 1000;
        diff /= 60 * 60;
        return Math.abs(Math.round(diff));
    }

}

module.exports = ActivityHandler;