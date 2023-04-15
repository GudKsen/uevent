import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styleuserpage.scss";
import DragDrop from "../event/DragAndDrop";

import Sidebar2 from "../sidebar/sidebar2";
import axios from "axios";


function UserPage() {
  const [file, setFile] = useState<File>();
  const [fullname, setFullname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone_number, setPhoneNumber] = useState<string>();
  const [dateofbirth, setDateOfBirth] = useState<string>();
  const [organization, setOrganization] = useState<{
    name: string,
    description: string,
    email: string
  }>();

  

  const [userInfoTmp, setUserInfoTmp] = useState();
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
      onCancel();
    });
  }

  function updateProfileTextData() {
    let formField = new FormData();

    formField.append('full_name', fullname!);
    formField.append('email', email!);
    formField.append('phone_number', phone_number!);
    formField.append('birthday', dateofbirth!);

    axios.patch(`http://localhost:8000/api/user/${userInfo.User_ID}`, formField, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
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
      onCancelData();
    });
  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  console.log("🚀 ~ file: UserPage.tsx:84 ~ UserPage ~ userInfo:", userInfo)

  useEffect(() => {
    if (userInfo.role === "organizer")
    {
      axios.get(`http://localhost:8000/api/company/user`, {
        headers: {
          token: localStorage.getItem("token")!
        }
      }).then(response => {
        console.log(response.data.data[0]);
        setOrganization(response.data.data[0])
      })
    }
  }, [])

  async function deleteProf() {
    // e.preventDefault();
    const info = {
      email: userInfo.email
    };
    await fetch("http://localhost:8000/api/auth/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")!
      },
      body: JSON.stringify(info),
    });
  }

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

  return (
    <div className="userpageall">

      <div className="bsr">
        <Sidebar2 />
      </div>
      <div className="userpage">
        <div className="infouser">
          <div className="user-prof-button-container">
            <button className="button-edit-data-profile " title="Edit profile data">
              <img alt="" src={require('../../public/video/edit_profile.png')}
                onClick={() => { onEditData(userInfo.User_ID) }}
              ></img>
            </button>
          </div>
          <div className="user-data-content">
            <div className="profile-data-field">
              <div className="userinfo-title-field-data">Full name</div>
              {
                inEditDataMode.status ?
                  <input onChange={(e) => setFullname(e.target.value)} 
                  className="userinfo-data-input" type="text" defaultValue={userInfo.full_name}></input>
                  :
                  <div className="userinfo-data">{userInfo.full_name}</div>
              }
            </div>


            <div>
              <div className="userinfo-title-field-data">Email</div>
              {
                inEditDataMode.status ?
                  <input onChange={(e) => {
                    setEmail(e.target.value);
                  }} className="userinfo-data-input" type="text" defaultValue={userInfo.email}></input>
                  :
                  <div className="userinfo-data">{userInfo.email}</div>
              }
            </div>



            <div>
              <div className="userinfo-title-field-data">Date of Birth</div>
              {
                inEditDataMode.status ?
                  <input onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }} className="userinfo-data-input" type="date" defaultValue={userInfo.birthday}></input>
                  :
                  <div className="userinfo-data">{new Date(userInfo.birthday).toLocaleDateString()}</div>
              }
            </div>



            <div>
              <div className="userinfo-title-field-data">Phone number</div>
              {
                inEditDataMode.status ?
                  <input onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }} className="userinfo-data-input" type="text" defaultValue={userInfo.phone_number}></input>
                  :
                  <div className="userinfo-data">{userInfo.phone_number}</div>
              }
            </div>

            <div>
              <div className="userinfo-title-field-data">Address</div>
              <div className="userinfo-data">{userInfo.city}, {userInfo.country}</div>
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

        <div className="image-organization-windows">
          <div className="imageuser">
            {
              inEditMode.status === false ?
                <div className="user-profile-avatar">
                  {
                    userInfo.profile_picture ?
                      <img className="avatarProfilePicture" src={`http://localhost:8000/avatars/${userInfo.profile_picture}`} alt="Avatar" />
                      :
                      <img className="avatarProfilePicture" src={`http://localhost:8000/images/no_photo.jpg`} alt="Avatar" />
                  }
                  <button className="button-edit-image-profile" title="Edit profile photo">
                    <img alt="" src={require('../../public/video/edit_profile.png')}
                      onClick={() => { onEdit(userInfo.User_ID) }}
                    ></img>
                  </button>
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

            <div className="userinfo-role">
              {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
            </div>

            <div className="deleteProf ">
              <button className="button delup" onClick={deleteProf}>Delete Profile</button>
            </div>


          </div>


          <div className="organization-window">
          <div className="create-organization-button button-container">
            {
              userInfo.role === "organizer" ?
              <div>
                {organization ?
                <div>
                  <div className="name-organization">{organization!.name}</div>
                <div className="email-organization">{organization!.email}</div>
                </div>
                : null}
                <button className="my-organization-button"
                  onClick={() => navigate("/my-organization")}
                >My organization</button>
              </div>
                
                :
                <div>
                  <div className="no-organization-title">The organization has not been created</div>
                  <button className="my-organization-button"
                  onClick={() => navigate("/create-organization")}
                >Create organization</button>
                </div>
            }

          </div>
          </div>
        </div>

        

        


      </div>
    </div>
  );
}

export default UserPage;
