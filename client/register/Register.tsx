import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./regstyle.scss";


function Register() {
  const navigate = useNavigate();
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function sendRegister(e: any) {
    e.preventDefault();
    const info = {
                password,
                passwordConfirm,
                full_name,
                email,
                number,
                city,
                data
    };
    console.log(info);
    navigate("/api/auth/login");
    
  }

  return (
    <div className="all">
      <section className="container">
      <header>Registration Form</header>
      <form action="#" className="form">
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" required onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Password</label>
            <input type="text" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className="input-box">
            <label>Confirn password</label>
            <input type="text" placeholder="Confirm password" required onChange={(e) => setPasswordConfirm(e.target.value)}/>
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input type="number" placeholder="Enter phone number" required onChange={(e) => setNumber(e.target.value)}/>
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input type="date" placeholder="Enter birth date" required onChange={(e) => setData(e.target.value)}/>
          </div>
        </div>
        <div className="input-box address">
          <label>Address</label>
          {/* <input type="text" placeholder="Enter street address" required onChange={(e) => setLogin(e.target.value)}/> */}
          {/* <input type="text" placeholder="Enter street address line 2" required /> */}
          <div className="column">
            <div className="select-box">
              <select>
                <option hidden>Country</option>
                <option>America</option>
                <option>Japan</option>
                <option>India</option>
                <option>Nepal</option>
              </select>
            </div>
            <input type="text" placeholder="Enter your city" required onChange={(e) => setCity(e.target.value)}/>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </section>
    </div>
  );
}

export default Register;
