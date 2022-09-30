console.log("Basketball bet server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.bet',
    "exchangeType": 'headers',
    "routingKey": '',
    "queueName": 'q.bet.basketball',
    "bindOpts": { "category": "sports", "subcategory": "basketball", "x-match": "all" }
};

queue.consumeExchange(options, (message) => {

    const objMessage = JSON.parse(message.content.toString());
    let team = (objMessage && objMessage.team) ? objMessage.team : null;
    let value = (objMessage && objMessage.value) ? objMessage.value : null;

    console.log('Your bet with value:' + value + ' on  "' + team + '" team will be processed!' );
    console.log('Sua aposta no valor de' + value + ' no time  "' + team + '" será processada!' );
    
})