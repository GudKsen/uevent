import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";
import "./styleeventpage.scss";
import "./buttonStyle.scss";
import Rating from "./rating/Rating";
import "../sidebar/sidebar2.scss";
import "../event/CreateEvent/styleCreateEvent.scss";


function EventPage() {
  let { id } = useParams();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const [event, setEvent] = useState<any>([]);
  const [animate, setAnimate] = useState("");
  const [content, setContent] = useState("");
  const [commentData, setComment] = useState<any[]>([]);

  function GetComments(id: string | undefined) {
    console.log(id);
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

  async function deleteComment(idComment: any) {
    await axios.delete(`http://localhost:8000/api/comment/${idComment}`, {
      data: { token: localStorage.getItem("token") }
    });
    GetComments(id);
  }

  async function createComment(e: any) {
    e.preventDefault();

    await axios.post("http://localhost:8000/api/comment",
      {
        content: content,
        id: id,
        token: localStorage.getItem("token")
      });
    GetComments(id);
  }

  return (
    <div className="cardevent">

      {
        userInfo ?
          <Sidebar2 />
          :
          <div className=" body-sidebar nosidebar"></div>

      }

      <div className={`event-info-container `}>
        <Header />
        <div className={`create`}>

          {/* <div className="event-create"> */}
          <form className="event-create" action="#">
            <div className="maindata-comment">
              <div className={`maindata `}>
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
                      <div className="event-title">
                        <p>Title:   {event.title}</p>
                      </div>
                      {/* <Rating/> */}
                      {/* <p>{event.description}</p> */}
                    </div>
                    <div className="description">
                      <p>Description:   {event.description}</p><br />
                    </div>
                    {/* <div className="location">
                        {event.location}
                      </div> */}
                    {/* <div className="price"> */}
                    <p>Price:   {event.price}</p>

                    <p>Time:   {new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Date:   {new Date(event.startDateTime).toLocaleDateString()}</p>
                    <p>Address:   {event.address_line_street}, {event.street_number}</p>


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
                {
                  userInfo ?
                    <div className="button-container">
                      <button className={`button ${animate}`} onClick={handleClickButton}>Buy</button>
                    </div>
                    :
                    <div className="button-container">
                      <button className={` disabledBuyButton`}
                        title="You should register ot login to purchase ticket" disabled>Buy</button>
                    </div>
                }



              </div>

              <div className={`typeevent `}>
                <div className="comment">
                  <h2>Comments</h2>
                  {
                    commentData.length > 0 ?
                      <div >
                        {commentData && commentData.map(comment =>
                          <div key={comment.Comment_ID}>
                            <div >
                              <div className="time-name">
                                <div className="namecom">
                                  {/* <p></p> */}
                                  <label>{comment.UserInfo.full_name}</label>

                                </div>
                                <div className="timecom">
                                  <label>{new Date(comment.date).toLocaleDateString()} {new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </label>

                                </div>
                              </div>

                              <div className="content-del-up">
                                <div className="content">
                                  <p>{comment.content}</p>
                                  {/* <p>{comment.Comment_ID}</p> */}
                                </div>
                                {
                                  (userInfo && comment.UserInfo.full_name == userInfo.full_name) ?
                                    <div className="del-up">
                                      <div className="del" onClick={() => { deleteComment(comment.Comment_ID) }}>
                                      </div>
                                      <div className="up">
                                      </div>
                                    </div> :
                                    <div></div>
                                }


                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      : <div><p>There are no comments</p></div>
                  }
                  <div className="create-comm">
                    <div className="input-box-a">
                      <input onChange={(e) => setContent(e.target.value)} type="text" placeholder="Enter comment"></input>
                    </div>
                    <button onClick={createComment}>Create</button>
                  </div>


                </div>
              </div>
            </div>

            <div className={`author-info`}>
              <div className={`author `}>
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
