require('dotenv').config()

var cors = require('cors')


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
var Buffer = require('buffer').Buffer

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());


app.route('/user')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `User`", 
      function(error, results, fields) {
        if (error) throw error;
        // This works 
        const q = {"password":{"type":"Buffer","data":[49,50,51,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}
        var base64 = Buffer.from(q.password, "base64").toString();
        console.log(base64)
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

app.post('/user', express.json(), function (req, res) {
  const obj = JSON.parse(req.body.body)
  const values_string = `("${obj.username}", "${obj.name}", "${obj.password}")`
  connection.query(
    `INSERT INTO User VALUES ${values_string}`,
    function(err, data, response) {
      if (err){
        console.log('Error!');
        console.log(err);
      }
      else{
        console.log('Posted an image!');
      }
    }
  );
});


app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 9000);
app.listen(9000);