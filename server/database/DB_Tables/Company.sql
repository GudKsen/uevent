USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Company(
    Company_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT(1024)
)