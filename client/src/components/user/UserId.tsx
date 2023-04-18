import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styleuserpage.scss";
import DragDrop from "../event/DragAndDrop";

import Sidebar2 from "../sidebar/sidebar2";
import axios from "axios";


function UserId() {
  const [user, setUser] = useState<any[]>([]);

  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  console.log("🚀 ~ file: UserPage.tsx:84 ~ UserPage ~ userInfo:", userInfo)


  return (
    <div className="userpageall">

      <div className="bsr">
        <Sidebar2 />
      </div>
      <div className="userpage">
        <div className="infouser">
          <div className="user-data-content">
            <div className="profile-data-field">
              <div className="userinfo-title-field-data">Full name</div>
              
                  <div className="userinfo-data">{userInfo.full_name}</div>
              
            </div>


            <div>
              <div className="userinfo-title-field-data">Email</div>
              <div className="userinfo-data">{userInfo.email}</div>
            </div>



            <div>
              <div className="userinfo-title-field-data">Date of Birth</div>
              <div className="userinfo-data">{new Date(userInfo.birthday).toLocaleDateString()}</div>
            </div>



            <div>
              <div className="userinfo-title-field-data">Phone number</div>
              <div className="userinfo-data">{userInfo.phone_number}</div>
            </div>

            <div>
              <div className="userinfo-title-field-data">Address</div>
              <div className="userinfo-data">{userInfo.city}, {userInfo.country}</div>
            </div>


          </div>


        </div>

        <div className="image-organization-windows">
          <div className="imageuser">
            
                <div className="user-profile-avatar">
                  {
                    userInfo.profile_picture ?
                      <img className="avatarProfilePicture" src={`http://localhost:8000/avatars/${userInfo.profile_picture}`} alt="Avatar" />
                      :
                      <img className="avatarProfilePicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                  }
                  
                </div>
                

            <div className="userinfo-role">
              {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
            </div>



          </div>


          
        </div>

        

        


      </div>
    </div>
  );
}

export default UserId;
