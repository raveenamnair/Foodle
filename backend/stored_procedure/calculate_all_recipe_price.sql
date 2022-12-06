-- Returns total price of recipes and recipe_id using the ingredients table
-- example: 


DROP procedure if exists calculate_all_recipe_price;

DELIMITER //
    CREATE PROCEDURE calculate_all_recipe_price ()
    BEGIN
        DECLARE recipe_price INT;
        

        SELECT r.recipe_id as recipe_id, r.name as name, r.author as author, r.duration as duration, r.servings as servings, r.cuisine as cuisine, r.category as category, r.dietary_restriction as dietary_restriction, d.price as price
        FROM (
            SELECT db.id as recipe_id,  sum(db.t_price) as price
            FROM (
                SELECT ri.recipe_id as id, ri.amount*i.price as t_price
                FROM Recipe_Ingredients as ri
                JOIN Ingredient as i on ri.ingredient_name = i.name
                ) as db
            GROUP BY db.id
            ORDER BY sum(db.t_price)
        ) as d
        join Recipe as r on r.recipe_id=d.recipe_id;

        
        
    END //
DELIMITER ; 

call calculate_all_recipe_price();