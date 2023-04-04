import { useState } from "react";
import SelectFormat from "./SelectFormat";
import SelectTheme from "./SelectTheme";
import "./styleButton.scss";

function FormSecond({setSelectedThemes, setSelectedFormat, CreateEvent}: any) {
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
                            <div className="theme-title">
                                THEMES
                            </div>
                            <div className="select-themes-create">
                                <SelectTheme setSelectedThemes={setSelectedThemes}/>
                            </div>
                        </div>

                        <div className="format field">
                            <div>FORMAT</div>
                            <div>
                                <SelectFormat setSelectedFormat={setSelectedFormat}/>
                            </div>
                        </div>

                        <div className="container-promocode-add field">
                            <input type="text" placeholder="Enter promocode..." className={`promo-input ${addPromo}`}
                            onChange={(e) => {setPromocode(e.target.value)}}
                            ></input>
                            <button className={`add-promocode ${promoAdded}`} onClick={handlePromoAdd}>{promoAddedText}</button>
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