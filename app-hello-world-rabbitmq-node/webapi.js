const express = require('express');
const app = express();         
const queue = require("./queue");
 
app.use(express.json());
 
const router = express.Router();
 
// Directs
router.post('/task', (req, res) => {
    queue.sendToQueue("fila1", req.body);
    res.json({message: 'Your request will be processed!'});
});


// Fanout
router.post('/buy', (req, res) => {
    
    options = {
        "exchange" : 'ex.buy',
        "exchangeType": 'fanout',
        "payload": req.body,
        "routingKey": ''
    }
    
    queue.sendToExchange(options);

    res.json({message: 'Your buy will be processed!'});
});


// Header
// Direct ....
app.use('/', router);
 
app.listen(3005);