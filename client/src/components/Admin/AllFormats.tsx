import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./styles/allformats.scss";
import { useOutsideClick } from "./utils/useOutsideClick";
import { useNavigate } from "react-router";

function AllFormats() {
    const navigate = useNavigate();
    let [formats, setformats] = useState<any[]>([]);
    const [selectedID, setSelectedID] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/formats").then((response) => {
            setformats(response.data);
            console.log(response.data);
        })
    }, []);


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

    const handleClickOutside = () => {
        onCancel();
    };

    const handleHeaderClick = (event: any) => {
        event.stopPropagation();
    };

    const ref = useOutsideClick(handleClickOutside);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null,
        columnKey: null,
        columnName: null
    });

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

    function UpdateTableEvent() {
        axios.get("http://localhost:8000/api/formats").then((response) => {
            setformats(response.data);
        })
    }

    const updateTitle = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/format/${id}`, {
            title: newUnitPrice
        })
        UpdateTableEvent();
    }

    const updateDescription = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/format/${id}`, {
            description: newUnitPrice
        })
        UpdateTableEvent();
    }

    const DeleteFormatButton = () => {
        axios.delete(`http://localhost:8000/api/format/${selectedID}`);
    }

    return (
        <div className="allformats">
            <button className="button-44" onClick={() => DeleteFormatButton()}>Delete</button>
            <button className="button-41" onClick={() => navigate("/create-format")}>Create</button>

            {
                formats.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formats && formats.map((format) =>
                                <tr key={format.Format_ID} id={format.Format_ID} onClick={handleHeaderClick}>
                                    {/* <td className={`check`}>
                                        <div className="checkbox number">

                                            <input type="checkbox"
                                                className={`cardcheckbox`}
                                                value={format.Format_ID}

                                            />
                                        </div>
                                    </td> */}
                                    <td className={`check`}>
                                        <div className="checkbox-wrapper-33">
                                            <label className="checkbox">
                                                <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                                    value={format.Format_ID}
                                                    onClick={e => handleChangeCheck(e, format.Format_ID)}
                                                />
                                                <span className="checkbox__symbol">
                                                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 14l8 7L24 7"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>{format.Format_ID}</td>


                                    {/* <td>{format.title}</td> */}
                                    <td onClick={() => {
                                        onEdit({ id: format.Format_ID, colN: "title" });

                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === format.Format_ID
                                                && inEditMode.columnName === "title"
                                                ? (
                                                    <input type="text" defaultValue={format.title}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                updateTitle({ id: format.Format_ID, newUnitPrice: e.target.value });
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    format.title
                                                )
                                        }
                                    </td>
                                    
                                    <td onClick={() => {
                                        onEdit({ id: format.Format_ID, colN: "description" });

                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === format.Format_ID
                                                && inEditMode.columnName === "description"
                                                ? (
                                                    <input type="text" defaultValue={format.description}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                updateDescription({ id: format.Format_ID, newUnitPrice: e.target.value });
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    format.description
                                                )
                                        }
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>

                    : <div className="no-companies">There are no formats</div>
            }
        </div>
    )
}

export default AllFormats;
