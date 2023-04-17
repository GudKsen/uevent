import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
// import AllEvents from "../Admin/Events/AllEvents"
import AllEvents from "./AllEvents";
import AllPromocode from "./AllPromocode";
import "./createpromocodestyle.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

import "./style.scss";

export function CreatePromocode() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    async function createprom(){
        
        console.log(title, description, date, discount, endDate);

        axios.post("http://localhost:8000/api/promocode",{
            title: title,
            description: description,
                discont: discount,
                startDateTime: date,
                endDateTime: endDate,
                token: localStorage.getItem("token")
        });
        navigate("/events-manage");
    }
    
    return (
        <div className="prom-panel">
            <div className="admin-page-prom">
                <div className="prom-content">
                    <div><h1>Create promocode</h1></div>
                    <div className="proms-contaner">
                        <div className="title-create-event-form input-box-a field">
                            <div>TITLE</div>
                            <div>
                                <input type="text" className="tit"
                                onChange={(e) => {setTitle(e.target.value)}} required
                                ></input>
                            </div>
                        </div>

                        <div className="description-create-event input-box-a field">
                            <div>DESCRIPTION</div>
                            <div>
                                <textarea className="descr is-focused"
                                onChange={e => {setDescription(e.target.value)}} required
                                ></textarea>
                            </div>
                        </div>

                        <div className="description-create-event input-box-a field">
                            <div>Discount</div>
                            <div>
                                <input type="Number" className="tit"
                                onChange={(e) => {setDiscount(e.target.value)}} required
                                ></input>
                            </div>
                        </div>
                        <div className="date-create-event input-box-a field">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="one">START DATE</td>
                                            <td className="twon">END DATE</td>
                                        </tr>
                                        <tr>
                                            <td className="one">
                                                <input type="date" className=""
                                                onChange={e => {setDate(e.target.value)}} required
                                                ></input>
                                            </td>
                                            <td className="twon">
                                                <input type="date" className=""
                                                onChange={e => {setEndDate(e.target.value)}} required
                                                ></input>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>


                    </div>
                    <div className=" createprom">
                        <button onClick={createprom} className="button">Create</button>

                    </div>

                </div>

            </div>
        </div>
    )
}