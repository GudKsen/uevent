USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Role;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Role (
    Role_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
)