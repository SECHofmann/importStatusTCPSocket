//write a class named registerHelper that has a method named register
//the register method has no parameters and returns a promise
//the register method should return a promise that resolves to a boolean
//the method should generate a random uuid and write all data to a mongo database
//the method should return true if the client is not already registered and false if the client is already registered

//import mongodb module from node_modules

import mongodb from "mongodb";

class registerHelper {
  register(socket) {
    return new Promise((resolve, reject) => {
      //create a function that generates a random uuid
      const client = new Client(socket);
      
    });
  }
}

class client {
  constructor(socket) {
    this.uuid = uuidv4();
    this.socket = socket;
    this.registered = false;
  }
}

module.exports = { registerHelper, client }