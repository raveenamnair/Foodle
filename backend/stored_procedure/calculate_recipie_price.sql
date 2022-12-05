-- task: Calculate total price of recipes using the ingredients table
-- example: 


DROP procedure if exists calculate_recipe_price;
DELIMITER //
CREATE PROCEDURE calculate_recipe_price (IN recipe_id integer, OUT price float)
    BEGIN
        DECLARE recipe_price INT;

        SELECT sum(db.t_price) INTO price
        FROM (
            SELECT i.name as name, i.price as price, ri.amount as amount, ri.amount*i.price as t_price
            FROM Recipe_Ingredients as ri
            JOIN Ingredient as i on ri.ingredient_name = i.name
            WHERE ri.recipe_id = recipe_id) as db;
        SELECT price;
    END //
DELIMITER ; 