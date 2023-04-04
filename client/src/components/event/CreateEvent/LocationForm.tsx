import { useState } from "react";
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

import "./styleLocationForm.scss";

interface ILocationOne {
    value: string;
    label: string;
}


function LocationForm({
    setSelectedCountry, setSelectedState, setSelectedCity , setStreetCompany, setNumberStreetCompany
}: any) {
    const [states, setStates] = useState<{ value: string, label: string }[]>([]);
    const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

    const [selectedCountryTmp, setSelectedCountryTmp] = useState<ILocationOne | null>(null);
    const [selectedStateTmp, setSelectedStateTmp] = useState<ILocationOne | null>(null);
    const [selectedCityTmp, setSelectedCityTmp] = useState<ILocationOne | null>(null);

    const [streetCompany, setStreetCompanyTmp] = useState<string | null>(null);
    const [number_streetCompany, setNumberStreetCompanyTmp] = useState<string | null>(null);

    let countries = [];

    for (let i = 0; i < Country.getAllCountries().length; i++) {
        countries.push({ value: Country.getAllCountries()[i].isoCode, label: Country.getAllCountries()[i].name });
    }
    function handleSelectCountry(selectedOpt: any) {
        
        setSelectedCountry(selectedOpt);
        setSelectedCountryTmp(selectedOpt);
        if (State.getStatesOfCountry(selectedOpt.value).length > 0) {
            for (let i = 0; i < State.getStatesOfCountry(selectedOpt.value).length; i++) 
            {
                states.push({
                    value: State.getStatesOfCountry(selectedOpt.value)[i].isoCode,
                    label: State.getStatesOfCountry(selectedOpt.value)[i].name
                });
            }
        }
        else {
            for (var i = 0; i < City.getCitiesOfCountry(selectedOpt.value)!.length; i++)
            {
                cities.push({
                    value: City!.getCitiesOfCountry(selectedOpt!.value)![i].name,
                    label: City!.getCitiesOfCountry(selectedOpt!.value)![i].name
                })
            }
        }
    }

    function handleSelectState(selectedOpt: any) {
        setSelectedState(selectedOpt);
        for (var i = 0; i < City.getCitiesOfState(selectedCountryTmp!.value, selectedOpt.value).length; i++) {
            cities.push({
                value: City.getCitiesOfState(selectedCountryTmp!.value, selectedOpt.value)[i].name,
                label: City.getCitiesOfState(selectedCountryTmp!.value, selectedOpt.value)[i].name
            });
        }
    }

    function handleSelectCity(selectedOpt: any) {
        setSelectedCity(selectedOpt);
        
    }
        

    return (
        <div className="location-form">
            <div className="location-create-event field">
                <div>LOCATION<br/></div>
                                <div>
                                    
                                    <Select
                                        isSearchable={true}
                                        defaultValue={selectedCountryTmp}
                                        options={countries}
                                        className="select-country"
                                        placeholder="Select a country..."
                                        // onChange={() => setSelectedCountry(selectedCountry)}
                                        onChange={handleSelectCountry}
                                        required
                                    ></Select><br/>
                                </div>
                                <div>
                                    
                                  
                                   <Select
                                        isSearchable={true}
                                        defaultValue={selectedStateTmp}
                                        options={states}
                                        placeholder="Select a state..."
                                        className="select-state"
                                        onChange={handleSelectState}
                                        required
                                    ></Select><br/>
                                    
                                </div>
                                <div>
                                   
                                    <Select
                                    isSearchable={true}
                                    className="select-city"
                                    defaultValue={selectedCityTmp}
                                    options={cities}
                                    placeholder="Select a city..."
                                    onChange={handleSelectCity}
                                    required
                                    ></Select><br/>
                                   
                                </div>
                                {/* <div>
                                    <input type={"text"} placeholder={"Enter address..."}></input>
                                </div> */}
                                <div className="street-number-form">
                                    <div className="add-street-number">
                                        <div className="input-box-a">
                                            <input type="text" placeholder="Input street..." className="input-street"
                                                onChange={e => { setStreetCompany(e.target.value) }}
                                            ></input>
                                        </div><br/>

                                        <div className="input-box-a">
                                            <input type="text" placeholder="Input street number..." className="input-street-number"
                                                onChange={e => { setNumberStreetCompany(e.target.value) }}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                </div>
            </div>
        // </div>
    )
}

export default LocationForm