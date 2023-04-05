import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./regstyle.scss";
axios.create({
    baseURL: "http://localhost:3000",
});

function LogIn() {
  const [err, setErr] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  async function logIn(e: any) {
    e.preventDefault();
    const info = {
      email,
      password,
    };
    const data = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    console.log(data);
    const res = await data.json();
    console.log(res.data);
    if (typeof res === typeof "rara") {
      setErr(res);
    } else {
      const { User_ID, password, full_name, email, role , country, city, phone_number, birthday, profile_picture} = res.data[0];
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ User_ID, password, full_name, email, role , country, city, phone_number, birthday, profile_picture})
      );
      localStorage.setItem("token", res.token);
      navigate("/events");
    }
  }
  

  return (
    <div className="all">
      <section className="container">
        <header>Log in</header>
        <form action="#" className="form" >
          {/* <div className="column"> */}
          <div className="input-box-a">
            <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            name="email"
            />  
          </div>
          <div className="input-box-a">
            <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
            />  
          </div>
        
        <button onClick={logIn}>Submit</button>
        <div className="input-box">
            <span>
            or <Link to="/api/auth/register">Registration </Link>
          </span>
          <span>
            or <Link to="/api/auth/resetpass">Reset password</Link>
          </span>
        </div>
        
        </form>
      </section>
    </div>
    
  );
  
}

export default LogIn
