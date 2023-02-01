import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styleuserpage.scss";
import Sidebarwith from "../sidebar/Sidebarwith"
// import userimage from  "../user/default.jpg"


function UserPage() {


  return (
    <div className="userpageall">
      
      <div>
        <Sidebarwith />
      </div>
      <div className="userpage">
        <div className="infouser">
          <b><p>User info:</p></b><br/>
          <h1>Full name: </h1><b><h2>Cazimir Malevich</h2></b><br/>
          <h1>Email: </h1><b><h2>cazik_love@gmail.com</h2></b><br/>
          <h1>Date of Birth: </h1><b><h2>23 / 02 / 1879</h2></b><br/>
          <h1>Phone number: </h1><b><h2>+38 096 553 89 16</h2></b><br/>
          <h1>Address: </h1><b><h2>Kiev, Ukraine</h2></b><br/>
        </div>
        <div className="imageuser">
          <img src=".imgonline-com-ua-Resize-NlrAPLO0fLF6DZOJ.jpg"/>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
