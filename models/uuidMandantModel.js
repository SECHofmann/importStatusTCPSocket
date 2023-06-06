
const UUIDMandantMap = new Map();


module.exports = class UUIDtoMandantManager {
    //Map the uuid to the mandanten the client is interested in 
    constructor(uuid, mandanten) {
        this.uuid = uuid;
        this.mandantArr = mandanten;
    }

    setUUIDtoMandanten() {
        UUIDMandantMap.set(this.uuid, this.mandantArr);
    }

    static getUUIDs() {
        return UUIDMandantMap.keys();
    }

    static getMap() {
        return UUIDMandantMap;
    }
};
    