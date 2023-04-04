import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/styleAllCompanies.scss";
import { useNavigate } from "react-router";
import "./styles/commonStyle.scss";
import "./styles/allcompany.scss";
import { ImageComponent } from "./component/ImageComponent";
import { useOutsideClick } from "./utils/useOutsideClick";

function AllCompanies ()
{
    let [companies, setCompanies] = useState<any[]>([]);
    const [selectedID, setSelectedID] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/companies", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setCompanies(response.data);
            console.log(response.data);
        })
    }, []);

    const DeleteCompanyButton = () => {
        axios.delete(`http://localhost:8000/api/company/${selectedID}`, {
            params: { token: localStorage.getItem("token") }
        });
    }

    function handleChangeCheck(e: any) {
        let child = document.getElementById(e.target.value);

        if (child?.classList.contains("selected")) {
            child?.classList.remove("selected");
            setSelectedID(null);
        }
        else {
            child?.classList.add("selected");
            setSelectedID(e.target.value);
        }
    }

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

    const handleClickOutside = () => {
        onCancel();
    };

    const ref = useOutsideClick(handleClickOutside);

    const handleHeaderClick = (event: any) => {
        event.stopPropagation();
    };
    
    return (
        <div className="companies-table allcompanies">
            <button className="button-44" onClick={() => DeleteCompanyButton()}>Delete</button>
            <button className="button-41" onClick={() => navigate("/create-company")}>Create</button>
            {
                companies.length > 0 ? 
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {companies && companies.map((company) =>
                        <tr key={company.Company_ID} id={company.Company_ID} onClick={handleHeaderClick}>
                            <td className={`check`}>
                                        <div className="checkbox-wrapper-33">
                                            <label className="checkbox">
                                                <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                                    value={company.Company_ID}
                                                    onClick={e => handleChangeCheck(e)}
                                                />
                                                <span className="checkbox__symbol">
                                                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 14l8 7L24 7"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                            <td>{company.Company_ID}</td>
                            
                                    {
                                        company.image ?
                                        <td><ImageComponent imageUrl={"http://localhost:8000/company/" + company.image} /></td> 
                                        : <td>-</td>
                                    }
                            <td>{company.name}</td>
                            <td>{company.description}</td>
                        </tr>

                    )}
                </tbody>
                </table>

                : <div className="no-companies">There are no companies</div>
            }
        </div>
    )
}

export default AllCompanies;