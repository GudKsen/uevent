import { useState, useEffect } from "react";
import axios from "axios";
import getSymbolFromCurrency from 'currency-symbol-map'

// import { ImageComponent } from "../component/ImageComponent";
// import { UpdateTitle } from "../UpdateFunctions/Event/UpdateEvent";
// import { useOutsideClick } from "../utils/useOutsideClick";

import { ImageComponent } from "../Admin/component/ImageComponent";
import { useOutsideClick } from "../Admin/utils/useOutsideClick";

import "../Admin/styles/commonStyle.scss";
import "../Admin/styles/allevents.scss";
import { Navigate, useNavigate } from "react-router";
import { UpdateTitle } from "../Admin/UpdateFunctions/Event/UpdateEvent";

function AllEvents({ id }: any) {
    const [events, setEvents] = useState<any[]>([]);
    const [file, setFile] = useState<File>();
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
    console.log("🚀 ~ file: UserPage.tsx:84 ~ UserPage ~ userInfo:", userInfo)

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
                    await axios.get(`http://localhost:8000/api/events/${id}`, {
                        params: { token: localStorage.getItem("token") }
                    }).then(async (response) => {
                        console.log(response.data);
                        // setTimeout(() => {
                            setEvents(response.data);
                        // }, 3000)
                          
                        
                    })
                }
            })
        }
    }, [])



    function UpdateTableEvent() {
        axios.get("http://localhost:8000/api/events/all", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setEvents(response.data);
            console.log(response.data);
        })
    }

    const updateTitle = ({ id, newUnitPrice }: any) => {
        UpdateTitle({ id: id, newUnitPrice: newUnitPrice })
        UpdateTableEvent();
    }

    const updateDescription = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/event/${id}`, {
            description: newUnitPrice
        })
        UpdateTableEvent();
    }

    const updateLocation = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/event/${id}`, {
            location: newUnitPrice
        })
        UpdateTableEvent();
    }

    const updateDateTime = ({ id, date, time }: any) => {
        axios.patch(`http://localhost:8000/api/event/${id}`, {
            date: date,
            time: time
        });
        UpdateTableEvent();
    }

    // const updatePoster = ({ id, newUnitPrice }: any) => {
    //     axios.patch(`http://localhost:8000/api/event/${id}`, {
    //         title: newUnitPrice
    //     });
    //     UpdateTableEvent();
    // }
    // const updatePoster = ({ id, newUnitPrice }: any) => {
    //     let formField = new FormData();
    //     formField.append('file', file!);
    //     axios.patch(`http://localhost:8000/api/event/:id`, formField, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
    // }

    const updatePrice = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/event/${id}`, {
            title: newUnitPrice
        });
        UpdateTableEvent();
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
        axios.delete(`http://localhost:8000/api/event/${selectedID}`, {});
        UpdateTableEvent();
    }

    return (
        <div className="alleventstable">

            <button className="button-44" onClick={() => DeleteEventButton()}>Delete</button>
            <button className="button-41" onClick={() => navigate("/create-event")}>Create</button>

            <table >
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        {/* <th>Author</th> */}
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Poster</th>
                        <th>Price</th>
                        <th>Themes</th>
                        <th>Format</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map((event, i) =>
                        <tr key={event.Event_ID} id={event.Event_ID}
                            onClick={handleHeaderClick}>

                            <td className={`check`}>
                                <div className="checkbox-wrapper-33">
                                    <label className="checkbox">
                                        <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                            value={event.Event_ID}
                                            onClick={e => handleChangeCheck(e, event.Event_ID)}
                                        />
                                        <span className="checkbox__symbol">
                                            <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 14l8 7L24 7"></path>
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </td>


                            <td>{event.Event_ID}</td>

                            <td onClick={() => {
                                onEdit({ id: event.Event_ID, colN: "title" });

                            }}>
                                {
                                    inEditMode.status
                                        && inEditMode.rowKey === event.Event_ID
                                        && inEditMode.columnName === "title"
                                        ? (
                                            <input type="text" defaultValue={event.title}
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        updateTitle({ id: event.Event_ID, newUnitPrice: e.target.value });
                                                    }, 3000)
                                                }}
                                                className="update-title-event"
                                            />
                                        ) : (
                                            event.title
                                        )
                                }
                            </td>

                            <td onClick={() => {
                                onEdit({ id: event.Event_ID, colN: "description" });

                            }}>
                                {
                                    inEditMode.status
                                        && inEditMode.rowKey === event.Event_ID
                                        && inEditMode.columnName === "description"
                                        ? (
                                            <input type="text" defaultValue={event.description}
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        updateDescription({ id: event.Event_ID, newUnitPrice: e.target.value });
                                                    }, 3000);
                                                }}
                                                className="update-title-event"
                                            />
                                        ) : (
                                            event.description
                                        )
                                }
                            </td>


                            {/* <td>{userInfo.full_name}</td> */}

                            <td onClick={() => {
                                onEdit({ id: event.Event_ID, colN: "location" });

                            }}>
                                {
                                    inEditMode.status
                                        && inEditMode.rowKey === event.Event_ID
                                        && inEditMode.columnName === "location"
                                        ? (
                                            <input type="text" defaultValue={event.location[0].country}
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        updateLocation({ id: event.Event_ID, newUnitPrice: e.target.value });
                                                    }, 3000);
                                                }}
                                                className="update-title-event"
                                            />
                                        ) : (
                                            
                                            <div>
                                                {event.location[0].country}, {event.location[0].city}
                                            </div>
                                        )
                                }
                            </td>


                            {/* <td>{new Date(event.dateTime).toLocaleDateString()}</td> */}
                            <td onClick={() => {
                                onEdit({ id: event.Event_ID, colN: "date" });

                            }}>
                                {
                                    inEditMode.status
                                        && inEditMode.rowKey === event.Event_ID
                                        && inEditMode.columnName === "date"
                                        ? (
                                            <input type="date" defaultValue={event.dateTime}
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        updateDateTime({ id: event.Event_ID, date: e.target.value, time: new Date(event.dateTime).getTime() })
                                                    }, 3000);
                                                }}
                                                className="update-title-event"
                                            />
                                        ) : (
                                            new Date(event.startDateTime).toLocaleDateString()
                                        )
                                }
                            </td>

                            {/* <td>{new Date(event.dateTime).toLocaleTimeString()}</td> */}
                            <td onClick={() => {
                                onEdit({ id: event.Event_ID, colN: "time" });

                            }}>
                                {
                                    inEditMode.status
                                        && inEditMode.rowKey === event.Event_ID
                                        && inEditMode.columnName === "time"
                                        ? (
                                            <input type="time" defaultValue={event.dateTime}
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        updateDateTime({ id: event.Event_ID, date: new Date(event.dateTime).toJSON().substring(0, new Date(event.dateTime).toJSON().indexOf("T")), time: e.target.value })
                                                    }, 3000);
                                                }}
                                                className="update-title-event"
                                            />
                                        ) : (
                                            // event.dateTime
                                            new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        )
                                }
                            </td>


                            {
                                event.poster ?
                                    <td><ImageComponent imageUrl={"http://localhost:8000/images/" + event.poster} /></td>
                                    : <td>-</td>
                            }



                            {
                                event.price ? <td>{event.price[0].price_value} {getSymbolFromCurrency(event.price[0].currency)}</td> : <td>free</td>
                            }

                            <td className="themes-cell">{
                                event.themes && event.themes.map((theme: any) =>
                                    <div key={theme.Theme_ID} className="theme-back"> {theme.title}</div>
                                )
                            }</td>

                            <td className="themes-cell">
                                <div >{event.format[0].title}</div>

                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllEvents;