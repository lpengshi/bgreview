// Load libraries
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');

// Configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// Load configuration 
const config = require('./config.json');

const URL = config.mongo || 'mongodb://localhost:27017';

// Create an instance of MongoClient
const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })

// Create an instance of the application
const app = express();

// GET /api/boardgames?name=xxx&offset=xxx&limit=xxx
// gets a list of boardgames with name like...
// returns name and id only
app.get('/api/boardgames',
    (req, resp) => {
        const name = req.query.name || "";

        const lim = parseInt(req.query.limit);
        const off = parseInt(req.query.offset);

        const limit = lim || 10;
        const offset = off * limit || 0;
        console.info(req.query);
        client.db('bgreview')
            .collection('boardgames')
            .aggregate([
                {
                    $facet: {
                        "result_pool_count": [
                            { $match: { Name: { $regex: `.*${name}.*`, $options: 'i' } } },  //find games with matching name
                            { $count: "count" }
                        ],
                        "results": [
                            { $match: { Name: { $regex: `.*${name}.*`, $options: 'i' } } },  //find games with matching name
                            { $project: { ID: 1, Name: { $trim: { input: "$Name", chars: "\"'" } } } }, //remove the quotations if any
                            { $sort: { Name: 1 } },
                            { $skip: offset },
                            { $limit: limit }
                        ]
                    },
                },
                { $unwind: "$result_pool_count" },
            ])
            //.sort({ Name: 1 })
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

// GET /api/categories
// gets a list of categories 
// returns category name only
app.get('/api/categories',
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
app.get('/api/boardgames/:category/:offset?/:limit?',
    (req, resp) => {
        console.info('>>> category: ', req.params.category)
        console.info('>>> params: ', req.params)

        const lim = parseInt(req.params.limit);
        const off = parseInt(req.params.offset);

        const limit = lim && lim > 0 ? lim : 10;
        const offset = off ? (off * limit) : 0;

        client.db('bgreview')
            .collection('gameinfo')
            .aggregate([
                {
                    $facet: {
                        "result_pool_count": [
                            { $match: { boardgamecategory: { $regex: `.*${req.params.category}.*`, $options: 'i' } } },
                            // { $group: { _id: null, count: { $sum: 1 } } },
                            // { $project: { _id: 0 } }
                            { $count: "count" }
                        ],
                        "result": [
                            { $match: { boardgamecategory: { $regex: `.*${req.params.category}.*`, $options: 'i' } } },
                            {
                                $lookup: {
                                    from: "boardgames",
                                    localField: "id",
                                    foreignField: "ID",
                                    as: "game"
                                }
                            },
                            { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$game", 0] }, "$$ROOT"] } } },
                            { $project: { _id: 1, ID: 1, Name: 1 } },
                            { $skip: offset },
                            { $limit: limit }
                        ]
                    }
                },
                { $unwind: "$result_pool_count" },
            ])
            .toArray() //
            .then(result => {
                resp.status(200);
                resp.type('application/json');
                resp.json(result);
            })
            .catch(error => {
                console.error(error);
                resp.status(400).send();
                //resp.end(error);
            })
    }
)

// GET /api/boardgame/:gameId
// returns a sepcific boardgame (includes all info in boardgames and gameinfo)
app.get('/api/boardgame/:gameId',
    (req, resp) => {
        const gameId = parseInt(req.params.gameId);

        client.db('bgreview')
            .collection('boardgames')
            .aggregate([
                { $match: { ID: gameId } },
                { $lookup: { from: "gameinfo", localField: "ID", foreignField: "id", as: "game" } },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$game", 0] }, "$$ROOT"] } } },
                { $project: { game: 0 } },
            ])
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

// GET /api/comments/gameId&offset=xxx&limit=xxx
// get comments by gameId
// returns name, user and comment
app.get('/api/boardgame/:gameId/comments',
    (req, resp) => {
        const gameId = parseInt(req.params.gameId);
        //const offset = parseInt(req.query.offset) || 0;
        //const limit = parseInt(req.query.limit) || 20;

        client.db('bgreview')
            .collection('comments')
            .find(
                { ID: gameId }
            )
            .sort({ _id: -1 }) // sort by descending // newest comment first
            //.project({ comment: 1, name: 1, user: 1 })
            //.skip(offset)
            //.limit(limit)
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
// POST /api/comments/:gameId
// ** in the form, remember to submit the game name 
app.post('/api/boardgame/:gameId/comments',
    (req, resp) => {
        const cID = parseInt(req.params.gameId);
        const cComment = req.body.comment;
        const cUser = req.body.user;
        const cRating = parseInt(req.body.rating);
        const cName = req.body.name;

        console.info(">>> ID: ", cID);
        console.info(">>> comment: ", cComment);
        console.info(">>> user: ", cUser);
        console.info(">>> rating: ", cRating);
        console.info(">>> name: ", cName);

        const review = {
            ID: cID,
            comment: cComment,
            user: cUser,
            rating: cRating,
            name: cName,
        };

        client.db('bgreview')
            .collection('comments')
            .insertOne(review)
            .then(result => {
                console.info('>>> inserted: ', review);
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
