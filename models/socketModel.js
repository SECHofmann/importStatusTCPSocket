const sockets = [];

class mySocket {
    constructor(uuid, socket) {
        this.uuid = uuid;
        this.socket = socket;
    }
    addSocket() {         
        sockets.push(this);  
    }
    removeSocket(socket) {
        const index = this.sockets.indexOf(socket);
        if (index !== -1) {
            this.sockets.splice(index, 1);
        }
    }
    static getSockets() {
        return sockets;
    }
    static getSocket(uuid) {
        const socketObject = sockets.find((s) => s.uuid === uuid);
        return socketObject ? socketObject.socket : null;
    }
};

module.exports = mySocket;