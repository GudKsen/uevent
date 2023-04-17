import { useState } from "react";
import SelectFormat from "./SelectFormat";
import SelectTheme from "./SelectTheme";
import "./styleButton.scss";
import "../filter.scss"
import SelectPromocode from "./SelectPromocode";

function FormSecond({setSelectedThemes, setSelectedFormat, setSelectedPromocode, CreateEvent}: any) {
    const [animate, setAnimate] = useState("");
    const [addPromo, setAddPromo] = useState("");
    const [promocode, setPromocode] = useState("");
    const [promoAdded, setPromoAdded] = useState("");
    const [promoAddedText, setPromoAddedText] = useState("+ Promocode");

    // function handleClickButton() {
    //     setAnimate("animate");
    //     setTimeout(() => {
    //         setAnimate("");
    //     }, 8000);
    //     CreateEvent();
    // }

    function handlePromoAdd()
    {
        if (addPromo === "addPromo") {
            if (promocode.length)
            {
                if (promoAdded === ""){
                    setPromoAdded("promoAdded");
                    setPromoAddedText("Added!");
                }
                else {
                    setPromoAdded("");
                    setPromoAddedText("+ Promocode");
                }
            }
            else {
                setAddPromo("");
                setPromoAdded("");
            }
        }
        else {
            setAddPromo("addPromo");
            
        }
    }


    return (
        <div className="create-form2">
            <div className="create-form2-content">
                <div className="form2-grid">
                    <div>
                        <div className="themes field">
                            <div className="theme-title theme">
                                <div className="ogoloshen"><p>THEMES</p></div>
                            </div>
                            <div className="select-themes-create">
                                <SelectTheme setSelectedThemes={setSelectedThemes}/>
                            </div>
                        </div>

                        <div className="format field">
                            <div  className="ogoloshen"><p>FORMAT</p></div>
                            <div>
                                <SelectFormat setSelectedFormat={setSelectedFormat}/>
                            </div>
                        </div>

                        <div className="format field">
                            {/* <input type="text" placeholder="Enter promocode..." className={`promo-input ${addPromo}`}
                            onChange={(e) => {setPromocode(e.target.value)}}
                            ></input>
                            <button className={`add-promocode ${promoAdded}`} onClick={handlePromoAdd}>{promoAddedText}</button> */}
                            <div  className="ogoloshen"><p>PROMOCODE</p></div>
                            <div>
                                <SelectPromocode setSelectedPromocode={setSelectedPromocode}/>
                            </div>
                        </div>
                    </div>

                    {/* <div className="cr-butt field">

                        <button className={`create-event-button button ${animate}`} onClick={handleClickButton}>Create event</button>

                    </div> */}

                </div>



            </div>

        </div>
    )
}

export default FormSecond;