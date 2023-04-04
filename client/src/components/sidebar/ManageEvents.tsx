import { useState } from "react";
import "./styleManageEvents.scss";
import { useNavigate } from "react-router";

function ManageEvents() {
    const [open, setOpen] = useState("");

    const navigate = useNavigate();

    const handleOpen = () => {
        if (open === "") {
            setOpen("open");
        }
        else {
            setOpen("");
        }
        //   setOpen(!open);
    };

    const handleMenuOne = () => {
        // do something
        // setOpen(false);
    };

    const handleMenuTwo = () => {
        // do something
        // setOpen(false);
    };

    return (
        <div className="manage" onClick={handleOpen}>
            <div className="im-text">
                <div className="bb bx bx-search icon" >
                    <div className="menu-image" ></div>
                </div>
                <span className="text nav-textm">Organizer panel</span>
            </div>

            <ul className={`sub-menu ${open}`}>
                <li><div className="sub-menu-text"
                onClick={() => navigate("/create-event")}
                >Create event</div></li>

                <li><div className="sub-menu-text"
                onClick={() => navigate("manage-events")}
                >Manage events</div></li>

            </ul>

        </div>
    )
}

export default ManageEvents;