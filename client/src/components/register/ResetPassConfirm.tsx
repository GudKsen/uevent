import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ResetPass() {

    let { id } = useParams();
    let { confirm_token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordConfirm, setConfirmPassword] = useState("");
    async function sendResetConfirm(e: any){
        e.preventDefault();
        if(!password){
            setError("Enter password");
            return;
          } else if(password.length < 8){
            setError("Password must be more then 8 symbols");
            return;
          }else if(password !== passwordConfirm){
            setError("Password must be confirm");
            return;
        }


        const info = {
        password
        };
        const data = await fetch(`http://localhost:8000/api/auth/password-reset/${confirm_token}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
        });
        console.log(data);
        const res = await data.json();
        console.log(res.data);
        navigate("/api/auth/login");
    
  }

  return (
    <div className="all">
    <section className="container">
      <header>Reset password</header>
      <form action="#" className="form" >
        <p className="err">{error}</p>
        <div className="input-box-a">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="input-box-a">
          <label>Confirm password</label>
          <input type="password" placeholder="Enter password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button onClick={sendResetConfirm}>Submit</button>
      </form>
    </section>
  </div>
    
    
  );
}

export default ResetPass;
