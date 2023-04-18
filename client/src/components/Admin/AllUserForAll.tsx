import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageComponent } from "./component/ImageComponent";
import { useOutsideClick } from "./utils/useOutsideClick";

import "./styles/commonStyle.scss";
import "./styles/allusers.scss";
import { UpdateBirthday, UpdateCity, UpdateCountry, UpdateEmail, UpdateFullName, UpdatePhoneNumber, UpdateRole } from "./UpdateFunctions/User/UpdateUser";


function AllUsersForAll() {
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
            

                    <table>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Full name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Birthday</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Telegram</th>
                                <th>Twitter</th>
                                <th>Skype</th>
                            </tr>
                        </thead>
                        {
                            users.length > 0 ?
                        <tbody>
                        
                            {users && users.map((user) =>
                                <tr key={user.User_ID} id={user.User_ID} onClick={() =>navigate(`/user/${user.User_ID}`)}>
                                    {
                                        user.profile_picture ?
                                        <td><ImageComponent imageUrl={"http://localhost:8000/avatars/" + user.profile_picture} /></td> 
                                        : <td>-</td>
                                    }
                                   
                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "full_name" });
                                    }}>
                                        {
                                            ( user.full_name
                                                )
                                        }
                                       
                                    </td>

                                        

                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "role" });
                                    }}>
                                        {(
                                                    user.role
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "email" });
                                    }}>
                                        {(
                                                    user.email
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "phone_number" });
                                    }}>
                                        {(
                                                    user.phone_number
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "birthday" });
                                    }}>
                                        {
                                            (
                                                new Date(user.birthday).toLocaleDateString()
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "country" });
                                    }}>
                                        {(
                                                    user.country
                                                )
                                        }
                                       
                                    </td>


                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "city" });
                                    }}>
                                        
                                        {
                                                    user.city
                                               
                                        }
                                       
                                    </td>

                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "telegram" });
                                    }}>
                                        { user.telegram ?
                                        (
                                                    user.telegram
                                                ) : <></>
                                        }
                                       
                                    </td>

                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "twitter" });
                                    }}>
                                        { user.twitter ?
                                        (
                                                    user.twitter
                                                ) : <></>
                                        }
                                       
                                    </td>

                                    <td onClick={() => {
                                        onEdit({ id: user.User_ID, colN: "skype" });
                                    }}>
                                        { user.skype ?
                                        (
                                                    user.skype
                                                ) : <></>
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

export default AllUsersForAll;