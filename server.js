const net = require("net");

const port = process.env.PORT || 3000;

const { onClientConnect } = require("./controllers/mainController.js");

const server = net.createServer(onClientConnect);

// Start the TCP server on a specific port
server.listen(port, () => {
  console.log("Server listening on port", port);
});

