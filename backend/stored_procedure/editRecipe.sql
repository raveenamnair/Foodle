-- task: Edit a recipe 
-- TODO NOT MADE (WAITING FOR ADD RECIPE PAGE)

DROP PROCEDURE IF EXISTS editRecipe;
DELIMITER $$
    CREATE PROCEDURE editRecipe (IN edit_recipe_id INT, IN editor_username TEXT)
    BEGIN 
        DECLARE hashed_password BINARY(32);
        DECLARE saved_password BINARY(32);
        DECLARE result INT;
        SET hashed_password = BINARY(password_text);
        
        SELECT User.password INTO saved_password FROM User WHERE username = username_given;
        IF saved_password = hashed_password THEN
            SET result = 1;
        ELSE 
            SET result = -1;
        END IF;
        SELECT result;
    END $$
DELIMITER ;



