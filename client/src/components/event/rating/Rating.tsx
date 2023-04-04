import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ratingStyle.scss";


function Rating() {
    const [active, setActive] = useState("");

    function handleStars () {

    }

    return (
        <div className="rating">
            <div className="rating-box">
                {/* <header>How was your experience?</header> */}
                <div className="stars">
                    {/* <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i> */}
                   
                    
                </div>
            </div>
        </div>
    );
}

export default Rating;
