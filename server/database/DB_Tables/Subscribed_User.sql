USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Subscribed_User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Subscribed_User(
    Organizator_ID INT NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY(Organizator_ID) REFERENCES Organizator(Organizator_ID),
    FOREIGN KEY(User_ID) REFERENCES User(User_ID)
)