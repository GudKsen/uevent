USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Promocode;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Promocode(
    Promocode_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    discount INT NOT NULL,
    startDateTime DATETIME NOT NULL,
    endDateTime DATETIME,
    Company_ID INT NOT NULL,
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID)
)