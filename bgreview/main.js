// Load libraries
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// Load configuration 
const config = require('./config.json');

const URL = config.mongo || 'mongodb://localhost:27017';

// Create an instance of MongoClient
const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })

// Create an instance of the application
const app = express();

// GET /api/cuisine
// db.getCollection('restaurant').distinct('type_of_food')
app.get('/api/cuisine',
    (req, resp) => {
        client.db('food')
            .collection('restaurant')
            .distinct('type_of_food')
            .then(result => {
                resp.status(200)
                resp.type('application/json')
                resp.json(result);
            })
            .catch(error => {
                resp.status(400)
                resp.end(error);
            })
    }
)

// GET /api/restaurant/:restId
// GET /api/restaurant?restId=abc123
app.get('/api/restaurant/:restId',
    (req, resp) => {
        console.log('restId: ', req.params.restId)

        const restId = req.params.restId;

        //let p = client.db('food')
        client.db('food')
            .collection('restaurant')
            .findOne({ _id: ObjectId(restId)})
            //.toArray() - findOne does not return a cursor, so does not have toArray()

            .then(result => {
                resp.type('application/json');
                if (!result) {
                    resp.status(404)
                    resp.json({ message: `Not found: ${restId}`});
                } else {
                    resp.status(200)
                    resp.json(result);
                }
            })
            .catch(error => {
                resp.status(404)
                resp.json({ message: error });
            })
    }
)

// GET /api/restaurants/<cuisine>?offset=<number>,limit=<number>
// default to offset=0, limit=10
app.get('/api/restaurants/:cuisine',
    (req, resp) => {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        client.db('food')
            .collection('restaurant')
            .find({ 
                type_of_food: {
                    $regex: `^${req.params.cuisine}\$`, // RE
                    $options: 'i'  //ignore case
                }
            } 
            ) // find returns a cursor
            .project({ name: 1 })
            .skip(offset)
            .limit(limit)
            .toArray() //
            .then(result => {
                resp.status(200)
                resp.type('application/json')
                resp.json(result);
            })
            .catch(error => {
                resp.status(400)
                resp.end(error);
            })
    }
)

app.use(express.static(__dirname + '/dist'));

// connect to mongo/boardgame
client.connect(
    (err, client) => {
        if (err) {
            console.error('fail to connect:', err)
            return;
        }
        console.info('connected to boardgame')
        // Start the server
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`);
        })
    }
)
