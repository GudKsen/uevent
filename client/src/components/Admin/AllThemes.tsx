import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./styles/allthemes.scss";
import { useOutsideClick } from "./utils/useOutsideClick";
import { useNavigate } from "react-router";

function AllThemes() {
    const navigate = useNavigate();
    let [themes, setThemes] = useState<any[]>([]);
    const [selectedID, setSelectedID] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/themes").then((response) => {
            setThemes(response.data);
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
        axios.get("http://localhost:8000/api/themes").then((response) => {
            setThemes(response.data);
        })
    }

    const updateTitle = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/theme/${id}`, {
            title: newUnitPrice
        })
        UpdateTableEvent();
    }

    const updateDescription = ({ id, newUnitPrice }: any) => {
        axios.patch(`http://localhost:8000/api/theme/${id}`, {
            description: newUnitPrice
        })
        UpdateTableEvent();
    }

    const DeleteThemeButton = () => {
        axios.delete(`http://localhost:8000/api/theme/${selectedID}`);
    }

    return (
        <div className="allthemes">
            <button className="button-44" onClick={() => DeleteThemeButton()}>Delete</button>
            <button className="button-41" onClick={() => navigate("/create-theme")}>Create</button>
            {
                themes.length > 0 ?
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
                            {themes && themes.map((theme) =>
                                <tr key={theme.Theme_ID} id={theme.Theme_ID} onClick={handleHeaderClick}>

                                    <td className={`check`}>
                                        <div className="checkbox-wrapper-33">
                                            <label className="checkbox">
                                                <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                                    value={theme.Theme_ID}
                                                    onClick={e => handleChangeCheck(e, theme.Theme_ID)}
                                                />
                                                <span className="checkbox__symbol">
                                                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 14l8 7L24 7"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>{theme.Theme_ID}</td>

                                    <td onClick={() => {
                                        onEdit({ id: theme.Theme_ID, colN: "title" });

                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === theme.Theme_ID
                                                && inEditMode.columnName === "title"
                                                ? (
                                                    <input type="text" defaultValue={theme.title}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                updateTitle({ id: theme.Theme_ID, newUnitPrice: e.target.value });
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    theme.title
                                                )
                                        }
                                    </td>

                                    <td onClick={() => {
                                        onEdit({ id: theme.Theme_ID, colN: "description" });

                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === theme.Theme_ID
                                                && inEditMode.columnName === "description"
                                                ? (
                                                    <input type="text" defaultValue={theme.description}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                updateDescription({ id: theme.Theme_ID, newUnitPrice: e.target.value });
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    theme.description
                                                )
                                        }
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>

                    : <div className="no-companies">There are no themes</div>
            }
        </div>
    )
}

export default AllThemes;
