import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./bankCardStyle.scss";


function BankCard() {
  
  return (
    <div className="bankCard-page">
     <section>
      <div className="container-bank-card">
        <div className="bankcard front-face">
          <header>
            <span className="logo">
              <img className="mastercard" src={require("../../public/video/master-card.png")} alt=""></img>
              <h5>Master Card</h5>
            </span>
            <img className="chip" src={require('../../public/video/chip.png')} alt=""></img>
          </header>

          <div className="card-details">
            <div className="name-number">
              <h6>Card Number</h6>
              <h5 className="number">8050 2030 3020 5040</h5>
              <h5 className="name">Prem Kumar Shahi</h5>
            </div>

            <div className="valid-date">
              <h6>Valid Thru</h6>
              <h5>05/28</h5>
            </div>
          </div>
        </div>

        <div className="bankcard back-face">
          <h6>
            For customer service call +977 4343 3433 or email at
            mastercard@gmail.com
          </h6>
          <span className="magnetic-strip"></span>
          <div className="signature"><i>005</i></div>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            maiores sed doloremque nesciunt neque beatae voluptatibus doloribus.
            Libero et quis magni magnam nihil temporibus? Facere consectetur
            dolore reiciendis et veniam.
          </h5>
        </div>
      </div>
    </section>
    </div>
  );
}

export default BankCard;
