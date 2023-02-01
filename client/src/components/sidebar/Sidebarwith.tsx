import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

function Sidebarwith() {

    const navigate = useNavigate();
    
    function userpage(){
        navigate("/userpage");
    }

    function events(){
        navigate("/events");
    }

    function calendar(){
        navigate("/calendar");
    }

    function ticket(){
        navigate("/ticket");
    }

    function subscribes(){
        navigate("/subscribes");
    }

    function logout(){
        navigate("/");
    }

    function setting(){
        navigate("/setting")
    }
return (
    <div className="alwith">

            <div className="name">
                Name
                {/* <img src="../sidebar/video/uevent.png"/> */}
                {/* <img className="static" src="https://lh4.googleusercontent.com/-gZiu96oTuu4/Uag5oWLQHfI/AAAAAAAABSE/pl1W8n91hH0/w140-h165-no/Homer-Static.png"/>
                    <img className="active" src="../sidebar/video/uevent.png"></img> */}
            </div>

            {/* <div><br/></div> */}

            <div className="search">
                {/* Search */}
                <button className="ser">Search</button>
            </div>

            <div className="profile">
                {/* Userpage */}
                <button onClick={userpage} className="prof">Userpage</button>
            </div>

            <div className="home">
                {/* Event */}
                <button onClick={events} className="hom">Event</button>
            </div>

            <div className="calendar">
                {/* Calendar */}
                <button onClick={calendar} className="cal">Calendar</button>
            </div>

            <div className="ticket">
                {/* Ticket */}
                <button onClick={ticket} className="tic">Ticket</button>
            </div>

            <div className="subscribes">
                {/* Subscribes */}
                <button onClick={subscribes} className="sub">Subscribes</button>
            </div>

            <div><br/></div>
            
            <div className="setting">
                {/* Setting */}
                <button onClick={setting} className="set">Setting</button>
            </div>

            <div className="logout">
                {/* Log out */}
                <button onClick={logout} className="log">Log out</button>
            </div>


    </div>
)
}

export default Sidebarwith;
