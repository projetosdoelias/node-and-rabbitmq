console.log("Politics news server started!");
const queue = require("../queue");

const options = {
    "exchange": 'ex.news',
    "exchangeType": 'topic',
    "routingKey": '*.news.politics.#',
    "queueName": 'q.news.politics'
};

queue.consumeExchange(options, (message) => {
    const objMessage = JSON.parse(message.content.toString());
    let title = (objMessage && objMessage.title) ? objMessage.title : null;
    let category = (objMessage && objMessage.category) ? objMessage.category : null;

    console.log('Your news from the"' + category + ' category ", with the title "' + title + '" will be processed!' );
    console.log('Sua notícia de categoria "' + category + '", com o título "' + title + '" será processada!' );
    
})