import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styleuserpage.scss";
import Sidebar from "../sidebar/Sidebar"
// import userimage from  "../user/default.jpg"


function Setting() {

    const [number, setNumber] = React.useState("");
  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [data, setDateBirth] = React.useState("");
  const [address, setAddress] = React.useState("");

  const navigate = useNavigate();
  async function update(e: any) {
    e.preventDefault();
    const info = {
      number,
      fullname,
      email, 
      data,
        address
    };
    console.log(info);
    
      navigate("/userpage");
    }


  return (
    <div className="userpageall">
      
      <div>
        <Sidebar/>
      </div>
        <div className="userpage">
            <form action="#" className="form" >
                <div className="infouser">
                <b><p>Update user info:</p></b><br/>
                
                <h1>Full name: </h1>
                    <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Cazimir Malevich"
                    name="fullname"
                    />  
                <h1>Email: </h1>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="cazik_love@gmail.com"
                    name="email"
                    /> 
                <h1>Date of Birth: </h1>
                <input
                    onChange={(e) => setDateBirth(e.target.value)}
                    type="date"
                    name="data"
                    /> 
                <h1>Phone number: </h1>
                <input
                    onChange={(e) => setNumber(e.target.value)}
                    type="number"
                    placeholder="+38 096 553 89 16"
                    name="number"
                    /> 
                <h1>Address: </h1>
                <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Kiev, Ukraine"
                    name="address"
                    /> <br/><br/>
                    <button onClick={update}>Update</button>
                </div>
                    
            </form>
      </div>
    </div>
  );
}

export default Setting;
