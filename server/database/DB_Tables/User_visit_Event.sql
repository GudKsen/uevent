USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User_visit_Event;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User_visit_Event (
    User_ID INT NOT NULL,
    Event_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID)
)