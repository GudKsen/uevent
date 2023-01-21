// import React from "react";
// import { Link } from "react-router-dom";

// import { useEffect } from "react";
import "./regstyle.scss";

import { useNavigate, useParams } from "react-router-dom";



function RegiConfirm() {
  const navigate = useNavigate();
  const { token } = useParams();
  async function logIn(e:any) {
    e.preventDefault();
      navigate("/api/auth/login");
    
    }

  return (
    <div className="all">
    <section className="container">
      <header>Hello again!</header>
      <form action="#" className="form" >
      <header>You have successfully registered, click to continue</header>
         <button>Continue</button>
      </form>
    </section>
  </div>
      
    
  );
}

export default RegiConfirm;
