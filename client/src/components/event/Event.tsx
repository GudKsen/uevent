import { useNavigate } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'
import "./styleEvent2.scss";
import Sidebar2 from "../sidebar/sidebar2";
import Header from "../sidebar/Header";
import Filter from "./Filter";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../sidebar/sidebar2.scss";

import { useTranslation } from "react-i18next";

interface Format {
  Format_ID: number;
  title: string;
  description: string;
}

interface Theme {
  Theme_ID: number;
  title: string;
  description: string;
}


function Event() {
  // let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [filterPriceStart, setFilterPriceStart] = useState<number>();
  const [filterPriceEnd, setFilterPriceEnd] = useState<number>();
  const [filterTheme, setFilterTheme] = useState<{ value: string, label: string }[]>([]);
  const [filterFormat, setFilterFormat] = useState<{ value: string, label: string }>();
  const [reset, setReset] = useState(false);
  const [free, setFree] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguageHandler = () => {
    let lang = localStorage.getItem("country");
    i18n.changeLanguage(lang!);
  }


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

  if (eventsData !== null) {
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

  // if (filterPriceStart !== undefined && filterPriceEnd === undefined) 
  // {
  //   eventsData = eventsData.filter((event) => {
  //     if (event.price[0].price_value >= filterPriceStart)
  //     {
  //       return event;
  //     }
  //   })
  // }

  // if (filterPriceStart === undefined && filterPriceEnd !== undefined) 
  // {
  //   eventsData = eventsData.filter((event) => {
  //     if (event.price[0].price_value >= 0 && event.price[0].price_value <= filterPriceEnd)
  //     {
  //       return event;
  //     }
  //   })
  // } 

  function FilterPrice()
  {
    eventsData = eventsData.filter((event) => {
      if (filterPriceStart === 0 && event.Price_ID === null) {
        return event;
      }
      else if (event.Price_ID !== null) {
        if (event.price[0].price_value >= filterPriceStart! && event.price[0].price_value <= filterPriceEnd!) {
          return event;
        }
      }
    })
  }

  function FilterFormat()
  {
    eventsData = eventsData.filter((event) => {
      for (let i = 0; i < event.format.length; i++) {
        if (event.format[i].title === filterFormat!.label) {
          return event;
        }
    }})
  }

  function FilterTheme()
  {
    eventsData = eventsData.filter((event) => {
      for (let i = 0; i < event.themes.length; i++) {
        if (event.themes[i].title === filterTheme[0].label) {
          return event;
        }
      }
    })
  }

  if (filterPriceStart !== undefined && filterPriceEnd !== undefined) {
    FilterPrice();
  }

  if (free)
  {
    eventsData = eventsData.filter(event => {
      if (!event.price)
      {
        return event;
      }
    })
  }

  if (filterFormat) {
    FilterFormat();
  }

  if (filterTheme.length > 0) {
    FilterTheme();
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
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  return (
    <div className="allevents">

      {
        userInfo ?
          <div>
            <Sidebar2 />
          </div>
          :
          <div className="body-sidebar nosidebar"></div>

      }

      <div className="list-events">


        <div className="head">
          <Header
          setSearchText={setSearchText}
          setSelectedCountry={setSelectedCountry}
          onChange={(e: any) => ChangeData(e)}
        //setRefreshData = {setRefreshData}
        />
        </div>
        
        

        <div className="list-filter">
          {
            eventsData.length > 0 ?
              <div className="list-events-container">
                {/* <Filter /> */}

                {eventsData && eventsData.map(event =>
                  <div className="card-container" key={event.Event_ID}>
                    <div className="card" onClick={() => { navigate(`/eventpage/${event.Event_ID}`) }}>
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
                            {t(event.title)}
                          </div>
                          <div className="price">
                            {
                              event.price ?
                                <div>{event.price[0].price_value} {getSymbolFromCurrency(event.price[0].currency)}</div>
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


              : <div><br /><p className="choosecountry">There is no events</p></div>

          }
          <div><Filter
            setFilterPriceStart={setFilterPriceStart}
            setFilterPriceEnd={setFilterPriceEnd}
            setFilterTheme={setFilterTheme}
            setFilterFormat={setFilterFormat}
            setFree={setFree}
            setReset={setReset}
            free={free}
          />
          </div>


        </div>




      </div>
    </div>
  );
}

export default Event;
