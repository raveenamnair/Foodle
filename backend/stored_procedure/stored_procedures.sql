-- put all your stored procedures in this file

DROP PROCEDURE IF EXISTS checkpassword;
DELIMITER $$

    CREATE PROCEDURE checkpassword (IN  password_text TEXT, IN username_given TEXT, OUT result INT)
    BEGIN 
        DECLARE hashed_password BINARY(32);
        DECLARE saved_password BINARY(32);
        SET hashed_password = BINARY(password_text);
        
        SELECT User.password INTO saved_password FROM User WHERE username = username_given;
        IF saved_password = hashed_password THEN
            SET result = 1;
        ELSE 
            SET result = -1;
        END IF;
    END $$
DELIMITER ;