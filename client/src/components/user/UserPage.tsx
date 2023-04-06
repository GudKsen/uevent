import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styleuserpage.scss";
import DragDrop from "../event/DragAndDrop";

import Sidebar2 from "../sidebar/sidebar2";
import Header from "../sidebar/Header";
import axios from "axios";


function UserPage() {
  const [file, setFile] = useState<File>();
  const [userInfoTmp, setUserInfoTmp] = useState();
  const navigate = useNavigate();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    field: null
  });

  function updatePicture() {
    let formField = new FormData();
    formField.append('file', file!);
    axios.patch(`http://localhost:8000/api/user/${userInfo.User_ID}`, formField, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': localStorage!.getItem("token")!
      }
    }).then(res => {

      localStorage.removeItem("userInfo");
      const { User_ID, password, full_name, email, role, country, city, phone_number, birthday, profile_picture } = res.data;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ User_ID, password, full_name, email, role, country, city, phone_number, birthday, profile_picture })
      );
      userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
      setUserInfoTmp(userInfo);
    });

  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  async function deleteProf() {
    // e.preventDefault();
    const info = {
      email: userInfo.email
    };
    await fetch("http://localhost:8000/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  }

  const onEdit = (itemID: any) => {
    console.log("🚀 ~ file: EventPage.tsx:79 ~ onEdit ~ itemID:", itemID)

    setInEditMode({
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

  
  //console.log(userInfoTmp);
  return (
    <div className="userpageall">

      <div className="bsr">
        {/* <Header/> */}
        <Sidebar2 />
      </div>
      <div className="userpage">
        <div className="infouser">
          {/* <b><p>User info:</p></b><br/> */}
          <h1>Full name: </h1>
          {
            inEditMode.status && inEditMode.field === 'full_name' ?
            <input type="text" defaultValue={userInfo.full_name}></input>
            :
            <b><h2>{userInfo.full_name}</h2></b>
          }
          
          <br />

          <h1>Email: </h1>
          {
            inEditMode.status && inEditMode.field === 'email' ?
            <input type="text" defaultValue={userInfo.email}></input>
            :
            <b><h2>{userInfo.email}</h2></b>
          }
          


          <h1>Date of Birth: </h1>
          {
            inEditMode.status && inEditMode.field === 'birthday' ?
            <input type="text" defaultValue={userInfo.birthday}></input>
            :
            <b><h2>{new Date(userInfo.birthday).toLocaleDateString()}</h2></b>
          }
          

          <h1>Phone number: </h1>
          {
            inEditMode.status && inEditMode.field === 'phone_number' ?
            <input type="text" defaultValue={userInfo.phone_number}></input>
            :
            <b><h2>{userInfo.phone_number}</h2></b>
          }

          <h1>Address: 
            </h1><b><h2>{userInfo.city} , {userInfo.country}
          </h2></b><br />
          <div className="create-organization-button button-container">
            {
              userInfo.role === "organizer" ?
                <button className="button"
                  onClick={() => navigate("/my-organization")}
                >My organization</button>
                :
                <button className="button"
                  onClick={() => navigate("/create-organization")}
                >Create organization</button>
            }

          </div>
        </div>

        <div className="imageuser">
          {
            userInfo.profile_picture ?
              <img className="avatarPicture" src={`http://localhost:8000/avatars/${userInfo.profile_picture}`} alt="" />
              :
              <img className="avatarPicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="" />
          }
          <div className="file-create-event field">
            <div>UPLOAD AVATAR</div>
            <DragDrop setFile={setFile} />
          </div>
          <button className="button" onClick={e => updatePicture()}>Update</button>

        </div>
        <div className="deleteProf">
          <button onClick={deleteProf}>Delete Profile</button>
        </div>


      </div>
    </div>
  );
}

export default UserPage;
