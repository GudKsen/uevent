import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SelectFormat from "../event/CreateEvent/SelectFormat";
import SelectTheme from "../event/CreateEvent/SelectTheme";
import DropdownMenu from "./DropdownMenu";
import { Filter } from "./Filter";
import { FlagSelect } from "./FlagSelect";
import "./headerStyle.scss";


function Header({setSearchText, setSelectedCountry}: any) {
  const [showMenu, setShowMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedFormat, setSelectedFormat] = useState([]); 
  // const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  // const [selectedCountry, setSelectedCountry] = useState("");

  // if (userInfo.role === "organizator") {
  //   setShowMenu("showMenu");
  // }

  const Menu = () => {
    return (
      <div className={`menu-header ${showMenu}`}>
        <div className="menu-picture">

        </div>
      </div>
    )
  }

  return (
    <div className="header">
      <div className="three">
        <div className="search-header">

          <div className="bb bx bx-search icon header-icon-search">
            <div className="search-header-button hoverme" 
            // onClick={event => handleClick(searchText)}
            ></div>
          </div>

          <div className="input-header-container">
            <input className="input-search" type="text" placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </div>
          
         

        </div>
        <div>
            <img className="filter-icon " src={require("../../public/video/filter.png")} alt=""
              onClick={() => {setIsOpen(!isOpen)}}
            />
            {/* {
              isOpen ?
              <div className="modal-filter">
                <SelectFormat setSelectedThemes={setSelectedThemes}/>
                <SelectTheme setSelectedFormat={setSelectedFormat}/>
              </div>
                : null
            } */}

            
          </div>
      </div>
      <div className="two">
        <div className="country-select">
          <FlagSelect className="country-select" setSelectedCountry= {setSelectedCountry}
          
            />
        </div>

      <div>

        <div className="hoverme-profile" onClick={() => {
            navigate("/userpage");
          }}></div>

          


        </div>
      </div>

      
    </div>
  );
}

export default Header;
