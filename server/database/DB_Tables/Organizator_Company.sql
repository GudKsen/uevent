USE ucode_web_uevent;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Organizator_Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Organizator_Company(
    Organizator_ID INT NOT NULL,
    Company_ID INT NOT NULL,
    FOREIGN KEY(Organizator_ID) REFERENCES Organizator(Organizator_ID),
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID)
)