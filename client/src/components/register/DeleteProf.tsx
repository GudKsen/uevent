// import React from "react";
// import { Link } from "react-router-dom";

// import { useEffect } from "react";
import "./regstyle.scss";

import { useNavigate, useParams } from "react-router-dom";



function DeleteProf() {
  const navigate = useNavigate();
  const { id } = useParams();
  async function logIn(e:any) {
    e.preventDefault();
    const data = await fetch(`http://localhost:8000/api/user/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    // const res = await data.json();
    console.log(data);
      navigate("/");
    
    }

  return (
    <div className="all">
    <section className="container">
      {/* <header>Hello again!</header> */}
      <form onSubmit={logIn} action="#" className="form" >
      <header>Thank you for being with us. If you want to remove the profile, click below</header>
         <button >Continue</button>
      </form>
    </section>
  </div>
      
    
  );
}

export default DeleteProf;
