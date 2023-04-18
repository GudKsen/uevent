import { useState } from "react";

import ReactFlagsSelect from "react-flags-select";

import "./styleFlagSelect.scss";

export function FlagSelect({setSelectedCountry}: any) {
    const [selected, setSelected] = useState(() => {
        return localStorage.getItem("country") ? localStorage.getItem("country")!.toString() : ""
    });
    
    localStorage.setItem("country", selected);

    return (
        <div title="Find events by country">
            {selected === "" ? <div><label className="select-cont">Select country</label></div> : null}
            <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => {setSelected(code);  onchange= () => {setSelectedCountry(code);
                    localStorage.setItem("country", code);
                    localStorage.setItem("isNeedRefreshCountry", "true");
                }}}
                showSelectedLabel={false}
                countries={["RU"]}
                blacklistCountries
                searchable={true}
                
            />
        </div>
    )
}