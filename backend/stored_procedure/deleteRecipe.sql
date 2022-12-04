-- task: Delete a recipe 

DROP PROCEDURE IF EXISTS deleteRecipe;
DELIMITER $$
-- Delete recipe_ingredients and rating first then delete recipe
    CREATE PROCEDURE deleteRecipe (IN in_recipe_id INT, IN in_username TEXT)
    BEGIN
        DECLARE recipe_author TEXT;
        DECLARE result INT;
        SELECT author INTO recipe_author FROM Recipe WHERE recipe_id = in_recipe_id;

        -- Delete only when the given recipe is in the database and the author is the one trying to delete
        IF recipe_author = in_username THEN
            DELETE FROM Rating WHERE recipe_id = in_recipe_id;
            DELETE FROM Recipe_Ingredients WHERE recipe_id = in_recipe_id;
            DELETE FROM Recipe WHERE recipe_id = in_recipe_id AND author = in_username;
            SET result = 1;
        ELSE
            SET result = -1;
        END IF;

        SELECT result;
    END $$
DELIMITER ;