USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User (
    User_ID INT AUTO_INCREMENT primary key,
    Full_name VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(120) UNIQUE NOT NULL,
    Profile_picture VARCHAR(255),
    Role ENUM('user', 'admin', 'organizator'),
    Birthday DATE,
    Phone_number VARCHAR(50) UNIQUE NOT NULL,
    Address VARCHAR(255) NOT NULL,
)