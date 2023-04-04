import { useNavigate } from "react-router-dom";
import LogGoogle from "./LogGoogle";

function LogReg() {
    const navigate = useNavigate();
    async function regi() {
        navigate("/api/auth/register");
    }

    async function logi() {
        navigate("/api/auth/login");
    }

  return (
    <div className="all">
      <section className="container">
        <header>Hello again!</header>
        <form action="#" className="form">
          <div className="column-logreg">
            <button className="reg" onClick={regi}>Registration</button>
            <button className="log" onClick={logi}>Log In</button><br/>
            
          </div>
        </form>
        {/* <br/>
        <LogGoogle/> */}
      </section>
    </div>
  );
}

export default LogReg;
