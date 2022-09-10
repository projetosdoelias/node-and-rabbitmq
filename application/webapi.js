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

// Topic
router.post('/news', (req, res) => {
    
    const acceptedCategories = ["sports", "politics"];
    
    if((!req.body.category) ||  (!acceptedCategories.includes(req.body.category)) ){
        res.status(500).send('This service just process the categories "sports" and "politics"! \n Este serviço só processa as categorias "sports" e "politics" !');
    }

    let routingKey = 'event.news.' + req.body.category;

    if(req.body.subcategory)
    {
        routingKey += '.' + req.body.subcategory;
    }

    console.log(routingKey);
    
    options = {
        "exchange" : 'ex.news',
        "exchangeType": 'topic',
        "payload": req.body,
        "routingKey": routingKey
    }
    
    queue.sendToExchange(options);

    res.json({message: 'Your news will be processed!'});
});



// Header

app.use('/', router);
 
app.listen(3005);