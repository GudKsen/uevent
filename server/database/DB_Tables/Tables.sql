USE ucode_web_uevent;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Role;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Role (
    Role_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);


INSERT INTO Role (title, description) 
VALUES ("administrator", 
    "Providing customer support through email or phone to answer questions or address concerns, 
    Setting up user accounts and providing customer service to customers who use the website,
    Maintaining and updating current content on the website");


INSERT INTO Role (title, description)
VALUES ("organizer",
    "Organizers have all the same functions as registered users,
    and Manage the event planning process,
    Determining the venue of the event,
    Supervise event setups");

INSERT INTO Role (title, description)
VALUES ("user",
    "View available events, purchase event tickets, edit or delete your own profile, register your organization");


SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User (
    User_ID INT AUTO_INCREMENT primary key,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    profile_picture VARCHAR(255),
    birthday DATE,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    Role_ID INT NOT NULL,
    FOREIGN KEY(Role_ID) REFERENCES Role(Role_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Location;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Location(
    Location_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    street_number VARCHAR(255) NOT NULL,
    address_line_street VARCHAR(255) NOT NULL,
    address_line_state VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Company(
    Company_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT(1024),
    email VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255),
    Location_ID INT NOT NULL,
    FOREIGN KEY(Location_ID) REFERENCES Location(Location_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Format;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Format(
    Format_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL
);

INSERT INTO Format (title, description) 
VALUES ("Conference", "Large-scale event that revolves around a central theme, topic, or industry.");

INSERT INTO Format (title, description)
VALUES ("Trade show", "A trade show invites many different companies of a specific industry to showcase their products and services to the general public.");

INSERT INTO Format (title, description)
VALUES ("Networking event", "A networking event is an organized opportunity for attendees to meet new people and build their contact lists.");

INSERT INTO Format (title, description)
VALUES ("Workshop", "Workshops offer a “hands-on” alternative to sitting in an event space listening to a guest speaker or participating in a round table.");

INSERT INTO Format (title, description)
VALUES ("Team building event" , "A team building event is an internal corporate event that invites employees to spend quality time together bonding and working toward a common goal.");

INSERT INTO Format (title, description)
VALUES ("Product launch event", "A product launch is just as it sounds; a chance to debut a new product or service to the public.");

INSERT INTO Format (title, description)
VALUES ("Charity event", "Charity events invite attendees to help raise funds for a particular good cause.");

INSERT INTO Format (title, description)
VALUES ("Internal corporate event", "An internal corporate event is any event hosted by a company for its employees, stakeholders, or board members.");

INSERT INTO Format (title, description)
VALUES ("Festival", "An organized concert series or screenings or plays, are usually hosted at a single venue over several days.");

INSERT INTO Format (title, description)
VALUES ("Meet-up", "Whatever your interest — punk rock fan club, property investors, book club — it's always great to connect with like-minded people and enjoy conversation with those who share a passion.");

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Theme;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Theme(
    Theme_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

INSERT INTO Theme (title, description)
VALUES ("IT", "All about computing, including hardware, software, telecommunications and generally anything involved in the transmittal of information or the systems that facilitate communication.");

INSERT INTO Theme (title, description)
VALUES ("Data analysis", "The practice of working with data to glean useful information, which can then be used to make informed decisions.");

INSERT INTO Theme (title, description)
VALUES ("Civil education", "About all the processes that affect people's beliefs, commitments, capabilities, and actions as members or prospective members of communities.");

INSERT INTO Theme (title, description)
VALUES ("Humanities", "Studies the history and development of human thought and culture.");

INSERT INTO Theme (title, description)
VALUES ("Psychology", "The scientific study of the mind and behavior.");

INSERT INTO Theme (title, description)
VALUES ("Business", "Knowledge about what your company does, its purpose, and what makes it unique.");

INSERT INTO Theme (title, description)
VALUES ("Journalism", "The activity of gathering, assessing, creating, and presenting news and information.");

INSERT INTO Theme (title, description)
VALUES ("Personal development", "Looking inward and focusing on ways to better yourself.");

INSERT INTO Theme (title, description)
VALUES ("Health care", "The improvement of health via the prevention, diagnosis, treatment, amelioration or cure of disease, illness, injury, and other physical and mental impairments in people.");

INSERT INTO Theme (title, description)
VALUES ("Social sciences", "Any branch of academic study or science that deals with human behaviour in its social and cultural aspects.");

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Price;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Price (
    Price_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    price_value INT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    exchange_rate INT NOT NULL
);

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

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event_Theme;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event_Theme(
    Event_ID INT NOT NULL,
    Theme_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(Theme_ID) REFERENCES Theme(Theme_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Organizer_Company;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Organizer_Company(
    User_ID INT NOT NULL,
    Company_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Company_ID) REFERENCES Company(Company_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Promocode;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Promocode(
    Promocode_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    discount INT NOT NULL
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Event_Promocode;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Event_Promocode(
    Event_ID INT NOT NULL,
    Promocode_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(Promocode_ID) REFERENCES Promocode(Promocode_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Subscribed_User;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Subscribed_User(
    Event_ID INT NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    FOREIGN KEY(User_ID) REFERENCES User(User_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Ticket;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Ticket (
    Ticket_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Event_ID INT NOT NULL,
    price INT,
    FOREIGN KEY(Event_ID) REFERENCES Event(Event_ID),
    purchase_date TIMESTAMP NOT NULL,
    seat VARCHAR(255) UNIQUE,
    visit_date TIMESTAMP NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID)
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User_Ticket;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS User_Ticket (
    User_ID INT NOT NULL,
    Ticket_ID INT NOT NULL,
    FOREIGN KEY(User_ID) REFERENCES User(User_ID),
    FOREIGN KEY(Ticket_ID) REFERENCES Ticket(Ticket_ID)
);

