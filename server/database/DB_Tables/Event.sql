USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event(
    Event_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT(1024) NOT NULL,
    poster VARCHAR(255),
    startDateTime DATETIME NOT NULL,
    publishDate DATETIME NOT NULL,
    duration TIME(0),
    endDateTime DATETIME,
    Location_ID INT,
    FOREIGN KEY(Location_ID) REFERENCES Location(Location_ID),
    Price_ID INT(50),
    isPromocodeAvailable INT(1),
    Format_ID INT NOT NULL,
    FOREIGN KEY(Format_ID) REFERENCES Format(Format_ID),
    Company_ID INT NOT NULL,
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID),
    FOREIGN KEY(Price_ID) REFERENCES Price(Price_ID)
);
