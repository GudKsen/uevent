import { useEffect, useState } from 'react';
import { City } from 'country-state-city';
// import Select, { OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';
import { RegionDropdown } from 'react-country-region-selector'
import React from 'react';
import Select from '@atlaskit/select';
import axios from 'axios';
import "./citySelect.scss"

interface ILocationOne {
    value: string;
    label: string;
}

// let cities: any = [];
// if (countryCode) {
//     console.log("🚀 ~ file: CitySelect.tsx:13 ~ countryCode:", countryCode)

//     for (var i = 0; i < City.getCitiesOfCountry(countryCode!)!.length; i++) {
//         cities.push({
//             value: City.getCitiesOfCountry(countryCode!)![i].name,
//             label: City.getCitiesOfCountry(countryCode!)![i].name
//         });
//     }
// }

export function CitySelect(setSelectedCity: any, setSelectedRegion: any) {
    const [cities, setCities] = useState<{ value: string, label: string }[]>([]);
    const [country, setCountry] = useState('');
    // const [region, setRegion] = useState('');
    const [region, setRegion] = useState(() => {
        return localStorage.getItem("region") ? localStorage.getItem("region")!.toString() : ""
    });
    console.log("🚀 ~ file: CitySelect.tsx:35 ~ const[region,setRegion]=useState ~ region:", region)
    const [regionName, setRegionName] = useState<string | undefined>();

    let countryCode = localStorage.getItem("country");
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

    useEffect(() => {
        // axios.get("https://www.universal-tutorial.com/api/cities/Alaska", )
        if (countryCode !== undefined && countryCode !== null)
        {
            setRegionName(regionNames.of(countryCode!));
            setCountry(regionNames.of(countryCode!)!.toString());
            // localStorage.setItem("region", region);
        }
        
    }, [])

    localStorage.setItem("region", region);

    // console.log("🚀 ~ file: CitySelect.tsx:13 ~ CitySelect ~ countryCode:", countryCode)
    const [selectedCity, setCurrSelectedCity] = useState<ILocationOne | null>(null);
    

    // console.log("🚀 ~ file: CitySelect.tsx:33 ~ CitySelect ~ countryCode:", countryCode)

    function handleSelectCity(selectedOpt: any) {
        setSelectedCity(selectedOpt);
        setCurrSelectedCity(selectedOpt);
    }

    return (
        <div className="city-select-item">
            {/* <Select
                isSearchable={true}
                options={cities}
                defaultValue={selectedCity}
                onChange={handleSelectCity}
            /> */}

            { countryCode ? 
                <RegionDropdown
                classes='regionDropdown'
                country={country}
                value={region}
                onChange={(val) => {
                    setRegion(val);
                    setSelectedRegion(val);
                    
                }} />
            : null}
            
        </div>
    )
}