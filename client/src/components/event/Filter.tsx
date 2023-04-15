import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import "./filter.scss"
import "../register/regstyle.scss"
import "./styleeventpage.scss";
import FormSecond from "./CreateEvent/FormSecond";

import SelectFormat from "./CreateEvent/SelectFormat";
import SelectTheme from "./CreateEvent/SelectTheme";


function Filter() {

    const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<{
        value: string,
        label: string
    }>();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  return (
    <div className="filter">
        <div className="price">
            <div className="ogoloshen"><p>Price</p></div>
            <div className="from-to">
                <div className="from">
                    <div>
                        <label className="fff">from</label>
                    </div>
                    <div className="input-box-a"><input onChange={(e) => setFrom(e.target.value)} type="number"/></div>
                </div>
                <div >
                    <div className="aaa">-</div>
                    <div className="between">-</div>
                </div>
                <div className="to">
                    <div className="ttt">to</div>
                    <div className="input-box-a"><input onChange={(e) => setTo(e.target.value)} type="number"/></div>
                </div>
            </div>
            
            <div className="maltobtn">
                <button className=" malto">Submit</button>
            </div>
            
        </div>

      <div className="theme">
        <div className="ogoloshen"><br/><p>Theme</p></div>
        <div  className="thefo">
            <SelectTheme className="SelectTheme" setSelectedThemes={setSelectedThemes}/>
        </div>

      </div>
      <div className="format">
        <div className="ogoloshen"><br/><p>Format</p></div>
        <div  className="thefo">
            <SelectFormat className="SelectFormat" setSelectedFormat={setSelectedFormat}/>
        </div>
        
      </div>


    </div>
  );
}

export default Filter;
