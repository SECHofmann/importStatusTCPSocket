

const net = require('net');
const { validate } = require('jsonschema');

// Define the schema for the expected message format
const messageSchema = {
  type: 'object',
  properties: {
    action: { type: 'string' },
    data: { type: 'object' }
  },
  required: ['action', 'data']
};

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    try {
      // Parse the incoming JSON message
      const message = JSON.parse(data.toString());

      // Validate the message against the expected schema
      const result = validate(message, messageSchema);
      if (!result.valid) {
        // Send an error response if the message is not in the correct format
        socket.write(JSON.stringify({
          error: 'Invalid message format',
          details: result.errors
        }));
        return;
      }

      // Handle the message based on the 'action' property
      switch (message.action) {
        case 'ping':
          // Send a response back to the client
          socket.write(JSON.stringify({
            status: 'ok',
            message: 'pong'
          }));
          break;
        default:
          // Send an error response for unknown actions
          socket.write(JSON.stringify({
            error: 'Unknown action'
          }));
          break;
      }
    } catch (e) {
      // Send an error response if there was an error parsing the message
      socket.write(JSON.stringify({
        error: 'Error parsing message'
      }));
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});