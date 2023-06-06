var net = require("net");

var HOST = "127.0.0.1";
var PORT = 3000;

var client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log("CONNECTED TO: " + HOST + ":" + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client


  //runs immediately after connection
  
  //message signals that this client wants to listen to the mandants 01, 02, 03, 04
  let message = {
    topic: "sollist-hello",
    payload: { 
      uuid: "test",
      mandanten: ["01", "02", "03", "04"]
    },
  };
  client.write(JSON.stringify(message));
  //message signals that this client now starts the imort of the mandants 01, 02
  //runs after 1 second
  setTimeout(() => {
    message = {
      topic: "sollist-start",
      payload: { 
        uuid: "test",
        mandanten: ["01", "02", "05"]
      },
    };

    client.write(JSON.stringify(message));
  }, 1000);


  
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on("data", function (data) {
  console.log("DATA: " + data);
  // Close the client socket completely
});

// Add a 'close' event handler for the client socket
client.on("close", function () {
  console.log("Connection closed");
});
