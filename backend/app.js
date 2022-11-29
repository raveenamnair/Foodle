require('dotenv').config()

var cors = require('cors')


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
var Buffer = require('buffer').Buffer

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());

/**
 * GET all records from User Table
 */
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

/**
 * GET a specific entry matching the username specified
 */
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

/**
 * POST a new record into the User table
 */
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
        console.log('Posted a new entry in User Table');
      }
    }
  );
});

app.route('/check/password')
.post(express.json(), function(req, res, next) {
  //console.log(req.body)
  //console.log(req.params.password)
  // const obj = JSON.parse(req.body.body)
  // const q = {
  //   password: {"type":"Buffer","data":[49,50,51,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
  // }
  
  // var base64 = Buffer.from(q.password, "base64").toString();
  //        console.log(base64)
  console.log("Typed Password: " + req.body.typedPassword)
  var base64 = Buffer.from(req.body.actualPassword, "base64").toString();
  console.log("Actual Password: " + base64)
  console.log(base64.length)
  res.send('yes')
  // if (base64 === req.body.typedPassword) {
  //   console.log("same")
  //   res.sendStatus(111).send(' Found');

  // } else {
  //   console.log("diff")
  //   res.sendStatus(222).send('Not Found');
  // }
  // // console.log(base64)
  
  
});


/**
 * Just to check status of the connection
 */
app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 9000);
app.listen(9000);