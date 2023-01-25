// import { DatabaseUser } from "../../database/DB_Functions/databaseForUser.js"
// let databaseUser = new DatabaseUser();

async function validateUser(user, res, req) {
  // let data = await databaseUser.findByLogin(user.login);
  // let data2 = await databaseUser.findByEmail(user.email);

  // if (data === "Not found" && data2 === "Not found") {
  //   return true;
  // } else if (data !== "Not found") {
  //   res.send("User with this login already exist");
  //   return false;
  // } else if (data2 !== "Not found") {
  //   res.send("User with this email already exist");
  //   return false;
  // }
}

export { validateUser };



