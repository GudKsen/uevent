import axios from "axios";
import { useEffect, useState } from "react"
import DragDrop from "../event/DragAndDrop";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'

import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";

import "../user/styleuserpage.scss";
import "./styleOrgPage.scss";

interface IOrganization {
    Company_ID: number,
    name: string,
    description: string,
    email: string,
    image: string
}

interface ILocation {
    country: string,
    city: string
}

export function CompanyPage() {

    let { id } = useParams();

    const [organization, setOrganization] = useState<IOrganization>();
    const [location, setLocation] = useState<ILocation>();
    const [file, setFile] = useState<File>();
    const [loadings, setLoadings] = useState(false);

    const navigate = useNavigate();

    let [eventsData, setEventsData] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/companyId/${id}`, {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setOrganization(response.data.data[0]);
            setLocation(response.data.dataLocation[0]);
            console.log(response.data.data[0].Company_ID);

            axios.get(`http://localhost:8000/api/events/${response.data.data[0].Company_ID}`
                ).then((res) => {
                setEventsData(res.data);
                console.log(res.data);
            
                });
                });
    }, [id]);

    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

   
      


    return (

        <div className="cardevent">
            {
                userInfo ?
                <Sidebar2 />
                :
                <div className=" body-sidebar nosidebar"></div>
            }

            <div className={`event-info-container `}>
                <div className="head">
                    <Header />  
                </div>
                <div className={`create`}>
                    <div className="ordpage">
                        <div className="userinfo-photo">    
                            {
                                organization ?

                                
                                <div className="infouser">
                                    <div className="company-update">
                                        <div className="user-data-content">
                                        
                                            <div className="profile-data-field">
                                                <div className="userinfo-title-field-data">Company name</div>
                                                
                                                    <div className="userinfo-data">{organization.name}</div>
                                                </div>

                                                <div>
                                                    <div className="userinfo-title-field-data">Email</div>
                                                        <div className="userinfo-data">{organization.email}</div>
                                                    </div>
                                                <div>
                                                    <div className="userinfo-title-field-data">Description</div>
                                                    
                                                        <div className="userinfo-data description">{organization.description}</div>
                                                    
                                                    </div>
                                                <div>
                                                <div className="userinfo-title-field-data">Address</div>
                                                    {location ?
                                                            <div className="userinfo-data">{location.country}, {location.city}</div>
                                                        :
                                                        <div>-</div>
                                                    }
                                                </div>

                                                
                                        </div>
                                    </div>
                                    
                                    <div className="imageuser">
                                        
                                            <div className="user-profile-avatar"> 
                                                {
                                                    organization.image ?
                                                    <img className="avatarProfilePictur" src={`http://localhost:8000/company/${organization.image}`} alt="Avatar" />
                                                    :
                                                    <img className="avatarProfilePictur" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                                                }
                                            </div>
                                            
                                        <div>
                                            <p className="naaaaaaaaame">{organization.name}</p>
                                        </div>


                                    </div>
                                </div>
                            : <div></div>}
                        </div>

                        <div className="user-events">
                            <div className="title-card">
                                <div className="title">Events</div>
                                <div className="container-even">
                                        
                                        {
                                            eventsData.length > 0 ?
                                                <div className="list-events-containe">

                                                    {eventsData && eventsData.map(event =>
                                                        <div className="card-containe" key={event.Event_ID}>
                                                            <div className="car" onClick={() => { navigate(`/eventpage/${event.Event_ID}`) }}>
                                                                <div className="card-heade">
                                                                {/* <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" /> */}

                                                                {event.poster ?
                                                                    <img src={`http://localhost:8000/images/${event.poster}`} alt="" />
                                                                    :
                                                                    <img src={`http://localhost:8000/images/no_photo.jpg`} alt="" />
                                                                }

                                                                </div>
                                                                <div className="card-bod">

                                                                <div className="top-container-card-bod">
                                                                    <div className="title-even">
                                                                    {(event.title)}
                                                                    </div>
                                                                    <div className="pric">
                                                                    {
                                                                        event.price ?
                                                                        <div>{event.price[0].price_value} {getSymbolFromCurrency(event.price[0].currency)}</div>
                                                                        : <div>Free</div>
                                                                    }
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            : <div><br /><p className="choosecountry">There is no events</p></div>
                                        }
                                </div>
                            </div>
                            
                            <div className="title-card">
                                <div className="title">News</div>
                                <div className="container-news">
                                
                                    {
                                        eventsData.length > 0 ?
                                            <div className="list-events-containe">

                                                {eventsData && eventsData.map(event =>
                                                    <div className="card-containe" key={event.Event_ID}>
                                                        <div className="car" onClick={() => { navigate(`/eventpage/${event.Event_ID}`) }}>
                                                            <div className="card-headea">
                                                            {/* <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" /> */}

                                                            {event.poster ?
                                                                <img src={`http://localhost:8000/images/${event.poster}`} alt="" />
                                                                :
                                                                <img src={`http://localhost:8000/images/no_photo.jpg`} alt="" />
                                                            }

                                                            </div>
                                                            <div className="card-boda">

                                                                <div className="top-container-card-bod">
                                                                    <div className="title-even">
                                                                    {(event.title)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        : <div><br /><p className="choosecountry">There is no events</p></div>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}