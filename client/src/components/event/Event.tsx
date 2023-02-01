import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styleevent.scss";
import Sidebar from "../sidebar/Sidebar"
// import userimage from  "../user/default.jpg"


function Event() {


  return (
    <div className="allevents">
      
      <div>
        <Sidebar />
      </div>
      <div className="eventpage">
        <div className="infopanel">
          <p>Date Address</p>
        </div>
        <div className="infoevent">
          <div className="even"></div>
        </div>
      </div>
    </div>
  );
}

export default Event;
