import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
function sendReset(e: any){
      navigate("/api/auth/login");
  }
  return (
    <div className="all">
    <section className="container">
      <header>Reset password</header>
      <form action="#" className="form" >
      <div className="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button >Submit</button>
      </form>
    </section>
  </div>
    // <div className="all">
    //   <form className="sendReset">
    //     <h1>Registration</h1>
    //     <input
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //       type="text"
    //       placeholder="Email"
    //       name="email"
    //     />
    //     <button onClick={sendReset}>Submit</button>
    //   </form>
    // </div>
    
  );
}

export default ResetPass;
