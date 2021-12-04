const ws = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new ws.WebSocketServer({
  port: 42330,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    }, // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(dataText) {
    // data receiving
    const data = JSON.parse(dataText);
    console.log('received', data);

    if (data["command"] && data["command"] === "save") {
      console.log("writing...");
      // data check
      if (!data["data"] || !data["path"] || typeof data["path"] !== "string") {
        console.error("data is incorrect");
        return;
      }

      // export file
      const json = JSON.stringify(data["data"], null, 4);
      const filePath = path.join("src/assets/calibration-data", data["path"])
      fs.writeFileSync(filePath, json);

      console.log(`file saved: ${filePath}`);
    }
  });
});
