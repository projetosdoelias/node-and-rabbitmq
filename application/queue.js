
function connect() {
    return require('amqplib').connect("amqp://guest:guest@localhost")
        .then(conn => conn.createChannel());
}

function createQueue(channel, queue) {
    return new Promise((resolve, reject) => {
        try {
            channel.assertQueue(queue, { durable: true });
            resolve(channel);
        }
        catch (err) { reject(err) }
    });
}

function sendToQueue(queue, message) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))
        .catch(err => console.log(err))
}

function consume(queue, callback) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.consume(queue, callback, { noAck: true }))
        .catch(err => console.log(err));
}

function consumeExchange( params, callback ) {

    const {exchange, exchangeType, routingKey, options, queueName} = params;
    connect()
        .then(async (channel) => {
            await channel.assertExchange(exchange, exchangeType, options);
            const { queue } = await channel.assertQueue(queueName, options);
            channel.bindQueue(queue, exchange, routingKey);
            channel.consume(queue, callback, { noAck: true })
        })
        .catch(err => console.log(err))
}

function sendToExchange( params ) {

    const {exchange, exchangeType, routingKey, payload, options} = params;

    connect()
        .then(async (channel) => {
            await channel.assertExchange(exchange, exchangeType, options);
            channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(payload)),
                options
            )
        })
        .catch(err => console.log(err))
}

module.exports = {
    sendToQueue,
    sendToExchange,
    consumeExchange,
    consume
}