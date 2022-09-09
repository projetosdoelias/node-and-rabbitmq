console.log("Payment server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.buy',
    "exchangeType": 'fanout',
    "routingKey": '',
    "queueName": 'q.buy.payment'
};

queue.consumeExchange(options, (message) => {
    
    const objMessage = JSON.parse(message.content.toString());

    cardNumber = (objMessage && objMessage.card && objMessage.card.number) ? objMessage.card.number : null;
    if(cardNumber)
        console.log("Processing payment with card: " + cardNumber);
    else 
        console.log('Please insert a valid card number at field "card.number"!');
})
