const ZERO_TIME_BASE_IN_SECONDS = 240;
const ON_FIRE_THRESHOLD = 16;

class ActivityHandler {

    constructor(messageStorage) {
        this._messageStorage = messageStorage;
    }

    markActiveUsers(activeUsers) {
        const onlyMessages = this._messageStorage.getAllMessages();
        
        this.zeroTime = new Date();
        this.zeroTime.setSeconds(this.zeroTime.getSeconds() - ZERO_TIME_BASE_IN_SECONDS);

        Object.entries(activeUsers).forEach(([socketId, user]) => {
            let userMessages = onlyMessages.filter(message => message.senderSocket === socketId);
            let activityScore = this._calculateActivityScore(userMessages, userMessages.length);
            if (activityScore > ON_FIRE_THRESHOLD) {
                user.onFire = true;
            }
        })

        return activeUsers;
    }

    _calculateActivityScore(messages, n) {
        let activityScore = 0;

        messages.forEach(message => {
            let messageTime = new Date(Date.parse(message.timestamp));
            let diffInSeconds = this._diffSeconds(this.zeroTime, messageTime);
            if (diffInSeconds > 0) {
                let relativeDiff = diffInSeconds / ZERO_TIME_BASE_IN_SECONDS;
                let messageScore = ((relativeDiff + 1) ** 2) - 1;
                activityScore += messageScore;
            }
        })

        return activityScore;
    }

    _diffSeconds(dt1, dt2) {
        var diffInSeconds = (dt2.getTime() - dt1.getTime()) / 1000;
        return Math.abs(diffInSeconds);
    }

}

module.exports = {ZERO_TIME_BASE_IN_SECONDS, ActivityHandler};