import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  async function sendReset(e: any){
    e.preventDefault();
    const info = {
      email
    };
    const data = await fetch("http://localhost:8000/api/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    console.log(data);
    const res = await data.json();
    console.log(res.data);
    // navigate("/login");
  }
  return (
    <div className="all">
    <section className="container">
      <header>Reset password</header>
      <form action="#" className="form" >
      <div className="input-box-a">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button onClick={sendReset}>Submit</button>
      </form>
    </section>
  </div>
    
  );
}

export default ResetPass;
