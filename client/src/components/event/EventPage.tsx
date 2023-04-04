import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";
import "./styleeventpage.scss";
import "./buttonStyle.scss";
import Rating from "./rating/Rating";

function EventPage() {
  let { id } = useParams();
  const [event, setEvent] = useState<any>([]);
  const [animate, setAnimate] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/event/${id}`).then(response => {
      setEvent(response.data[0]);
      console.log(response.data);
    });
  }, [id])

  function handleClickButton() 
  {
    setAnimate("animate");
    setTimeout(() => {
      setAnimate("");
    }, 8000);
  }

  return (
    <div className="cardevent">

      <Sidebar2 />
      <div className="event-info-container">
        <Header />
        <div className="create">

          {/* <div className="event-create"> */}
            <form className="event-create" action="#">
              <div className="maindata">
                <div className="ev-inf">
                  <div className="event-photo">
                    {/* <img src={'http://localhost:8000/images/no_photo.jpg'} alt="" /> */}
                    { event.poster ? 
                  <img src={`http://localhost:8000/images/${event.poster}`} alt="" />
                  :
                  <img src={`http://localhost:8000/images/no_photo.jpg`} alt="" />
                }
                  </div>
                  <div className="event-text">
                    <div className="event-header">
                      <div className="event-title">{event.title}</div> 
                      {/* <Rating/> */}
                      {/* <p>{event.description}</p> */}
                      </div>
                    <div className="description">
                      {event.description}
                    </div>
                    <div className="date">

                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button className={`button ${animate}`} onClick={handleClickButton}>Buy</button>
                </div>
              </div>

              <div className="typeevent">
                <div className="format">
                  <h2>Comments</h2>
                  
                </div>
                <div className="Themes">
                
                </div>
                
              </div>
            </form>
          </div>
          
              
        </div>
        {/* <div className="event-info">
          <div className="event">
              <div className="event-photo">
                <img src={'http://localhost:8000/images/no_photo.jpg'} alt="" />
              </div>
              <div className="event-text">
                 
                    <div className="event-header">
                      <div className="event-title">{event.title}</div> */}
                      {/* <Rating/> */}
                      {/* <p>{event.description}</p> */}
                      {/* </div>
                    <div className="description">
                      {event.description}
                    </div>
                    <div className="date">

                    </div>
                    <div className="button-container">
                      <button className={`button ${animate}`} onClick={handleClickButton}>Buy</button>
                    </div>
                    
              </div>
          </div>
        </div> */}
      </div>
    // </div>
  );
}

export default EventPage;
