USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Location;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Location(
    Location_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    street_number VARCHAR(255) NOT NULL,
    address_line_street VARCHAR(255) NOT NULL,
    address_line_state VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);