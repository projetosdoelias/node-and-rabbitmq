console.log("Soccer news server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.news',
    "exchangeType": 'topic',
    "routingKey": '*.news.sports.soccer.#',
    "queueName": 'q.news.sports.soccer'
};

queue.consumeExchange(options, (message) => {
    
    const objMessage = JSON.parse(message.content.toString());
    let title = (objMessage && objMessage.title) ? objMessage.title : null;

    console.log('Your Soccer news, with the title "' + title + '" will be processed!' );
    console.log('Sua notícia de futebol, com o título "' + title + '" será processada!' );
    
})