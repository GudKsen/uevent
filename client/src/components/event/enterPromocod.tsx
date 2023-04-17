import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
// import AllEvents from "../Admin/Events/AllEvents"
import "./createpromocodestyle.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

import "./style.scss";

export function CreatePromocode() {

    const [prom, setProm] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    // function

    async function createprom(){
        
        console.log(prom);

        // axios.post("http://localhost:8000/api/promocode",{
            
        // });
        navigate("/events-manage");
    }
    
    return (
        <div className="prom-panel">
            <div className="admin-page-prom">
                <div className="prom-content">
                    <div><h1>Enter promo code</h1></div>
                    <div className="proms-contaner">
                        <div className="title-create-event-form input-box-a field">
                            <div>
                                <input type="text" className="tit"
                                onChange={(e) => {setProm(e.target.value)}} required
                                ></input>
                            </div>
                        </div>

                    </div>
                    <div className=" createprom">
                        {/* <button onClick={createprom} className="button">Submit</button>
                        <button onClick={createprom} className="button">Create without promo code</button> */}

                    </div>

                </div>

            </div>
        </div>
    )
}