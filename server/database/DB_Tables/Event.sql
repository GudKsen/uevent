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
    FOREIGN KEY(Format_ID) REFERENCES Format(Format_ID)
)
