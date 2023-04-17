import { useEffect, useState } from 'react';
import { City } from 'country-state-city';
import Select, { OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';

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

export function CitySelect(setSelectedCity: any) {
     const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

    //  useEffect(() => {
    //             let countryCode = localStorage.getItem("country");
    //             // console.log("🚀 ~ file: CitySelect.tsx:13 ~ countryCode:", countryCode?)
                
    //             if (countryCode)
    //             {
    //                 for (var i = 0; i < City.getCitiesOfCountry(countryCode!)!.length; i++) {
    //                     cities.push({
    //                         value: City.getCitiesOfCountry(countryCode!)![i].name,
    //                         label: City.getCitiesOfCountry(countryCode!)![i].name
    //                     });
    //                 }
    //             }
            
    //  }, [])


    // console.log("🚀 ~ file: CitySelect.tsx:13 ~ CitySelect ~ countryCode:", countryCode)
    const [selectedCity, setCurrSelectedCity] = useState<ILocationOne | null>(null);


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
        </div>
    )
}