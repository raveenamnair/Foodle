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

/*
 * Route for Recipe
 */

app.route('/recipe/:recipe_id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Recipe` WHERE recipe_id = ?", req.params.recipe_id, 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });
  
/*
 * Route for Recipe_Ingredients
 */

app.route('/recipe_ingredients/:recipe_id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Recipe_Ingredients` ri JOIN `Ingredient` i ON ri.ingredient_name = i.name WHERE ri.recipe_id = ?", req.params.recipe_id, 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

/*
 * Route for Rating
 */

/**
 * GET a the average rating for a specific recipe from the Rating table
 */
app.route('/avg_rating/:recipe_id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT AVG(score) as 'avg' FROM `Rating` WHERE recipe_id = ?", req.params.recipe_id, 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

/**
 * POST a new rating for a specific recipe into the Rating table
 */
 app.post('/rating', express.json(), function (req, res) {
  const obj = JSON.parse(req.body.body)
  const values_string = `("${obj.username}", "${obj.recipe_id}", "${obj.score}")`
  connection.query(
    `INSERT INTO Rating VALUES ${values_string}`,
    function(err, data, response) {
      if (err){
        console.log('Error!');
        console.log(err);
      }
      else{
        console.log('Posted a new entry in Rating Table');
      }
    }
  );
});

/*
 * Calls the stored procedure checkpassword() 
 */
app.route('/check_password')
.get(function(req, res, next) {
  connection.query(
    "SET @result = 0; CALL checkpassword(?, ? @result); SELECT @result;", req.params.input_password, req.params.username,
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

/**
 * Just to check status of the connection
 */
 
app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 9000);
app.listen(9000);