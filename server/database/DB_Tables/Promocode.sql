USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Promocode;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Promocode(
    Promocode_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    discount INT NOT NULL,
    startDateTime DATETIME,
    endDateTime DATETIME,
    Company_ID INT NOT NULL,
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID)
);

INSERT INTO Promocode (title, description, discount, Company_ID)
VALUES ("sale22",
    "dicscont to 22%", 22, 1);
    
    INSERT INTO Promocode (title, description, discount, Company_ID)
VALUES ("sale33",
    "dicscont to 33%", 3, 2);