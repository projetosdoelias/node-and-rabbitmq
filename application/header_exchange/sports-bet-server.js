console.log("Sports Caregory bet server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.bet',
    "exchangeType": 'headers',
    "routingKey": '',
    "queueName": 'q.bet.sports',
    "bindOpts": { "category": "sports", "x-match": "any" }
};

queue.consumeExchange(options, (message) => {
    
    const objMessage = JSON.parse(message.content.toString());
    let team = (objMessage && objMessage.team) ? objMessage.team : null;
    let value = (objMessage && objMessage.value) ? objMessage.value : null;
    let sport = (objMessage && objMessage.subcategory) ? objMessage.subcategory : null;

    console.log(`Your bet on ${sport} with value: ${value}  on ${team} team will be processed!` );
    console.log(`Sua aposta no esport ${sport} com valor de: ${value} no time ${team} será processada!` );
    
})