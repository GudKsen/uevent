import { useNavigate } from "react-router";
import Header from "../sidebar/Header";

import "./style.scss"

export function Thankyou()
{
    const navigate = useNavigate();
    return (
        <div className="thankyou-page">
            <Header />
            <div className="thankyou-content">
                <div className="thankyou-message">
                    <h1>Thank you for your purchase</h1>
                    <h3>The letter with the generated ticket has been sent to your email</h3>
                    <div>
                        <button className="hover-goto-shop" onClick={ e => navigate('/events')}>Go to shop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}