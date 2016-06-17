var express = require('express');
var firebase = require('firebase');

var app = express();
var firebase_key = process.env.FIREBASE_KEY || require('./firebase.json').private_key;
var config = {};

console.log(firebase_key);
firebase.initializeApp({
    serviceAccount: {
        projectId: "979611318308473915",
        clientEmail: "backend@project-979611318308473915.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\n" + firebase_key + "\n-----END PRIVATE KEY-----\n"
    },
    databaseURL: "https://project-979611318308473915.firebaseio.com/"
});

firebase.database().ref('/config').on('value', function(data) {
    config = data.val();
});

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.end('working!');
});

app.get('/api', function(req, res) {
    res.json(config);
});

app.listen(app.get('port'), function() {
    console.log('Crazycart app is running on port', app.get('port'));
});

