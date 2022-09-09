console.log("worker 2 started");
const queue = require("./queue");
queue.consume("fila1", message => {
    //process the message
    console.log("processing on server 2 " + message.content.toString());
})