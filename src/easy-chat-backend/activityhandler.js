const LOOKUP_LIMIT = 30;
const ZERO_TIME_BASE_IN_SECONDS = 240;
const TIMELINESS_REWARD_FACTOR = 1.1;

class ActivityHandler {

    constructor(messageStorage) {
        this._messageStorage = messageStorage;
    }

    markActiveUsers(activeUsers) {
        const onlyMessages = this._messageStorage.getAllMessages();
        onlyMessages.splice(0, onlyMessages.length - LOOKUP_LIMIT);

        this.zeroTime = new Date();
        this.zeroTime.setSeconds(this.zeroTime.getSeconds() - ZERO_TIME_BASE_IN_SECONDS);

        let scores = [];

        Object.entries(activeUsers).forEach(([socketId, user]) => {
            let userMessages = onlyMessages.filter(message => message.senderSocket === socketId);
            let activityScore = this._calculateActivityScore(userMessages);
            if (activityScore > 0) {
                scores.push({ socketId: socketId, activityScore: activityScore, noOfMessages: userMessages.length });
            }
        })

        let standardDeviation = this._calculateStandardDeviaton(scores);
        let mean = this._calculateMean(scores);
        let threshold = mean + (standardDeviation / 2);
        this._log(threshold);

        scores.forEach(entry => {
            if (entry.noOfMessages > 3 && entry.activityScore > threshold) {
                activeUsers[entry.socketId].onFire = true;
                console.log(`### ${activeUsers[entry.socketId].currentUsername} is on fire!`)
            }
        })

        return activeUsers;
    }

    _calculateActivityScore(messages) {
        let cumulativeAcitviyScore = 0;

        messages.forEach(message => {
            let messageTime = new Date(Date.parse(message.timestamp));
            let diff = this._diffSeconds(this.zeroTime, messageTime);
            if (diff > 0) {
                cumulativeAcitviyScore += diff ** TIMELINESS_REWARD_FACTOR;
            }
        })

        let relativeActivityScore = messages.length ? cumulativeAcitviyScore / messages.length : 0;

        return relativeActivityScore;
    }

    _calculateStandardDeviaton(scores) {
        const allScores = scores.map(rec => rec.activityScore);
        const n = allScores.length;
        const mean = allScores.reduce((a, b) => a + b, 0) / n;
        return Math.sqrt(allScores.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n);
    }

    _calculateMean(scores) {
        const allScores = scores.map(rec => rec.activityScore);
        const n = allScores.length;
        return allScores.reduce((value1, value2) => value1 + value2, 0) / n;
    }

    _diffSeconds(dt1, dt2) {
        var diffInSeconds = (dt2.getTime() - dt1.getTime()) / 1000;
        return Math.abs(diffInSeconds);
    }

    _log(threshold) {
        console.log(`activity threshold: ${threshold}`);
    }

}

module.exports = ActivityHandler;