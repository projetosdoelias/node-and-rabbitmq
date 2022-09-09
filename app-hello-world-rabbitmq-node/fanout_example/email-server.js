console.log("Email server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.buy',
    "exchangeType": 'fanout',
    "routingKey": '',
    "queueName": 'q.buy.send.email.confirmation'
};

queue.consumeExchange(options, (message) => {
    const objMessage = JSON.parse(message.content.toString());
    email = (objMessage && objMessage.email) ? objMessage.email : null;
    if(email)
        console.log("sending mail to" + email);
    else 
        console.log('Please insert the email field');
})