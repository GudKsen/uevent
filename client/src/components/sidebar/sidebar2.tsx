import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./sidebar2.scss";
import Header from "./Header";
import ManageEvents from "./ManageEvents";
import DropdownMenu from "./DropdownMenu";
import NavigateAdminPanel from "../Admin/NavigateAdminPanel";
// import { ManageEvents } from "../Organizer/ManageEvents";

function Sidebar2() {

    const [mode, setMode] = useState("");
    const [close, setClose] = useState("close");
    const [modeText, setModeText] = useState("Light mode");
    const [showSubMenuClick, setShowSubMenuClick] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOrganizator, setIsOrganizator] = useState(false);

    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);


    function handleClose() {
        if (close === "close") {
            setClose("");
        }
        else {
            setClose("close");
        }
    }



    function handleModeClick() {
        if (mode === "dark") {
            setMode("");
            setModeText("Light mode");
            console.log("Light mode");
        }
        else {
            setMode("dark");
            setModeText("Dark mode");
            console.log("Dark mode");
        }
    }

    function handleShowSubMenuClick() {
        if (showSubMenuClick == "") {
            setShowSubMenuClick("showMenu");
        }
        else {
            setShowSubMenuClick("");
        }
    }



    const navigate = useNavigate();

    function logout(){
            localStorage.clear();
            navigate("/");
          }

    const EventManageButton = () => {
        return (

            <div></div>

        )
    }

    return (
        <div className={`body-sidebar ${mode}`}>

            <nav className={`sidebar ${close}`}>
                <header>
                    <div className="image-text">
                        <span className="image">

                        </span>

                        <div className="text logo-text">
                            <span className="name">UEvent</span>
                            <span className="profession">Web</span>
                        </div>
                    </div>

                    <div className="toggle-around">
                        <i className='bx bx-chevron-right toggle' onClick={handleClose}></i>
                    </div>

                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">

                            {userInfo.role === "organizer" ? <li className="nav-link manage-eve">
                                <ManageEvents />

                            </li> : null}

                            {/* {userInfo.role === "admin" ? <li className="nav-link manage-eve">
                                <NavigateAdminPanel />
                            </li> : null} */}
                            <NavigateAdminPanel/>

                            <li className="nav-link" onClick={() => {
                                navigate("/events");
                            }}>

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-home" ></div>
                                </div>
                                <span className="text nav-text">Dashboard</span>

                            </li>

                            <li className="nav-link">

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-calendar"></div>
                                </div>
                                <span className="text nav-text">Calendar</span>

                            </li>

                            <li className="nav-link">

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-notification"></div>
                                </div>
                                <span className="text nav-text">Notifications</span>

                            </li>

                            <li className="nav-link">

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-tickets"></div>
                                </div>
                                <span className="text nav-text">Tickets</span>

                            </li>

                            <li className="nav-link">

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-sub"></div>
                                </div>
                                <span className="text nav-text">Subscriptions</span>

                            </li>

                            <li className="nav-link">

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-basket"></div>
                                </div>
                                <span className="text nav-text">Basket</span>

                            </li>

                            <li className="nav-link" onClick={() => {
                                navigate("/bankcard");
                            }}>

                                <div className="bb bx bx-search icon">
                                    <div className="hoverme-card" ></div>
                                </div>
                                <span className="text nav-text">Wallets</span>

                            </li>

                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="" onClick={logout}>

                            <div className="bb bx bx-search icon">
                                <div className="hoverme-logout"></div>
                            </div>
                            <span className="text nav-text">Logout</span>

                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <img className="bx bx-sun icon sun" src={require('../../public/video/cloudy.png')} alt="my-gif" />
                                <img className="bx bx-moon icon moon" src={require('../../public/video/cloudy-night.png')} alt="my-gif" />
                            </div>
                            <span className="mode-text text">{modeText}</span>

                            <div className="toggle-switch">
                                <span className="switch" onClick={handleModeClick}></span>
                            </div>
                        </li>

                    </div>
                </div>

            </nav>

            {/* <section className="home">
    <Header />
    <div className="text">Dashboard Sidebar</div>
</section> */}

        </div>
    )
}

export default Sidebar2;
