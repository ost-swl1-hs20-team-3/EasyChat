const MESSAGE_LIMIT = 50;

class MessageStorage {

    constructor(){
        this._messageList = [];
    }

    push(message) {
        this._messageList.push(message);
        if (this._messageList.length > MESSAGE_LIMIT) {
            this._messageList.splice(0, this._messageList.length - MESSAGE_LIMIT);
        }
    }

    getAll() {
        return Array.from(this._messageList);
    }

}

module.exports = MessageStorage;