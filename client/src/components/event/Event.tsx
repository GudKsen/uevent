import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styleEvent2.scss";
import Sidebar2 from "../sidebar/sidebar2";
import Header from "../sidebar/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Event() {
  // let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [refreshData, setRefreshData] = useState(false);


  let [eventsData, setEventsData] = useState<any[]>([]);

  useEffect(() => {
    let country_code = localStorage.getItem("country");
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    axios.get(`http://localhost:8000/api/events`,
      {
        params: { country: country_code ? regionNames.of(country_code) : "" }
      }
    ).then((res) => {
      setEventsData(res.data);
      console.log(res.data);

    });
  }, []);

  if (eventsData != null) {
    eventsData.forEach(element => {
      let date = new Date(element.dateTime);
      let year = date.getFullYear();
      // let month = date.getMonth();
      const month = date.toLocaleString('default', { month: 'long' });
      let day = date.getDate();
      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);
      element.dateStr = day.toString() + ' ' + month.toString() + " " + year.toString();
      element.timeStr = hours.toString() + ':' + minutes.toString();
    });
  }



  const handleClick = (text: any) => {
    setSearchText(text);
    console.log(text);
  };

  if (searchText.length > 0) {
    eventsData = eventsData.filter((post) => {
      return post.title.includes(searchText);
    })
  }


  function ChangeData(e: any) {
    e.preventDefault();
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    regionNames.of(selectedCountry);  // "United States"
    console.log(regionNames.of(selectedCountry));

    axios.get(`http://localhost:8000/api/events`,
      {
        params: { country: regionNames.of(selectedCountry)!.toString() }
      }
    ).then((res) => {
      setEventsData(res.data);
      console.log(res.data);

    });
  }

  return (
    <div className="allevents">

      <div>
        <Sidebar2 />
      </div>

      <div className="list-events">
        <Header
          setSearchText={setSearchText}
          setSelectedCountry={setSelectedCountry}
        onChange={(e:any) =>  ChangeData(e)}
        //setRefreshData = {setRefreshData}
        />

        {
          eventsData.length > 0 ?
            <div className="list-events-container">
              {eventsData && eventsData.map(event =>
                <div className="card-container" key={event.Event_ID}>
                  <div className="card" onClick={() => { navigate(`${event.Event_ID}`) }}>
                    <div className="card-header">
                      {/* <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" /> */}

                      {event.poster ?
                        <img src={`http://localhost:8000/images/${event.poster}`} alt="" />
                        :
                        <img src={`http://localhost:8000/images/no_photo.jpg`} alt="" />
                      }

                    </div>
                    <div className="card-body">

                      <div className="top-container-card-body">
                        <div className="title-event">
                          {event.title}
                        </div>
                        <div className="price">
                          {
                            event.price ?
                              <div>{event.price}</div>
                              : <div>Free</div>
                          }
                        </div>
                      </div>


                      <div className="author-event">
                        by {event.author}
                      </div>
                      {/* <div className="price">
                          56
                        </div> */}

                      {/* <div className="description autoShowHide">
                        {event.description}
                      </div> */}

                      <div className="date-price-container">
                        <div className="date time">
                          <img className="clock-icon-allevents" src={require("../../public/video/clock.png")} alt="" />


                          {new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        <div className="date time">
                          <img className="clock-icon-allevents" src={require("../../public/video/calendar (1).png")} alt="" />
                          {new Date(event.startDateTime).toLocaleDateString()}
                        </div>

                      </div>


                      <div className="location">
                        <img className="clock-icon-allevents" src={require("../../public/video/location.png")} alt="" />
                        {event.address_line_street}, {event.street_number}
                      </div>

                      {/* { event.themes && event.themes.map((theme: any) =>
                    <div>
                      {theme.title} {theme.description}
                    </div>
                  )} */}
                      <div className="bottom-container">
                        <div className="user">
                          {/* <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" /> */}
                          <div className="user-info">
                            {/* <h5>{event.author}</h5> */}


                          </div>

                        </div>



                      </div>



                    </div>
                  </div>
                </div>
              )}

            </div>

            : <div>There are no events</div>
        }
      </div>
    </div>
  );
}

export default Event;
