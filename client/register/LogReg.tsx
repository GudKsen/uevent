import { useNavigate } from "react-router-dom";

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
          <div className="column">
            <button onClick={regi}>Registration</button>
            <button onClick={logi}>Log In</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LogReg;
