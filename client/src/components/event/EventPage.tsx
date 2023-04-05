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
import "../sidebar/sidebar2.scss";

function EventPage() {
  let { id } = useParams();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const [event, setEvent] = useState<any>([]);
  const [animate, setAnimate] = useState("");
  const [content, setContent] = useState("");
  const [commentData, setComment] = useState<any[]>([]);

  function GetComments(id: string | undefined) {
    axios.get(`http://localhost:8000/api/event/comments/${id}`)
      .then(response => {
        setComment(response.data);
      });
  }

  useEffect(() => {
    if (id !== undefined) {
      GetComments(id);
    }

  }, [id]);


  useEffect(() => {
    axios.get(`http://localhost:8000/api/event/${id}`, {
      params: { token: localStorage.getItem("token") }
    }).then(response => {
      setEvent(response.data[0]);
      console.log(response.data);
    });
  }, [id])

  function handleClickButton() {
    setAnimate("animate");
    setTimeout(() => {
      setAnimate("");
    }, 8000);
  }

  function createComment(e: any) {
    e.preventDefault();

    axios.post("http://localhost:8000/api/comment",
      {
        content: content,
        id: id,
        token: localStorage.getItem("token")
      });
    GetComments(id);
  }

  return (
    <div className="cardevent">

      {/* ниже поменяно */}

{
        userInfo ?
            <Sidebar2 />
          :
          <div className="nosidebar"></div>

      }

      {/* выше */}

      {/* <Sidebar2 /> */}
      <div className="event-info-container">
        <Header />
        <div className="create">

          {/* <div className="event-create"> */}
            <form className="event-create" action="#">
              <div className="maindata-comment">
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
                        <div className="event-title">Title: {event.title}</div> 
                        {/* <Rating/> */}
                        {/* <p>{event.description}</p> */}
                        </div>
                      <div className="description">
                        Description: {event.description}<br/>
                      </div>
                      {/* <div className="location">
                        {event.location}
                      </div> */}
                      {/* <div className="price"> */}
                        Price: {event.price}<br/>
                        
                        Time: {new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br/>
                        Date: {new Date(event.startDateTime).toLocaleDateString()}<br/>
                        Adress: {event.address_line_street}, {event.street_number}<br/>
                      {/* </div> */}
                      {/* <div className="Themes">
                        {event.themes}
                      </div> */}
                      {/* <div className="format">
                        {event.format}
                      </div> */}

                      {/* <div className="date">

                      </div> */}
                    </div>
                  </div>
                  <div className="button-container">
                      <button className={`button ${animate}`} onClick={handleClickButton}>Buy</button>
                  </div>
                  
                  
                </div>

                <div className="typeevent">
                  <div className="comment">
                    <h2>Comments</h2>
                    {
                      commentData.length > 0 ? 
                      <div >
                        {commentData && commentData.map(comment =>
                        <div  key={comment.Comment_ID}>
                          <div >
                            <div>
                              {comment.UserInfo.full_name}
                              </div>
                            <div >
                            {new Date(comment.date).toLocaleDateString()} {new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div >
                              {comment.content}
                            </div>
                          </div>
                        </div>
                        )}
                      </div> 
                      : <div>There are no comments</div>
                    }
                    <div >
                      <div >
                        <input onChange={(e) => setContent(e.target.value)} type="text" placeholder="Enter comment" required></input>
                      </div>
                      <button onClick={createComment}>Create</button>
                    </div>
                    
                    
                  </div>
                 </div>
              </div>
              
              <div className="author-info">
                <div className="author">
                  {event.author}hhvhjj
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
