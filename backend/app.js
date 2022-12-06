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

/**
 * GET user statics with stored procedure
 */
app.route('/user/stats/:username').get(function(req, res, next) {
  connection.query(
    `CALL getUserStat(${req.params.username})`, function(err, results, response) {
      if (err) {
        console.error(err);
        res.status(400).json({error: err});
        return;
      }

      res.json(results)
    }
  )
})

/*
 * Route for Recipe
 */

app.route('/recipe/:recipe_id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Recipe` WHERE recipe_id = ?", req.params.recipe_id, 
      function(error, results, fields) {
        if (error) {
          res.status(400).json({error: err});
          return;
        }
        res.json(results);
      }
    );
  });

app.route('/recipe/delete', express.json()).post(function(req, res, next) {
  const obj = JSON.parse(req.body.body)
  const values_string = `${obj.recipe_id}, "${obj.username}"`
  connection.query(
    `CALL deleteRecipe(${values_string})`, function(err, results, response) {
      if (err) {
        console.error(err);
        res.status(400).json({error: err});
        return;
      }

      res.json(results)
    }
  )
})
  
/*
 * Route for Recipe_Ingredients
 */

app.route('/recipe_ingredients/:recipe_id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Recipe_Ingredients` ri JOIN `Ingredient` i ON ri.ingredient_name = i.name WHERE ri.recipe_id = ?", req.params.recipe_id, 
      function(error, results, fields) {
        if (error) {
          res.status(400).json({error: err});
          return;
        }

        res.json(results);
      }
    );
  });

/**
 * GET a the average rating for a specific recipe from the Rating table
 */
app.route('/avg_rating/:recipe_id')
  .get(function(req, res, next) {
    connection.query("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED", function(err, results, response) {
      if (err) {
        console.error(err);
        res.status(500).json({error: err});
        return;
      }
  
      connection.beginTransaction(function(err, results, response) {
        if (err) {
          console.error(err);
          res.status(500).json({error: err});
          return;
        }
  
        connection.query("SELECT AVG(score) as avg FROM Rating WHERE recipe_id = ?", req.params.recipe_id,
          function(err, results, response) {
            if (err) {
              console.error(err)
              connection.rollback();
              res.status(400).json({error: err})
              return;
            }
            
            connection.commit((err) => {
              if (err) {
                console.error(err)
                res.status(500).json({error: err})
                return;
              }
  
              res.json(results);
            });
          });
  
      });
    });
  });

/**
 * POST a new rating for a specific recipe into the Rating table
 */
app.route('/rating', express.json()).post(function(req, res, next) {
  const obj = JSON.parse(req.body.body)
  const values_string = `("${obj.username}", ${obj.recipe_id}, ${obj.score})`
  connection.query("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED", function(err, results, response) {
    if (err) {
      console.error(err);
      res.status(500).json({error: err});
      return;
    }

    connection.beginTransaction(function(err, results, response) {
      if (err) {
        console.error(err);
        res.status(500).json({error: err});
        return;
      }

      connection.query(`INSERT INTO Rating(username, recipe_id, score) VALUES ${values_string}`,
        function(err, results, response) {
          if (err) {
            console.error(err)
            connection.rollback();
            res.status(400).json({error: err})
            return;
          }
          
          connection.commit((err) => {
            if (err) {
              console.error(err)
              res.status(500).json({error: err})
              return;
            }

            res.json(results);
          });
        });
    });
  });
});

/*
 * Calls the stored procedure checkpassword() 
 */
app.route('/check_password')
.post(function(req, res, next) {
  console.log(req.body)
  const obj = JSON.parse(req.body.body)
  
  //console.log(obj.input_password)
  const values_string = `"${obj.input_password}", "${obj.username}"`

  connection.query(
    `CALL checkpassword(${values_string});`,
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

/*
 *
 */
// app.route('/filter/rating_category')
// .get(function(req, res, next) {
//   console.log(req.body)
//   const obj = JSON.parse(req.body.body)

//   connection.query(
//     `SELECT * FROM Recipe WHERE Recipe.recipe_id = (SELECT DISTINCT recipe_id FROM Recipe_Ingredients WHERE recipe_id NOT IN (SELECT recipe_id from Recipe_Ingredients WHERE ingredient_name = '${obj.ingredient_name}'));`
//   ,
//   function(err, results, response) {
//     if (err) {
//       console.error(err);
//       res.status(400).json({error: err});
//       return;
//     }
//     res.json(results);

//   });
// });

app.route('/filter/rating_category/:ingredient')
  .get(function(req, res, next) {
    console.log("I AM HERE")
    console.log(req.params.ingredient)
    
    // connection.query(
    //   `SELECT * FROM Recipe WHERE Recipe.recipe_id = (SELECT DISTINCT recipe_id FROM Recipe_Ingredients WHERE recipe_id NOT IN (SELECT recipe_id from Recipe_Ingredients WHERE ingredient_name = ?));`, req.params.ingredient,
    //   function(error, results, fields) {
    //     if (error) {
    //       res.status(400).json({error: error});
    //       return;
    //     }
    //     res.json(results);
    //   }
    // );
    connection.query(
      `select * from Recipe, (select distinct recipe_id from Recipe_Ingredients where recipe_id not in (select recipe_id from Recipe_Ingredients where ingredient_name = ?)) as t where t.recipe_id = Recipe.recipe_id;`, req.params.ingredient,
      function(error, results, fields) {
        if (error) {
          res.status(400).json({error: error});
          return;
        }
        res.json(results);
      }
    );
  });


// select * from Recipe where Recipe.recipe_id = (select distinct recipe_id from Recipe_Ingredients where recipe_id not in (select recipe_id from Recipe_Ingredients where ingredient_name = 'Salt'));
/**
 * Just to check status of the connection
 */
 
app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 9000);
app.listen(9000);