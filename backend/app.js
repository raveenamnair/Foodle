require('dotenv').config()

var cors = require('cors')


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
app.use(cors()) // Use this after the variable declaration

app.route('/user')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `User`", 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/user/:username')
.get(function(req, res, next) {
connection.query(
    "SELECT * FROM `User` WHERE username = ?", req.params.username, 
    function(error, results, fields) {
    if (error) throw error;
    res.json(results);
    }
);
});

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 9000);
app.listen(9000);