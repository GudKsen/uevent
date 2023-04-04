import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageComponent } from "./component/ImageComponent";
import { useOutsideClick } from "./utils/useOutsideClick";

import "./styles/commonStyle.scss";
import "./styles/allusers.scss";
import { UpdateBirthday, UpdateCity, UpdateCountry, UpdateEmail, UpdateFullName, UpdatePhoneNumber, UpdateRole } from "./UpdateFunctions/User/UpdateUser";


function AllUsers() {
    let [users, setUsers] = useState<any[]>([]);
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();
    const [selectedID, setSelectedID] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users", {
            params: { token: localStorage.getItem("token") }
        }).then((response) => {
            setUsers(response.data);
            console.log(response.data);
        })
    }, []);

    function handleRoleSelect(e: any) {
        setSelectedRole(e.target.value);
    }

    if (selectedRole.length > 0 && selectedRole !== "all") {
        users = users.filter((post) => {
            if (post.role) {
                return post.role.includes(selectedRole);
            }
            else {
                return false;
            }
        })
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

    const DeleteUserButton = () => {
        axios.delete(`http://localhost:8000/api/user/${selectedID}`);
    }

    return (
        <div className="allusers">
            <button className="button-44" onClick={() => DeleteUserButton()}>Delete</button>
            <button className="button-41" onClick={() => navigate("/create-user")}>Create</button>
            

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Photo</th>
                                <th>Full name</th>
                                <th>
                                    {/* Role */}
                                    <select className="select-role" onChange={handleRoleSelect} defaultValue={"all"}>
                                        <option value="all">Role</option>
                                        <option value="user">User</option>
                                        <option value="organizer">Organizer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Birthday</th>
                                <th>Country</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        {
                            users.length > 0 ?
                        <tbody>
                        
                            {users && users.map((user) =>
                                <tr key={user.User_ID} id={user.User_ID} onClick={handleHeaderClick}>
                                    <td className={`check`}>
                                        <div className="checkbox-wrapper-33">
                                            <label className="checkbox">
                                                <input className="checkbox__trigger visuallyhidden" type="checkbox"
                                                    value={user.User_ID}
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

                                    <td>{user.User_ID}</td>
                                    {
                                        user.profile_picture ?
                                        <td><ImageComponent imageUrl={"http://localhost:8000/avatars/" + user.profile_picture} /></td> 
                                        : <td>-</td>
                                    }
                                   
                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "full_name" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "full_name"
                                                ? (
                                                    <input type="text" defaultValue={user.full_name}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                UpdateFullName({id: user.User_ID, full_name: e.target.value})
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.full_name
                                                )
                                        }
                                       
                                    </td>

                                        

                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "role" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "role"
                                                ? (
                                                    <input type="text" defaultValue={user.role}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                               UpdateRole({id: user.User_ID, role: e.target.value})
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.role
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "email" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "email"
                                                ? (
                                                    <input type="text" defaultValue={user.email}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                UpdateEmail({id: user.User_ID, email: e.target.value})
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.email
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "phone_number" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "phone_number"
                                                ? (
                                                    <input type="text" defaultValue={user.phone_number}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                               UpdatePhoneNumber({id: user.User_ID, phone_number: e.target.value})
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.phone_number
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "birthday" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "birthday"
                                                ? (
                                                    <input type="text" defaultValue={user.birthday}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                // updateTitle({ id: user.full_name, newUnitPrice: e.target.value });
                                                                // UpdateBirthday
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.birthday
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "country" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "country"
                                                ? (
                                                    <input type="text" defaultValue={user.country}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                // updateTitle({ id: user.full_name, newUnitPrice: e.target.value });
                                                                UpdateCountry({id: user.User_ID, country: e.target.value})
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.country
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "city" });
                                    }}>
                                        {
                                            inEditMode.status
                                                && inEditMode.rowKey === user.User_ID
                                                && inEditMode.columnName === "city"
                                                ? (
                                                    <input type="text" defaultValue={user.city}
                                                        onChange={(e) => {
                                                            setTimeout(() => {
                                                                // updateTitle({ id: user.full_name, newUnitPrice: e.target.value });
                                                                UpdateCity({ id: user.User_ID, city: e.target.value });
                                                            }, 3000)
                                                        }}
                                                        className="update-title-event"
                                                    />
                                                ) : (
                                                    user.city
                                                )
                                        }
                                       
                                    </td>


                                </tr>

                            )}
                            

                        </tbody>
                        : <div className="no-companies">There are no users</div>
                    }
                    </table>

                    
        </div>
    )
}

export default AllUsers;