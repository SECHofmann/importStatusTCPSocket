exports.hello = {
  "type": "object",
  "properties": {
    "topic": { "type": "string" },
    "payload": 
      { "type": "object"},
      properties: {
        "uuid": { "type": "string" },
        "mandanten": { "type": "string" },
      }
  },
  "required": ["topic", "payload"]
};


