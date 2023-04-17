import { useState, useEffect } from "react";
import axios from "axios";
import getSymbolFromCurrency from 'currency-symbol-map'

import Popup from 'reactjs-popup'


// import { ImageComponent } from "../component/ImageComponent";
// import { UpdateTitle } from "../UpdateFunctions/Event/UpdateEvent";
// import { useOutsideClick } from "../utils/useOutsideClick";

import { ImageComponent } from "../Admin/component/ImageComponent";
import { useOutsideClick } from "../Admin/utils/useOutsideClick";

import "../Admin/styles/commonStyle.scss";
import "../Admin/styles/allevents.scss";
import { Navigate, useNavigate } from "react-router";
import { UpdateTitle } from "../Admin/UpdateFunctions/Event/UpdateEvent";
import { CreatePromocode } from "./CreatePromocode";

function AllPromocode({ id }: any) {

    const [popupVisibleCrEv, setPopupVisibleCrEv] = useState<boolean>(false);

    const [promocodes, setpromocode] = useState<any[]>([]);
    const [organization, setOrganization] = useState();
    let number_of_row = 1;
    const [selectedRow, setSelectedRow] = useState({
        row: null,
        msg: ""
    });
    const [selectedID, setSelectedID] = useState(null);
    const navigate = useNavigate();

    const handleClickOutside = () => {
        onCancel();
    };

    const handleHeaderClick = (event: any) => {
        event.stopPropagation();
    };

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null,
        columnKey: null,
        columnName: null
    });

    function handleChangeCheck(e: any, id: any) {
        let child = document.getElementById(e.target.value);

        if (child?.classList.contains("selected")) {
            child?.classList.remove("selected");
            setSelectedID(null);
        }
        else {
            child?.classList.add("selected");
            setSelectedID(id);
        }
    }

    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    // console.log("🚀 ~ file: UserPage.tsx:84 ~ UserPage ~ userInfo:", userInfo)


    useEffect(() => {
        if (userInfo.role === "organizer") {
            axios.get(`http://localhost:8000/api/company/user`, {
                headers: {
                    token: localStorage.getItem("token")!
                }
            }).then(async response => {
                console.log(response.data.data[0].Company_ID);
                setOrganization(response.data.data);
                let id = response.data.data[0].Company_ID;
                if (response.data.data.length > 0) {
                    axios.get("http://localhost:8000/api/promocodesId", {
                        params: { token: localStorage.getItem("token") }
                        }).then((response) => {
                            setpromocode(response.data);
                            console.log("sfffffffffffffffffffffffffffffffffffffff");
                            console.log(response.data[0]);
                            console.log("sfffffffffffffffffffffffffffffffffffffff");
                        })
                }
            })
        }
    }, [])
    
    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/promocodesId", {
    //         params: { token: localStorage.getItem("token") }
    //     }).then((response) => {
    //         setpromocode(response.data);
    //         console.log("sfffffffffffffffffffffffffffffffffffffff");
    //         console.log(response.data[0]);
    //         console.log("sfffffffffffffffffffffffffffffffffffffff");
    //     })
    // }, [])


    function UpdateTablePromocodes() {
        axios.get("http://localhost:8000/api/promocodesId", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setpromocode(response.data[0]);
            console.log("sfffffffffffffffffffffffffffffffffffffff");
            console.log(response.data[0]);
            console.log("sfffffffffffffffffffffffffffffffffffffff");
        })
    }

    const ref = useOutsideClick(handleClickOutside);

    const onEdit = ({ id, colN }: any) => {
        setInEditMode({
            status: true,
            rowKey: id,
            columnKey: id,
            columnName: colN
        })
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null,
            columnKey: null,
            columnName: null
        })
    }

    const DeleteEventButton = () => {
        console.log('Delete event button');
        axios.delete(`http://localhost:8000/api/promocode/${selectedID}`, {});
        UpdateTablePromocodes();
    }

    return (
        <div className="alleventstable">

            <button className="button-44" onClick={() => DeleteEventButton()}>Delete</button>
            <Popup
            modal
            nested
            open={popupVisibleCrEv}
            onClose={() => setPopupVisibleCrEv(false)}
            trigger={<button className="button-41" onClick={() => navigate("/create-promocode")}>Create</button>}
            >
            { <CreatePromocode/>}
            
            </Popup>

            <table >
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>discount</th>
                        <th>Date start</th>
                        <th>Date end</th>
                    </tr>
                </thead>
                <tbody>
                    {
                     promocodes && promocodes.map((event, i) => 
                        <tr 
                        key={event.Promocode_ID} id={event.Promocode_ID} 
                             onClick={handleHeaderClick}>

                            <td className={`check`}>
                                <div className="checkbox-wrapper-33">
                                    <label className="checkbox">
                                        <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                            // value={event.Event_ID}
                                            // onClick={e => handleChangeCheck(e, event.Event_ID)}
                                        />
                                        <span className="checkbox__symbol">
                                            <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 14l8 7L24 7"></path>
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </td>


                            <td>{event.Promocode_ID}</td>
                            {/* <td>"Promocode_ID"</td> */}

                            <td onClick={() => {
                                onEdit({
                                     id: event.Promocode_ID, 
                                     colN: "title" });

                            }}>
                                {
                                            event.title
                                }
                            </td>

                            <td onClick={() => {
                                onEdit({ 
                                    id: event.Promocode_ID, 
                                    
                                    colN: "description" });

                            }}>
                                {
                                            event.description
                                }
                            </td>


                            {/* <td>{userInfo.full_name}</td> */}

                            <td onClick={() => {
                                onEdit({
                                     id: event.Promocode_ID, 
                                     colN: "discount" });

                            }}>
                                {
                                    
                                                event.discount
                                }
                            </td>


                            {/* <td>{new Date(event.dateTime).toLocaleDateString()}</td> */}
                            <td onClick={() => {
                                onEdit({ 
                                    id: event.Promocode_ID, 
                                    colN: "datestart" });

                            }}>
                                {
                                    
                                            new Date(event.startDateTime).toLocaleDateString()
                                }
                            </td>

                            <td onClick={() => {
                                onEdit({
                                     id: event.Promocode_ID, 
                                     colN: "dateend" });

                            }}>
                                {
                                            new Date(event.endDateTime).toLocaleDateString()
                                }
                            </td>

                        </tr>
                    )
                } 
                </tbody>
            </table>
        </div>
    )
}

export default AllPromocode;