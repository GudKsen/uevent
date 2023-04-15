import Sidebar2 from "../sidebar/sidebar2";
import "./CreateOrganization.scss";
import "../register/regstyle.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

interface ILocationOne {
    value: string;
    label: string;
}

export function CreateOrganization() {
    let navigate = useNavigate();
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

    const [animate, setAnimate] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<ILocationOne | null>(null);
    const [selectedState, setSelectedState] = useState<ILocationOne | null>(null);
    const [selectedCity, setSelectedCity] = useState<ILocationOne | null>(null);

    const [states, setStates] = useState<{ value: string, label: string }[]>([]);
    const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

    const [nameCompany, setNameCompany] = useState<string | null>(null);
    const [descriptionCompany, setDescriptionCompany] = useState<string | null>(null);
    const [emailCompany, setEmailCompany] = useState<string | null>(null);
    const [streetCompany, setStreetCompany] = useState<string | null>(null);
    const [number_streetCompany, setNumberStreetCompany] = useState<string | null>(null);

    const [checkEmail, setCheckEmail] = useState(false);
    const [code, setCode] = useState("");
    const [genCode, setGenCode] = useState("");

    const [err, setErr] = useState("");



    async function check(){

        if(!emailCompany){
            setErr("Enter email");
            return;
          }else {
            await axios.post(`http://localhost:8000/api/generate`, {
            token: localStorage.getItem("token"),
            email: emailCompany }
        ).then(res => {
            let mana = res.data;
            setGenCode(mana);
            });
          }
        


    }

    function CreateCompany() {
        // console.log("генкод креатеед")
        // console.log(genCode);

        if(!nameCompany){
            setErr("Enter company name");
            return;
          }else if(nameCompany.length < 3 ){
            setErr("Company name must be more then 3 symbols");
            return;
          }else if(!emailCompany){
            setErr("Enter email");
            return;
          }else if(!descriptionCompany){
            setErr("Enter description");
            return;
          }else if(!selectedCountry){
            setErr("Select country");
            return;
          }else if(!selectedState){
            setErr("Select state");
            return;
          }else if(!selectedCity){
            setErr("Select city");
            return;
          }else if(!streetCompany){
            setErr("Enter street name");
            return;
          }else if(!number_streetCompany){
            setErr("Enter street number");
            return;
          } else{
            setErr("");
          }

        
        console.log("Creating Company")
        axios.post("http://localhost:8000/api/company",
            {
                name: nameCompany,
                description: descriptionCompany,
                email: emailCompany,
                country: selectedCountry!.label,
                state: selectedState!.label,
                city: selectedCity!.label,
                street: streetCompany,
                street_number: number_streetCompany,
                code: code,
                genCode: genCode,
                token: localStorage.getItem("token")
            }).then(async (res) => {
                if ((res.data === "Enter correct cod.") 
                    ||  (res.data === "You already have a company and can't create one more.")
                    ||  (res.data === "Company already exists")){
                    console.log(res.data)
                    setErr(res.data);
                    setErr("Enter correct confirm code");
                } else if (res.status === 200) {
                    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
                    axios.get(`http://localhost:8000/api/user/${userInfo!.User_ID}`, {
                        params: { token: localStorage.getItem("token") }
                    }).then(res => {
                        if (res.status === 200) {
                            localStorage.removeItem("userInfo");
                            const { User_ID, password, full_name, email, role, country, city, phone_number, birthday, profile_picture } = res.data[0];
                            console.log("🚀 ~ file: CreateOrganization.tsx:54 ~ CreateCompany ~ res:", res.data[0])
                            localStorage.setItem(
                                "userInfo",
                                JSON.stringify({ User_ID, password, full_name, email, role, country, city, phone_number, birthday, profile_picture })
                            );
                            navigate("/userpage");
                        }
                    })
                    
                    
                } 
            })


    }

    function handleClickButton() {
        setAnimate("animate");
        setTimeout(() => {
            setAnimate("");
        }, 8000);
        CreateCompany();
    }

    let countries = [];

    for (let i = 0; i < Country.getAllCountries().length; i++) {
        countries.push({ value: Country.getAllCountries()[i].isoCode, label: Country.getAllCountries()[i].name });
    }
    function handleSelectCountry(selectedOpt: any) {
        setSelectedCountry(selectedOpt);
        if (selectedOpt) {
            for (let i = 0; i < State.getStatesOfCountry(selectedOpt.value).length; i++) {
                states.push({
                    value: State.getStatesOfCountry(selectedOpt.value)[i].isoCode,
                    label: State.getStatesOfCountry(selectedOpt.value)[i].name
                });
            }
        }
    }

    

    useEffect(()=>{
        if(code){
            setCheckEmail(true);
        } else {
            setCheckEmail(false);
        }
    }, [code])

    function handleSelectState(selectedOpt: any) {
        setSelectedState(selectedOpt);
        for (var i = 0; i < City.getCitiesOfState(selectedCountry!.value, selectedOpt.value).length; i++) {
            cities.push({
                value: City.getCitiesOfState(selectedCountry!.value, selectedOpt.value)[i].name,
                label: City.getCitiesOfState(selectedCountry!.value, selectedOpt.value)[i].name
            });
        }
    }

    function handleSelectCity(selectedOpt: any) {
        setSelectedCity(selectedOpt);
    }
    // let userInfo = localStorage.getItem("userInfo");
    // console.log("🚀 ~ file: CreateOrganization.tsx:122 ~ CreateOrganization ~ userInfo:", userInfo)

    return (
        <div className="create-organization-page">
            <Sidebar2 />
            <div>

                <div className="container-company">
                    
                    <div className="form-container">
                        <div><h3 className="errr">{err}</h3></div>
                        <div className="create-form1-content">
                            <div className="name-email-form">
                                <div className="title-create-event-form field">
                                    <div>Name of organization</div>
                                    <div className="input-box-a">
                                        <input type="text" className="tit" required onChange={(e) => { setNameCompany(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="email-create">
                                    <div>Email</div>

                                    <div className="input-box-a">
                                        <input type="email" className="tit" required onChange={e => { setEmailCompany(e.target.value) }} />
                                    </div>

                                </div>
                            </div>

                            <div className="name-email-form">
                                <div className="title-create-event-form field">
                                    <div>About</div>
                                    <div className="input-box-a">
                                    <textarea className="description-form is-focused"
                                        onChange={e => { setDescriptionCompany(e.target.value) }} required
                                    ></textarea>
                                    </div>
                                </div>
                                <div className="email-create">
                                    <div>Confirm code</div>

                                    <div className="input-box-a">
                                    <input  type="email" className="tit" required onChange={e => { setCode(e.target.value) }} />
                                    </div>

                                </div>
                            </div>

                            {/* <div className="column">
                                <div className="input-box-al">
                                <p>About</p>
                                <textarea className="description-form is-focused"
                                        onChange={e => { setDescriptionCompany(e.target.value) }} required
                                    ></textarea>
                                </div>

                                <div className="input-box-al">
                                <p>Confirm code</p>
                                <input type="email" className="tit" required onChange={e => { setEmailCompany(e.target.value) }} />
                                </div>
                            </div><br /> */}
                            {/* <div className="description-create-event field">
                                <div>About</div>
                                <div className="input-box-a">
                                    <textarea className="description-form is-focused"
                                        onChange={e => { setDescriptionCompany(e.target.value) }} required
                                    ></textarea>
                                </div>
                                <div>Confirm code</div>
                                <div className="input-box-a">
                                        <input type="email" className="tit" required onChange={e => { setEmailCompany(e.target.value) }} />
                                    </div>
                            </div> */}



                            <div className="location-org field">
                                <div>
                                    <div>Location</div>
                                    <div>

                                        <Select
                                            isSearchable={true}
                                            defaultValue={selectedCountry}
                                            options={countries}
                                            className="select-country"
                                            placeholder="Select a country..."
                                            onChange={handleSelectCountry}
                                            required
                                        ></Select>
                                    </div>
                                    <div>


                                        <Select
                                            isSearchable={true}
                                            defaultValue={selectedState}
                                            options={states}
                                            placeholder="Select a state..."
                                            className="select-state"
                                            onChange={handleSelectState}
                                            required
                                        ></Select>

                                    </div>
                                    <div>

                                        <Select
                                            isSearchable={true}
                                            className="select-city"
                                            defaultValue={selectedCity}
                                            options={cities}
                                            placeholder="Select a city..."
                                            onChange={handleSelectCity}
                                            required
                                        ></Select>

                                    </div>


                                </div>
                                <div className="street-number-form">
                                    <div className="add-street-number">
                                        <div className="input-box-a">
                                            <input type="text" placeholder="Input street..." className="input-street"
                                                onChange={e => { setStreetCompany(e.target.value) }}
                                            ></input>
                                        </div>

                                        <div className="input-box-a">
                                            <input type="text" placeholder="Input street number..." className="input-street-number"
                                                onChange={e => { setNumberStreetCompany(e.target.value) }}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* <br/> */}



                            <div className="file-create-event field">
                                {/* <div>UPLOAD POSTER</div> */}
                                {/* <DragDrop setFile={setFile}/> */}
                            </div>

                            <div className="cr-butt field">

                                {
                                    !checkEmail ?
                                        <button className={` buttonCheck`}
                                    onClick={check}>Check Email
                                    </button>
                                    :
                                    <button className={`create-event-button create-organization-button button ${animate}`}
                                    onClick={handleClickButton}>Create
                                    </button>
                                }

                                

                            </div>
                        </div>


                    </div>



                </div>

            </div>
        </div>
    )
}