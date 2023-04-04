USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User (
    User_ID INT AUTO_INCREMENT primary key,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    profile_picture VARCHAR(255),
    birthday DATE,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    Role_ID INT NOT NULL,
    FOREIGN KEY(Role_ID) REFERENCES Role(Role_ID)
)