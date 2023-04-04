USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event_Promocode;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event_Promocode(
    Event_ID INT NOT NULL,
    Promocode_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(Promocode_ID) REFERENCES Promocode(Promocode_ID)
);