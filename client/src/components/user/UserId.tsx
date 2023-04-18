import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styleuserpage.scss";
import DragDrop from "../event/DragAndDrop";

import Sidebar2 from "../sidebar/sidebar2";
import axios from "axios";
import Header from "../sidebar/Header";


function UserId() {
    const {id} = useParams();
  const [user, setUser] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`, {
        params: { token: localStorage.getItem("token") }
    }).then((response) => {
        setUser(response.data);
        
    })
    console.log(user[0].full_name);
}, []);

  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  console.log("🚀 ~ file: UserPage.tsx:84 ~ UserPage ~ userInfo:", userInfo)


  return (
    <div className="userpageall">

      <div className="bsr">
        <Sidebar2 />
      </div>
      <div className="userpage">
        
        <Header/>
        {/* <div className="aaaaa"> */}
            <div className="infouser">
            
                <div className="user-data-content">
                    <div className="profile-data-field">
                        <div className="userinfo-title-field-data">Full name</div>
                        
                            <div className="userinfo-data">{user[0].full_name}</div>
                        
                        </div>


                        <div>
                        <div className="userinfo-title-field-data">Email</div>
                        <div className="userinfo-data">{user[0].email}</div>
                        </div>



                        <div>
                        <div className="userinfo-title-field-data">Date of Birth</div>
                        <div className="userinfo-data">{new Date(user[0].birthday).toLocaleDateString()}</div>
                        </div>



                        <div>
                        <div className="userinfo-title-field-data">Phone number</div>
                        <div className="userinfo-data">{user[0].phone_number}</div>
                        </div>

                        <div>
                        <div className="userinfo-title-field-data">Address</div>
                        <div className="userinfo-data">{user[0].city}, {user[0].country}</div>
                        </div>

                        <div>
                        <div className="userinfo-title-field-data">Telegram</div>
                        <div className="userinfo-data">{user[0].telegram}</div>
                        </div>



                        <div>
                        <div className="userinfo-title-field-data">Twitter</div>
                        <div className="userinfo-data">{user[0].twitter}</div>
                        </div>

                        <div>
                        <div className="userinfo-title-field-data">Skype</div>
                        <div className="userinfo-data">{user[0].skype}</div>
                        </div>
                </div>


                </div>

            <div className="image-organization-windows">
                <div className="imageuser">
                    
                        <div className="user-profile-avatar">
                        {
                            userInfo.profile_picture ?
                            <img className="avatarProfilePicture" src={`http://localhost:8000/avatars/${user[0].profile_picture}`} alt="Avatar" />
                            :
                            <img className="avatarProfilePicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                        }
                        
                        </div>
                        

                    <div className="userinfo-role">
                    {userInfo.role.charAt(0).toUpperCase() + user[0].role.slice(1)}
                    </div>



                </div>


            
            </div>
        {/* </div> */}
        

        

        


      </div>
    </div>
  );
}

export default UserId;
