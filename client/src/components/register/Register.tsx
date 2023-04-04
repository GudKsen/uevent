import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputGfg from "./PI";
import LogGoogle from "./LogGoogle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

// import { useForm} from "react-hook-form";

// import ReactCountryFlag from "react-country-flag";
import "./regstyle.scss";

interface ILocationOne {
  value: string;
  label: string;
}

function Register() {
  const navigate = useNavigate();
  const [full_name, setName] = useState("");
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
      }).then(data => console.log(data));
      ////     res = await data.json();
    } catch (err) {
      console.error(err);
    }
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
          <div className="input-box-a">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" required onChange={(e) => setName(e.target.value)} />
          </div><br />

          <div className="input-box-a">
            <label>Email Address</label>
            <input type="text" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} />
          </div><br />

          <div className="column">
            <div className="input-box-a">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="input-box-a">
              <label>Confirm password</label>
              <input type="password" placeholder="Confirm password" required onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>
          </div><br />

          <div className="column">
            <div className="input-box-a">
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

            <div className="input-box-a">
              <label>Birth Date</label>
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
                {/* <select>
                  <option hidden>Country</option>
                  <option>America</option>
                  <option>Japan</option>
                  <option>India</option>
                  <option>Nepal</option>
                </select> */}
                <Select
                  isSearchable={true}
                  options={countries}
                  defaultValue={selectedCountry}
                  onChange={handleSelectCountry}
                  required
                ></Select>
              </div>
              <div className="input-box-a">
                {/* <input type="text" placeholder="Enter your city" required onChange={(e) => setCity(e.target.value)} /> */}
                <Select
                  isSearchable={true}
                  options={cities}
                  defaultValue={selectedCity}
                  onChange={handleSelectCity}
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
