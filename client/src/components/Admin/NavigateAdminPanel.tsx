import "./styles/styleAdminPanel.scss";
import { useNavigate } from "react-router";
import { useState } from "react";

function NavigateAdminPanel ()
{
    const [open, setOpen] = useState("");

    const navigate = useNavigate();

    const handleOpen = () => {
        if (open === "") {
            setOpen("open");
        }
        else {
            setOpen("");
        }
    };

    return (
        <div className="manage" onClick={handleOpen}>
            <div className="im-text" onClick={() => navigate("/admin-panel")}>
                <div className="bb bx bx-search icon" >
                    <div className="menu-image" ></div>
                </div>
                <span className="text nav-textm"
                
                >Admin panel</span>
            </div>
        </div>
    )
}

export default NavigateAdminPanel;