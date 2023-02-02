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
    role ENUM('user', 'admin', 'organizator'),
    birthday DATE,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Format;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Format(
    Format_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event(
    Event_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT(1024) NOT NULL,
    poster VARCHAR(255),
    dateTime DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    -- isOffline INT(1) NOT NULL,
    price INT(50),
    isPromocodeAvailable INT(1),
    Format_ID INT NOT NULL,
    FOREIGN KEY(Format_ID) REFERENCES Format(Format_ID),
    Author_ID INT NOT NULL,
    FOREIGN KEY(Author_ID) REFERENCES User(User_ID)
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Comment;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Comment(
    Comment_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    User_ID INT NOT NULL,
    Event_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID)
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Company(
    Company_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT(1024)
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Theme;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Theme(
    Theme_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event_Theme;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event_Theme(
    Event_ID INT NOT NULL,
    Theme_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(Theme_ID) REFERENCES Theme(Theme_ID)
);


USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Organizator_Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Organizator_Company(
    User_ID INT NOT NULL,
    Company_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID)
);

USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Subscribed_User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Subscribed_User(
    Event_ID INT NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(User_ID) REFERENCES User(User_ID)
);


USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User_visit_Event;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User_visit_Event (
    User_ID INT NOT NULL,
    Event_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID)
);
