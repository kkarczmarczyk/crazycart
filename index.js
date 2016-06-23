var express = require('express');
var firebase = require('firebase');

var app = express();
var firebase_key = process.env.FIREBASE_KEY || require('./config.json').private_key;
var token = process.env.TOKEN || require('./config.json').token;
var live = {};

firebase.initializeApp({
    serviceAccount: {
        projectId: "979611318308473915",
        clientEmail: "backend@project-979611318308473915.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\n" + firebase_key + "\n-----END PRIVATE KEY-----\n"
    },
    databaseURL: "https://project-979611318308473915.firebaseio.com/"
});

firebase.database().ref('/live').on('value', function(data) {
    live = data.val();
});

app.set('port', (process.env.PORT || 5000));
app.use('/api', function(req, res, next) {
    if(req.query.token !== token) {
        res.status(403).end('You must specify token');
    } else {
        next();
    }
});

app.use('/', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.end('working!');
// });

app.get('/api', function(req, res) {
    res.json(live);
});

app.get('/api/lap', function(req, res) {
    res.end();
    if(req.query.ms && live.race && live.player && live.status) {
        if(live.status == "stop") {
            firebase.database().ref('/live/status/').set("run");
        } else {
            firebase.database().ref('/race/' + live.race + '/players/' + live.player + '/').push(req.query.ms);
        }

    }
});

app.listen(app.get('port'), function() {
    console.log('Crazycart app is running on port', app.get('port'));
});

