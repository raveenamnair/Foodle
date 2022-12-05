-- task: Get user statistic for recipe posted, rating posted, average rating, and most expensive recipe

DROP PROCEDURE IF EXISTS getUserStat;
DELIMITER $$
    CREATE PROCEDURE getUserStat (IN in_username TEXT)
    BEGIN
        DECLARE _recipe_posted INT;
        DECLARE _rating_posted INT;
        DECLARE _avg_recipe_rating FLOAT;
        DECLARE _most_expensive_recipe TEXT;
        DECLARE curr_recipe_id INT;
        DECLARE noMoreRow INT;
        DECLARE recipe_cur CURSOR FOR SELECT recipe_id FROM Recipe WHERE author = in_username;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET noMoreRow = 0;
        DROP TABLE IF EXISTS userStat;
        DROP TABLE IF EXISTS tempRecipePrice;
        CREATE TABLE userStat(
            recipe_posted INT,
            rating_posted INT,
            avg_recipe_rating FLOAT,
            most_expensive_recipe TEXT
        );
        CREATE TABLE tempRecipePrice(
            recipe_id INT,
            price FLOAT
        );
        OPEN recipe_cur;

        SELECT COUNT(*) INTO _recipe_posted FROM Recipe WHERE author = in_username;
        SELECT COUNT(*) INTO _rating_posted FROM Rating WHERE username = in_username;
        SELECT AVG(Rating.score) INTO _avg_recipe_rating FROM Recipe JOIN Rating 
            ON Recipe.recipe_id = Rating.recipe_id
        WHERE Recipe.author = in_username;

        ITR: LOOP
            FETCH recipe_cur INTO curr_recipe_id;
            IF noMoreRow = 0 THEN
                CLOSE recipe_cur;
                LEAVE ITR;
            END IF;
            CALL calculate_recipe_price(curr_recipe_id, @price);
            INSERT INTO tempRecipePrice VALUES (curr_recipe_id, @price);
        END LOOP;
        
        SELECT Recipe.name INTO _most_expensive_recipe FROM Recipe JOIN tempRecipePrice
            ON Recipe.recipe_id = tempRecipePrice.recipe_id
        WHERE tempRecipePrice.price = (SELECT MAX(tempRecipePrice.price) FROM Recipe JOIN tempRecipePrice
                ON Recipe.recipe_id = tempRecipePrice.recipe_id
            WHERE Recipe.author = in_username);

        INSERT INTO userStat VALUES (_recipe_posted, _rating_posted, _avg_recipe_rating, _most_expensive_recipe);
        SELECT * FROM userStat;
    END $$
DELIMITER ;