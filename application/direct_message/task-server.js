console.log("worker started");
const queue = require("../queue");
queue.consume("q.task", message => {
    //process the message
    console.log("processing " + message.content.toString());
})