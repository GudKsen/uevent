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

    useEffect(() => {
        axios.get("http://localhost:8000/api/company/user", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setOrganization(response.data.data[0]);
            setLocation(response.data.dataLocation[0]);
        });
    }, []);

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
                                    {/* <div className="user-prof-button-container">
                                        <button className="button-edit-data-profile " title="Edit profile data">
                                        <img alt="" src={require('../../public/video/edit_profile.png')}
                                            onClick={() => { onEditData(userInfo.User_ID) }}
                                        ></img>
                                        </button>
                                    </div> */}
                                    <div className="user-data-content">
                                        <div className="profile-data-field">
                                        <div className="userinfo-title-field-data">Company name</div>
                                        {/* {
                                            inEditDataMode.status ?
                                            <input onChange={(e) => setFullname(e.target.value)} 
                                            className="userinfo-data-input" type="text" defaultValue={userInfo.full_name}></input>
                                            : */}
                                            <div className="userinfo-data">{organization.name}</div>
                                        {/* } */}
                                        </div>


                                        <div>
                                        <div className="userinfo-title-field-data">Email</div>
                                        {/* {
                                            inEditDataMode.status ?
                                            <input onChange={(e) => {
                                                setEmail(e.target.value);
                                            }} className="userinfo-data-input" type="text" defaultValue={userInfo.email}></input>
                                            : */}
                                            <div className="userinfo-data">{organization.email}</div>
                                        {/* } */}
                                        </div>



                                        <div>
                                        <div className="userinfo-title-field-data">Description</div>
                                        {/* {
                                            inEditDataMode.status ?
                                            <input onChange={(e) => {
                                                setDateOfBirth(e.target.value);
                                            }} className="userinfo-data-input" type="date" defaultValue={userInfo.birthday}></input>
                                            : */}
                                            <div className="userinfo-data description">{organization.description}</div>
                                        {/* } */}
                                        </div>


                                        <div>
                                        <div className="userinfo-title-field-data">Address</div>
                                        {/* <div className="userinfo-data">{location.city}, {userInfo.country}</div> */}
                                            {location ?
                                                // <div>
                                                    <div className="userinfo-data">{location.country}, {location.city}</div>
                                                // </div>
                                                :
                                                <div>-</div>
                                            }
                                        </div>

                                        {/* {
                                        inEditDataMode.status ?
                                            <div className="btn-grp-update-cancel">

                                            <button onClick={() => updateProfileTextData()} className="update-btn">Update</button>
                                            <button onClick={() => onCancelData()} className="cancel-btn">Cancel</button>
                                            </div>
                                            :
                                            null
                                        } */}
                                    </div>
                                    <div className="imageuser">
                                        {/* {
                                        inEditMode.status === false ? */}
                                            <div className="user-profile-avatar">
                                            {
                                                userInfo.profile_picture ?
                                                <img className="avatarProfilePicture" src={`http://localhost:8000/company/${organization.image}`} alt="Avatar" />
                                                :
                                                <img className="avatarProfilePicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                                            }
                                            {/* <button className="button-edit-image-profile" title="Edit profile photo">
                                                <img alt="" src={require('../../public/video/edit_profile.png')}
                                                onClick={() => { onEdit(userInfo.User_ID) }}
                                                ></img>
                                            </button> */}
                                            </div>
                                            {/* :
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
                                        } */}

                                        {/* <div className="userinfo-role">
                                        {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
                                        </div> */}


                                    </div>
                                </div>
                            : <div></div>}
                        </div>
                        <div className="user-events">
                                            {/* fgh */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <h1>
        //         It's organization's page. Here you can see the information, update it or delete it.
        //     </h1>
        //     {organization ?

        //         <div>
        //             <div className="file-create-event field">
        //                 <div>UPLOAD POSTER</div>
        //                 <DragDrop setFile={setFile} />
        //             </div>
        //             <button className="button" onClick={e => updatePicture()}>Update</button>
        //             <div>
        //                 { organization.image ?
        //                 <img className="avatarPicture" src={`http://localhost:8000/company/${organization.image}`} alt="" />
        //                 :
        //                 <img className="avatarPicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="" />    
        //                 }
        //             </div>
        //             <div>{organization.name}</div>
        //             <div>{organization.description}</div>
        //             <div>{organization.email}</div>
        //             {location ?
        //                 <div>
        //                     <div>{location.country}</div>
        //                     <div>{location.city}</div>
        //                 </div>
        //                 :
        //                 <div>-</div>
        //             }

        //         </div>
        //         : <div></div>



        //     }

        // </div>
    )
}