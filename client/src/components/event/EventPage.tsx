import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'

import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";
import "./styleeventpage.scss";
import "./buttonStyle.scss";
import Rating from "./rating/Rating";
import "../sidebar/sidebar2.scss";
import "../event/CreateEvent/styleCreateEvent.scss";
import { useOutsideClick } from "../Admin/utils/useOutsideClick";

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

function EventPage() {
  let { id } = useParams();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const [event, setEvent] = useState<any>([]);
  const [animate, setAnimate] = useState("");
  const [content, setContent] = useState("");
  const [commentData, setComment] = useState<any[]>([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    itemID: null
  });
  const [format, setFormat] = useState<Format>();
  const [company, setCompany] = useState<any>();
  const navigate = useNavigate();


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
    }).then(async response => {
      await setEvent(response.data[0]);
      console.log(response.data);
      await GetFormat(response.data[0]);
      await GetCompany(response.data[0]);
    });


  }, [id])

  function GetFormat(event: any) {
    axios.get(`http://localhost:8000/api/format/${event.Format_ID}`, {
      params: { token: localStorage.getItem("token") }
    }).then((res) => {
      setFormat(res.data[0]);
      console.log(res.data[0]);
    })
  }

  function GetCompany(event: any) {
    axios.get(`http://localhost:8000/api/company/${event.Company_ID}`).then((res) => {
      setCompany(res.data[0]);
      console.log(res.data[0]);
    })
  }

  function handleClickButton(id: any) {
    setAnimate("animate");
    setTimeout(() => {
      setAnimate("");
    }, 8000);
    navigate("/pay", {
      state: {
        productId: id
      }
    });
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

  const onEdit = (itemID: any) => {
    setInEditMode({
      status: true,
      itemID: itemID
    })
  }

  const handleHeaderClick = (event: any) => {
    event.stopPropagation();
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      itemID: null
    })
  }

  async function UpdateComment(e: any, Comment_ID: any) {
    await axios.patch(`http://localhost:8000/api/comment/${Comment_ID}`, {
      content: e,
      token: localStorage.getItem("token")
    });
    onCancel();
    GetComments(id);
  }

  const handleClickOutside = () => {
    onCancel();
  };

  const ref = useOutsideClick(handleClickOutside);

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
          <form className="event-create" action="#" onClick={handleHeaderClick}>
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
                      <p>Description: {event.description}</p><br />
                    </div>
                    {/* <div className="location">
                        {event.location}
                      </div> */}
                    {/* <div className="price"> */}
                    {/* <p>Price:   {event.price}</p> */}

                    <p>Time:   {new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Date:   {new Date(event.startDateTime).toLocaleDateString()}</p>
                    {/* <p>Address:   {event.address_line_street}, {event.street_number}</p> */}
                    <p>Theme:<label> </label>
                      {

                        event.themes && event.themes.map((theme: Theme) => {
                          return <label key={theme.Theme_ID}>{theme.title}, </label>
                        })
                      }
                    </p>
                    

                    <br />
                    <p>Format: {format?.title}</p>
                    <div>
                      {
                        event.price ? 
                        <div>
                          Price: {event.price[0].price_value} {getSymbolFromCurrency(event.price[0].currency)}
                        </div>
                        :
                        null
                      }
                      </div>

                    {/* <div className="date">

                      </div> */}
                  </div>
                </div>
                {
                  userInfo ?
                    <div className="button-container">
                      <button className={`button ${animate}`} onClick={e => handleClickButton(event.Event_ID)}
                      
                      >Buy</button>
                    </div>
                    :
                    <div className="button-container">
                      <button className={` disabledBuyButton`}
                        title="You should register or login to purchase ticket" disabled>Buy</button>
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
                                  {
                                    inEditMode.status
                                      && inEditMode.itemID === comment.Comment_ID
                                      ?
                                      (
                                        <div>
                                          <textarea defaultValue={comment.content}
                                            onChange={e => {
                                              // setTimeout(() => {
                                              setContent(e.target.value);
                                              // }, 3000);
                                            }}
                                          >
                                          </textarea>
                                          <button onClick={() => UpdateComment(content, comment.Comment_ID)}>Ok</button>
                                        </div>
                                      )
                                      :
                                      (
                                        // inEditMode.status.toString()
                                        comment.content
                                      )
                                  }


                                </div>
                                {
                                  (userInfo && comment.UserInfo.full_name === userInfo.full_name) ?
                                    <div className="del-up">
                                      <div className="del" onClick={() => { deleteComment(comment.Comment_ID) }}>
                                      </div>
                                      <div className="up" onClick={() => {
                                        let id = comment.Comment_ID;
                                        onEdit(id);

                                      }}>
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
                {
                  company ?
                  <div>
                    <p>{company.name}</p>
                    <p>{company.description}</p>
                  </div>
                  :
                  null
                }
                {/* {company.name} */}
                {/* {company.description} */}
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
