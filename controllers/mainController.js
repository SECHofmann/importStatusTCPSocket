const { v4: uuidv4 } = require("uuid");
const { Validator } = require("jsonschema");

const mySocket = require("../models/socketModel");
const Models = require("../models/validatorModels");
const uuidMandant = require("../models/uuidMandantModel");

const v = new Validator();
//____________________________________________________________

const onClientConnect = (socket) => {
  console.log("Client connected.");

  const sockets = mySocket.getSockets();
  sockets.forEach((s) => {
    if (s.socket === socket) {
      socket.destroy();
      return;
    }
  });

  //const uuid = uuidv4();
  const uuid = "test";
  const socketObj = new mySocket(uuid, socket);
  socketObj.addSocket();

  //send the uuid back to the client that just connected
  socket.write(uuid.toString());

  //listen for incoming data
  socket.on("data", onData);

  socket.on("end", () => {
    console.log("Client disconnected.");
  });
};

const onData = (data) => {
  const message = JSON.parse(data.toString());

  switch (message.topic) {
    case "sollist-hello":
      const valid = v.validate(message, Models.hello);
      console.log(
        `Received ${valid.valid} message from UUID: ${message.payload.uuid}`
      );
      if (valid.valid) {
        const uuidMM = new uuidMandant(
          message.payload.uuid,
          message.payload.mandanten
        );
        uuidMM.setUUIDtoMandanten();
      }
      break;
    case "sollist-start":
      console.log("sollist-start");
      
      mandantenArr = message.payload.mandanten; //gerade empfangene mandanten
      UUIDtoMandantObj = uuidMandant.getMap(); //uuid zu mandanten

      for (const [uuid, iMandanten] of UUIDtoMandantObj.entries()) {
        //schnittmenge finden zwischen mandantenArr und iMandanten
        const schnittmengeArr = mandantenArr.filter((m) => iMandanten.includes(m));

        const socket = mySocket.getSocket(uuid);
        if (socket) {
          socket.write(JSON.stringify(schnittmengeArr));
        } else {
          // Handle the case when the socket is not found
        }
      }
      break;
    default:
      console.log("default");
  }
};

module.exports = { onData, onClientConnect };
