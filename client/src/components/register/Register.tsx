import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputGfg from "./PI";
import LogGoogle from "./LogGoogle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { createFilter } from 'react-select';
import { Country, State, City } from 'country-state-city';

// import { useForm} from "react-hook-form";

// import ReactCountryFlag from "react-country-flag";
import "./regstyle.scss";
import { colors } from "react-select/dist/declarations/src/theme";

interface ILocationOne {
  value: string;
  label: string;
}

function Register() {
  const navigate = useNavigate();
  const [full_name, setName] = useState("");
  const [error, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setDirthday] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<ILocationOne | null>(null);
  const [selectedCity, setSelectedCity] = useState<ILocationOne | null>(null);
  const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

  const [value, setValue] = useState<string>('');

  async function sendRegister(e: any) {
    e.preventDefault();

    if(!full_name){
      setErr("Enter full name");
      return;
    }else if(full_name.length < 3 ){
      setErr("Full name must be more then 3 symbols");
      return;
    }else if(!email){
      setErr("Enter email");
      return;
    }else if(!password){
      setErr("Enter password");
      return;
    } else if(password.length < 8){
      setErr("Password must be more then 8 symbols");
      return;
    }else if(password !== passwordConfirm){
      setErr("Password must be confirm");
      return;
    }else if(!phone_number){
      setErr("Enter phone number");
      return;
    }else if(!birthday){
      setErr("Enter date of birthday");
      return;
    }else if(!selectedCountry){
      setErr("Select country");
      return;
    }else if(!selectedCity){
      setErr("Select city");
      return;
    } else{
      setErr("");
    }
    const info = {
      full_name,
      password,
      passwordConfirm,

      email,
      phone_number,
      birthday,
      country: selectedCountry!.label,
      city: selectedCity!.label

    };
    console.log(info);
    let res;
    try {
      const data = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }).then(data => res = data);
      ////     res = await data.json();
    } catch (err: any) {
      console.error(err);
    }
    // console.log(res.data);
    // if(res == 'The email field is required.'){
    //   setErr(res);
    // }else {
      setErr("Letter was send on your email");
    // }
    // 
    // setErr(res)
    // // console.log(data);
    // navigate("/api/auth/login");

  }

  // const { register} = useForm({
  //   mode: "onChange"
  // });

  let handleOnChange = (value: any) => {
    setNumber(value);
  };

  let handleOnChangephone = (e: any) => {
    setNumber(e.target.value);
  };

  let countries = [];

  for (let i = 0; i < Country.getAllCountries().length; i++) {
    countries.push({ value: Country.getAllCountries()[i].isoCode, label: Country.getAllCountries()[i].name });
  }

  function handleSelectCountry(selectedOpt: any) {
    setSelectedCountry(selectedOpt);
    if (selectedOpt !== undefined) {
      for (var i = 0; i < City.getCitiesOfCountry(selectedOpt.value)!.length; i++) {
        cities.push({
          value: City.getCitiesOfCountry(selectedOpt.value)![i].name,
          label: City.getCitiesOfCountry(selectedOpt.value)![i].name
        });
      }
    }
  }

  function handleSelectCity(selectedOpt: any) {
    setSelectedCity(selectedOpt);
  }

  return (
    <div className="all">
      <section className="container">
        <header>Registration Form</header>
        <form action="#" className="form">
          <div className="input-box-al">
          <p className="err">{error}</p>
            <p>Full Name</p>
            <input type="text" placeholder="Enter full name" required onChange={(e) => setName(e.target.value)} />
          </div><br />

          <div className="input-box-al">
            <p>Email Address</p>
            <input type="text" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} />
          </div><br />

          <div className="column">
            <div className="input-box-al">
              <p>Password</p>
              <input type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="input-box-al">
              <p>Confirm password</p>
              <input type="password" placeholder="Confirm password" required onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>
          </div><br />

          <div className="column">
            <div className="input-box-an">
              <label>Phone Number</label>

              {/* <PhoneInputGfg onChange={(e:any) => setNumber(state)}/> */}
              <PhoneInput
                placeholder="Enter a Valid Phone Number"
                country={"ua"}
                excludeCountries={["ru"]}
                value={phone_number}
                onChange={handleOnChange}
              />

              <input
                style={{ display: "none" }}
                placeholder="Enter a Valid Phone Number"
                autoCorrect="off"
                id="multipleErrorInput4"
                name="multipleErrorInput4"
                value={phone_number}
                onChange={handleOnChangephone}
              />

            </div>

            <div className="input-box-al">
              <p>Birth Date</p>
              <input type="date" placeholder="Enter birth date" required onChange={(e) => setDirthday(e.target.value)} />
            </div>
          </div><br />
          <div className="input-box-a address">
            <div><label>Address</label>
              </div>
            {/* <input type="text" placeholder="Enter street address" required onChange={(e) => setLogin(e.target.value)}/> */}
            {/* <input type="text" placeholder="Enter street address line 2" required /> */}
            <div className="column">
              <div className="input-box-a">
                <Select
                  isSearchable={true}
                  options={countries}
                  defaultValue={selectedCountry}
                  onChange={handleSelectCountry}
                  // filterOption={createFilter({ ignoreAccents: false })}
                  required
                ></Select>
              </div>
              <div className="input-box-a">
                <Select
                  isSearchable={true}
                  options={cities}
                  defaultValue={selectedCity}
                  onChange={handleSelectCity}
                  // filterOption={createFilter({ ignoreAccents: false })}
                  required
                ></Select>
              </div>

            </div>
          </div>
          <button onClick={sendRegister}>Submit</button>
        </form>

      </section>

    </div>
  );
}

export default Register;
