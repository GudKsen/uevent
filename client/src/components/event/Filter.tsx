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


function Filter({setFilterPriceStart, setFilterPriceEnd, setFilterTheme, setFilterFormat, setFree, setReset, free}:any) {

    const [selectFree, setSelectFree] = useState(Boolean);

    const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<{
        value: string,
        label: string
    }>();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    function handlePriceFilter()
    {
        setFilterPriceStart(from);
        setFilterPriceEnd(to);
    }

    function handleReset()
    {
        setFilterTheme([]);
        setFilterFormat();
        setFilterPriceEnd();
        setFilterPriceStart();
        //setReset(true);
    }

//   const navigate = useNavigate();
//   let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  return (
    <div className="filter">
        <div className="price">
            <div className="ogoloshen"><p>Price</p></div>
            <div className="from-to">
                <div className="from">
                    <div>
                        <label className="fff">From</label>
                    </div>
                    <div className="input-box-a"><input onChange={(e) => setFrom(e.target.value)} type="number"/></div>
                </div>
                <div >
                    <div className="aaa"></div>
                    <div className="between"></div>
                </div>
                <div className="to">
                    <div className="ttt">To</div>
                    <div className="input-box-a"><input onChange={(e) => setTo(e.target.value)} type="number"/></div>
                </div>
                
            </div>
            
            <div >
                <div className="free">
                    <input type="checkbox" onChange={() => setFree(!free)}/>Free
                </div>
                <div className="maltobtn">
                    <button className=" malto" onClick={() => {handlePriceFilter()}}>Submit</button>            
                </div>
            </div>

            
            
        </div>

      <div className="theme">
        <div className="ogoloshen"><br/><p>Theme</p></div>
        <div  className="thefo">
            <SelectTheme className="SelectTheme" setSelectedThemes={setFilterTheme} />
        </div>

      </div>
      <div className="format">
        <div className="ogoloshen"><p className="ogolfor">Format</p></div>
        <div  className="thefo">
            <SelectFormat className="SelectFormat" setSelectedFormat={setFilterFormat}/>
        </div>
        
      </div>
      <div className="reset">
        <div className="maltobtn">
            <button className="malto" onClick={() => {handleReset()}}>Reset</button>
        </div>
      </div>


    </div>
  );
}

export default Filter;
