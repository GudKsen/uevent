USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User_Ticket;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User_Ticket (
    User_ID INT NOT NULL,
    Ticket_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Ticket_ID) REFERENCES Ticket(Ticket_ID)
)