import { pool } from "../connectDB.js";

export class DatabaseGet {
  async get_events_with_themes() {
    // let command = `select Event.*, Theme.* from Event_Theme join Event on Event.Event_ID = Event_Theme.Event_ID join Theme on Theme.Theme_ID = Event_Theme.Theme_ID`;
    let get_events_command = `select * from Event`;

    const events = await pool.promise().query(get_events_command);
    if (events[0].length) {
      for (let event of events[0]) {
        let event_id = event.Event_ID;
        let user_id = event.Company_ID;

        let command_get_themes_event = `select Theme.* from Event_Theme
                inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
                where Event_Theme.Event_ID = ${event_id}`;

        let command_get_format = `select * from Format where Format_ID = ${event.Format_ID}`;

        let command_get_author = `select * from User where User_ID = ${user_id}`;
        // console.log(command_get_author);
        let author = await pool.promise().query(command_get_author);
        // console.log(author[0]);
        if (author.length) {
          event.author = author[0][0].full_name;
          // console.log(author[0][0].full_name);
        }

        let themes = await pool.promise().query(command_get_themes_event);
        let formats = await pool.promise().query(command_get_format);
        if (themes.length) {
          event.themes = themes[0];
        }
        event.format = formats[0];

        let command_get_location = `select * from Location where Location_ID = ${event.Location_ID}`;
        let data_location = await pool.promise().query(command_get_location);
        event.location = data_location[0];
        // console.log("🚀 ~ file: DatabaseGet.js:45 ~ event:", event);
      }
      return events[0];
    } else {
      return null;
    }
  }

  async get_events_with_themes_by_event_id(event_id) {
    let command_get_event = `select * from Event where Event.Event_ID = ${event_id}`;
    let command_get_themes_event = `select Theme.* from Event_Theme
        inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
        where Event_Theme.Event_ID = ${event_id}`;

    let events = await pool.promise().query(command_get_event);
    const thmemes = await pool.promise().query(command_get_themes_event);

    if (events[0].length) {
      if (thmemes[0].length) {
        events[0][0].themes = thmemes[0];

        if (events[0][0].Price_ID !== null) {
          let priceDataCommand = `select * from Price where Price_ID = ${events[0][0].Price_ID}`;
          let priceData = await pool.promise().query(priceDataCommand);
          if (priceData[0].length) {
            
            events[0][0].price = priceData[0];
          }
        }

        
        return events[0];
      } else {
        return events[0];
      }
    } else {
      return null;
    }
  }

  get_tickets_by_user_id(user_id) {
    let command = `select * from Ticket where User_ID = ${user_id}`;
    let data = pool.promise().query(command);
    if (data[0].length) {
      return data[0];
    } else {
      return null;
    }
  }

  async get_comments_by_event_id(event_id) {
    let command = `select * from Comment where Event_ID = ${event_id}`;

    let data = await pool.promise().query(command);
    if (data[0].length) {
      for (let i = 0; i < data[0].length; i++) {
        let comm = `select * from User where User_ID = ${data[0][i].User_ID}`;
        let data_user = await pool.promise().query(comm);
        if (data_user[0].length) {
          data[0][i].UserInfo = data_user[0][0];
        }
      }
      return data[0];
    } else {
      return null;
    }
  }

  async get_events_by_country(country) {
    let current_date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let get_events_command = `select * from Event 
            inner join Location on Event.Location_ID = Location.Location_ID 
            where Location.Country = '${country}' and Event.publishDate <= '${current_date}'`;

    const events = await pool.promise().query(get_events_command);
    if (events[0].length) {
      for (let event of events[0]) {
        let event_id = event.Event_ID;
        let user_id = event.Company_ID;
        console.log(event);

        let command_get_themes_event = `select Theme.* from Event_Theme
                inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
                where Event_Theme.Event_ID = ${event_id}`;

        let command_get_format = `select * from Format where Format_ID = ${event.Format_ID}`;

        let command_get_author = `select * from Company where Company_ID = ${user_id}`;

        let command_get_price = `select * from Price where Price_ID = ${event.Price_ID}`;

        let author = await pool.promise().query(command_get_author);
        // console.log(author[0]);
        if (author.length) {
          event.author = author[0][0].name;
          // console.log(author[0][0].full_name);
        }

        let themes = await pool.promise().query(command_get_themes_event);
        let formats = await pool.promise().query(command_get_format);
        let price = await pool.promise().query(command_get_price);
        if (themes.length) {
          event.themes = themes[0];
        }
        event.format = formats[0];
        if (price[0].length) {
          event.price = price[0];
        }
      }

      return events[0];
    } else {
      return null;
    }
  }

  async get_company_by_userID(user_id) {
    let command = `select Company.* from Organizer_Company
        inner join Company on Organizer_Company.Company_ID = Company.Company_ID
        where Organizer_Company.User_ID = ${user_id}`;
    let data = await pool.promise().query(command);

    if (data[0].length) {
      return data[0];
    } else {
      return null;
    }
  }

  async GetByID(table, nameID, id) {
    let command = "select * from " + table + " where " + nameID + "_ID = " + id;
    let data = await pool.promise().query(command);
    if (data[0].length) {
      return data[0];
    } else {
      return null;
    }
  }

  async get_events_by_company(id)
  {
    // console.log(id);
    let command = `select * from Event where Company_ID = ${id}`;
    // console.log(command);
    let data = await pool.promise().query(command);
    console.log(data[0]);
    if (data[0].length) {
      return data[0];
    }
    else {
      return null;
    }
    // if (data[0].length) {
    //   for (let datas of data[0]) {
    //     let event_id = datas.Event_ID;
    //     let user_id = datas.Company_ID;
    //     console.log(datas);

    //     let command_get_themes_event = `select Theme.* from Event_Theme
    //             inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
    //             where Event_Theme.Event_ID = ${event_id}`;

    //     let command_get_format = `select * from Format where Format_ID = ${datas.Format_ID}`;

    //     let command_get_author = `select * from Company where Company_ID = ${user_id}`;

    //     let command_get_price = `select * from Price where Price_ID = ${datas.Price_ID}`;

    //     let author = await pool.promise().query(command_get_author);
    //     // console.log(author[0]);
    //     if (author.length) {
    //       datas.author = author[0][0].name;
    //       // console.log(author[0][0].full_name);
    //     }

    //     let themes = await pool.promise().query(command_get_themes_event);
    //     let formats = await pool.promise().query(command_get_format);
    //     let price = await pool.promise().query(command_get_price);
    //     if (themes.length) {
    //       datas.themes = themes[0];
    //     }
    //     datas.format = formats[0];
    //     if (price[0].length) {
    //       datas.price = price[0];
    //     }
    //   }

    //   return data[0];
    // } else {
    //   return null;
    // }
  }

  async get_comments_by_user_id(user_id)
  {
    let command = `select * from Comment where User_ID = ${user_id}`;
    let data = await pool.promise().query(command);
    if (data[0].length)
    {
      return data[0];
    }
    else {
      return null;
    }
  }
}

//const events = await pool.query("SELECT * FROM events WHERE theme_id IS NOT NULL");
//return events.rows;
