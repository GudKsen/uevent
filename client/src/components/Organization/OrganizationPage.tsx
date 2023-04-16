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

export function OrganizationPage() {
    const [organization, setOrganization] = useState<IOrganization>();
    const [location, setLocation] = useState<ILocation>();
    const [file, setFile] = useState<File>();
    const [loadings, setLoadings] = useState(false);

    const navigate = useNavigate();

    const [inEditMode, setInEditMode] = useState({
        status: false,
        field: null
      });
    
      const [inEditDataMode, setInEditDataMode] = useState({
        status: false,
        field: null
      });

    function updatePicture() {
        let formField = new FormData();
        formField.append('file', file!);
        axios.patch(`http://localhost:8000/api/company/${organization?.Company_ID}`, formField, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage!.getItem("token")!
            }
        })
        .then(res => {
            //setOrganization(res.data);
            //console.log("🚀 ~ file: OrganizationPage.tsx:37 ~ updatePicture ~ res:", res.data);
            // setLoadings(true);
            UpdateFrontData();
            onCancel();
        });
            
    }
    
    const [company_Name, setCompanyName] = useState<string>();
    const [descriptionCompany, setDescriptionCompany] = useState<string>();

    function updateProfileTextData() {
        let formField = new FormData();
    
        formField.append('title', company_Name!);
        formField.append('description', descriptionCompany!);
    
        axios.patch(`http://localhost:8000/api/company/${userInfo.User_ID}`, formField, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'token': localStorage!.getItem("token")!
          }
        }).then(res => {
            UpdateFrontData();
            onCancelData();
        });
      }

    function UpdateFrontData()
    {
        axios.get("http://localhost:8000/api/company/user", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setOrganization(response.data.data[0]);
            setLocation(response.data.dataLocation[0]);
        });
    }

    let [eventsData, setEventsData] = useState<any[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/company/user", {
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
    }, []);

    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

    const onEdit = (itemID: any) => {
        setInEditMode({
          status: true,
          field: itemID
        })
      }
    
      const onEditData = (itemID: any) => {
        console.log("🚀 ~ file: UserPage.tsx:126 ~ onEditData ~ itemID:", itemID)
        
        setInEditDataMode({
          status: true,
          field: itemID
        })
      }
    
      const handleHeaderClick = (event: any) => {
        event.stopPropagation();
      };
    
      const onCancel = () => {
        setInEditMode({
          status: false,
          field: null
        })
      }
    
      const onCancelData = () => {
        setInEditDataMode({
          status: false,
          field: null
        })
      }

      

    //   useEffect(() => {
    //     console.log(organization?.Company_ID);
    //     console.log(organization?.Company_ID);
    
    //     // axios.get(`http://localhost:8000/api/events/${organization?.Company_ID}`
    //     // ).then((res) => {
    //     //   setEventsData(res.data);
    //     //   console.log(res.data);
    
    //     // });
    //   }, []);
    
    


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
                                        <div className="user-prof-button-container">
                                            <button className="button-edit-data-profile " title="Edit profile data">
                                            <img  alt="" src={require('../../public/video/edit_profile.png')}
                                                onClick={() => { onEditData(userInfo.User_ID) }}
                                            ></img>
                                            </button>
                                        </div>
                                        <div className="user-data-content">
                                        
                                            <div className="profile-data-field">
                                            <div className="userinfo-title-field-data">Company name</div>
                                            {
                                                inEditDataMode.status ?
                                                <input onChange={(e) => setCompanyName(e.target.value)} 
                                                className="userinfo-data-input" type="text" defaultValue={organization.name}></input>
                                                :
                                                <div className="userinfo-data">{organization.name}</div>
                                            }
                                            </div>


                                            <div>
                                            <div className="userinfo-title-field-data">Email</div>
                                                <div className="userinfo-data">{organization.email}</div>
                                            </div>



                                            <div>
                                            <div className="userinfo-title-field-data">Description</div>
                                            {
                                                inEditDataMode.status ?
                                                <textarea onChange={(e) => {
                                                    setDescriptionCompany(e.target.value);
                                                }} className="userinfo-data-input" defaultValue={organization.description}></textarea>
                                                :
                                                <div className="userinfo-data description">{organization.description}</div>
                                            }
                                            </div>


                                            <div>
                                            <div className="userinfo-title-field-data">Address</div>
                                                {location ?
                                                        <div className="userinfo-data">{location.country}, {location.city}</div>
                                                    :
                                                    <div>-</div>
                                                }
                                            </div>

                                            {
                                            inEditDataMode.status ?
                                                <div className="btn-grp-update-cancel">

                                                <button onClick={() => updateProfileTextData()} className="update-btn">Update</button>
                                                <button onClick={() => onCancelData()} className="cancel-btn">Cancel</button>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="imageuser">
                                        {
                                        inEditMode.status === false ?
                                            <div className="user-profile-avatar">
                                                <button className="button-edit-image-profile imagebut" title="Edit profile photo">
                                                    <img alt="" src={require('../../public/video/edit_profile.png')}
                                                    onClick={() => { onEdit(userInfo.User_ID) }}
                                                    ></img>
                                                </button>
                                                {
                                                    userInfo.profile_picture ?
                                                    <img className="avatarProfilePictur" src={`http://localhost:8000/company/${organization.image}`} alt="Avatar" />
                                                    :
                                                    <img className="avatarProfilePictur" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                                                }
                                                {/* <button className="button-edit-image-profile imagebut" title="Edit profile photo">
                                                    <img alt="" src={require('../../public/video/edit_profile.png')}
                                                    onClick={() => { onEdit(userInfo.User_ID) }}
                                                    ></img>
                                                </button> */}
                                            </div>
                                            :
                                            <div className="user-profile-avatar-input">
                                                <div className="file-upload-avatar-field">
                                                    <DragDrop className="upload-picture-field" setFile={setFile} />
                                                </div>
                                                <div className="btn-update-container">
                                                    <button className="button btn-ok-update-photo" onClick={e => updatePicture()}>
                                                    Ok
                                                    </button>
                                                </div>
                                            </div>
                                        }

                                        {/* <div className="userinfo-role">
                                        {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
                                        </div> */}

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