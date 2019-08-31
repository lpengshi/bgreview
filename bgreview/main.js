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

// GET /api/boardgames/name?offset=?&limit=? 
// shows list of boardgames' name by alphabetical order
// returns name and id only
app.get('/api/boardgames',
    (req, resp) => {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        client.db('bgreview')
            .collection('boardgames')
            .find({})
            .project({ Name: 1 })
            .sort({ Name: 1 })
            .skip(offset)
            .limit(limit)
            .toArray()
            //.sort((a, b) => a.Name.localeCompare(b.Name))
            .then(result => {
                console.info('>>> result: ', result);
                resp.status(200);
                resp.type('application/json');
                resp.json(result);
            })
            .catch(error => {
                resp.status(400);
                resp.end(error);
            })
    }
)

// GET /api/boardgames/:name
// gets a list of boardgames with name like...
// returns name and id only
app.get('/api/boardgames/:name',
    (req, resp) => {
        console.info('>>> name: ', req.params.name)
        client.db('bgreview')
            .collection('boardgames')
            .find({
                Name: {
                    $regex: `.*${req.params.name}.*`, // RE
                    $options: 'i'  //ignore case
                }
            }) // find returns a cursor
            .project({ Name: 1 })
            .sort({ Name: 1 })
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

// GET /api/category
// gets a list of categories 
// returns category name only
app.get('/api/category',
    (req, resp) => {
        client.db('bgreview')
            .collection('gameinfo')
            .aggregate([
                { $project: { categories: { $trim: { input: "$boardgamecategory", chars: " []" } } } },
                { $project: { category: { $split: ["$categories", ","] } } },
                { $unwind: "$category" },
                { $project: { category: { $trim: { input: "$category", chars: " \"'" } } } },
                { $project: { category: { $split: ["$category", " / "] } } },
                { $unwind: "$category" },
                { $group: { _id: { "category": "$category" } } },
                { $sort: { _id: 1 } }
            ])
            .toArray()
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

// GET /api/boardgames/:category
// gets a list of boardgames in a specific category
// returns name and id
app.get('/api/boardgames/:category',
    (req, resp) => {
        console.info('>>> category: ', req.params.category)
        client.db('bgreview')
            .collection('gameinfo')
            .aggregate([
                { $match: { boardgamecategory: { $regex: `.*${req.params.category}.*`, $options: 'i' } } },
                { $lookup: { from: "boardgames", localField: "id", foreignField: "ID", as: "game" } },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$game", 0] }, "$$ROOT"] } } },
                { $project: { game: 0 } },
            ])
            .project({ Name: 1 })
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

// GET /api/boardgame/:gameId
// returns a sepcific boardgame (includes all info in boardgames and gameinfo)
app.get('/api/boardgame/:gameId',
    (req, resp) => {
        console.log('gameId: ', req.params.gameId)

        const gameId = req.params.gameId;

        client.db('bgreview')
            .collection('boardgames')
            .aggregate([
                { $match: { _id: ObjectId("5d694e2c67c7f6c30e7b050f") } },
                { $lookup: { from: "gameinfo", localField: "ID", foreignField: "id", as: "game" } },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$game", 0] }, "$$ROOT"] } } },
                { $project: { game: 0 } },
            ])
            .then(result => {
                console.info('>>> result: ', result);
                resp.status(200);
                resp.type('application/json');
                resp.json(result);
            })
            .catch(error => {
                resp.status(400);
                resp.end(error);
            })
    }
)

// ** not tested yet!
// GET /api/comments/:gameId
// get comments by gameId
// returns comment and name if not null
app.get('/api/comments/:gameId',
    (req, resp) => {
        const gameId = parseInt(req.params.gameId);

        client.db('bgreview')
            .collection('comments')
            .find(
                { ID: gameId }
            )
            .project({ comment: 1, name: 1 })
            .toArray()
            .then(result => {
                console.info('>>> result: ', result);
                resp.status(200);
                resp.type('application/json');
                resp.json(result);
            })
            .catch(error => {
                resp.status(400);
                resp.end(error);
            })
    }
)

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// POST /api/comments/:gameId
// ** in the form, remember to submit the game name 
app.post('/api/comments/:gameId',
    (req, resp) => {
        const cID = req.params.gameId;
        const cComment = req.body.comment;
        const cUser = req.body.user;
        const cRating = parseInt(req.body.rating);
        const cName = req.body.name;

        client.db('bgreview')
            .collection('comments')
            .insertOne({
                ID = cID,
                comment = cComment,
                user = cUser,
                rating = cRating,
                name = cName,
            })
            .then(result => {
                console.info('>>> result: ', result);
                resp.status(200);
                resp.send(result);
            })
            .catch(error => {
                resp.status(400);
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
