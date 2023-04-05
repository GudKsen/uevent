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
  const [content, setContent] = useState("");
  const [commentData, setComment] = useState<any[]>([]);

  function GetComments(id: string | undefined)
  {
    axios.get(`http://localhost:8000/api/event/comments/${id}`)
    .then(response => {
      setComment(response.data);
    });
  }

  useEffect(() => {
    if (id !== undefined)
    {
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
                  {event.poster ?
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
                {
                  commentData.length > 0 ?
                    <div >
                      {commentData && commentData.map(comment =>
                        <div key={comment.Comment_ID}>
                          <div >
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
