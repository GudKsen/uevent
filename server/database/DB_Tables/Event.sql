USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event(
    Event_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT(1024) NOT NULL,
    Poster VARCHAR(255),
    DateTimeEvent DATETIME NOT NULL,
    Place VARCHAR(255) NOT NULL,
    isOffline INT(1) NOT NULL,
    Price INT(50),
    isPromocodeAvailable INT(1),
    format INT NOT NULL,
    FOREIGN KEY(format) REFERENCES Format(Format_ID)
)