const net = require("net");
const Validator = require("jsonschema").Validator;

const port = process.env.PORT || 3000;
const v = new Validator();

const registerSchema = {
  "type": "object",
  "properties": {
    "topic": { "type": "string" },
    "payload": { "type": "string"},
  },
  "required": ["topic", "payload"]
};

//check if client connect is allowed (Preshared-key or api key per client)

//register on connect

//sending messages about the import status back and forth

//unregister on disconnect

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log("client connected" + c);
  
  //q: how to return the message to another function?
  //a:
  c.on("data", function dataReceiver(data, cb) {
    try {
      
      const message = JSON.parse(data.toString());
      console.log(message);
      cb(message);
    } catch (e) {
      c.write(
        JSON.stringify({
          error: "an error occured when parsing the message",
        })
      );
      return;
    }
    
    switch (message.topic) {
      case "hello":
        const valid = v.validate(message, registerSchema);

        if (!valid.valid) {
          c.write(
            JSON.stringify({
              error: "This message cannot be validated",
            })
          );
          return;
        }

        
        if (message.key == "abc") {
          //create a function that generates a random uuid
          



          c.write(
            JSON.stringify({
              status: "registered",
              message: "welcome",
              uuid: "random UUID",
              time: Date.now(),
            })
          );
        }
        break;
        
        default:
        c.write(
          JSON.stringify({
            error: "Unknown action",
          })
        );
        break;
    }
  });

  c.on("end", () => {
    console.log("client disconnected");
  });
});
server.on("error", (err) => {
  throw err;
});
server.listen(port, () => {
  console.log("server startet");
});
