import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./regstyle.scss";
axios.create({
    baseURL: "http://localhost:3000",
});

function LogIn() {
  const [number, setNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  async function logIn(e: any) {
    e.preventDefault();
    const info = {
      number,
      password,
    };
    console.log(info);
    
      navigate("/userpage");
    }
  

  return (
    <div className="all">
      <section className="container">
        <header>Log in</header>
        <form action="#" className="form" >
          {/* <div className="column"> */}
          <div className="input-box">
            <input
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            placeholder="Login"
            name="login"
            />  
          </div>
          <div className="input-box">
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
