import "./PublishForm.scss";
import { useState } from "react";
import "./styleButton.scss";

function PublishForm({setPrice, setPublishDate, setReceive, setSee, setCountTicket}: any)
{
    // const [animate, setAnimate] = useState("");
    // const [price, setPriceTmp] = useState("");
    // const [publichDate, setPublishDateTmp] = useState("");
    // const [countTicket, setCountTicketTmp] = useState("");
    // const [see, setSeeTmp] = useState("");
    // const [receive, setReceiveTmp] = useState("");

    // function handleClickButton() {
    //     setAnimate("animate");
    //     setTimeout(() => {
    //         setAnimate("");
    //     }, 8000);
    //     CreateEvent();
    // }


    return (
        <div className="publish-form">
            <div className="field">
                <div>
                    <div>PRICE</div>
                    <div className="input-box-ab">
                        <input type={"text"} className="input-box-ab" onChange={e => { setPrice(e.target.value) }} placeholder="Price"></input>
                    </div>
                </div> <br/>

                <div>
                    <div>COUNT TICKKET</div>
                    <div className="input-box-ab">
                        <input type={"text"} className="input-box-ab" onChange={e => { setCountTicket(e.target.value) }} placeholder="Price"></input>
                    </div>
                </div> <br/>
                
                <div>
                    <div>PUBLISH DATE</div>
                    <div className="input-box-ab">
                        <input type={"date"} className="input-box-ab" onChange={e => { setPublishDate(e.target.value) }}></input>
                    </div>
                </div> <br/>

                <div>
                    <div>WHERE RECEIVE NOTIFICATIONS</div>
                    <div>
                        <input type={"checkbox"} onChange={e => { setReceive(e.target.value) }}></input>
                        <label>  Mail             </label>   
                        <input type={"checkbox"} onChange={e => { setReceive(e.target.value) }}></input>
                        <label>  SMS             </label>
                        <input type={"checkbox"} onChange={e => { setReceive(e.target.value) }}></input>
                        <label>  Calendar             </label>
                    </div>
                </div> <br/>

                <div>
                    <div>WHO CAN SEE (ALL OR NOT)</div>
                <div>
                <input type={"radio"} name="see" onChange={e => { setSee("1") }}></input>
                <label >ALL                                                              </label>
                <input type={"radio"} name="see"onChange={e => { setSee("2") }}></input>
                <label >NOT</label>
                    </div>
                </div><br/>

                {/* <div className="cr-butt field">

                        <button className={`create-event-button button ${animate}`} onClick={handleClickButton}>Create event</button>

                    </div> */}
                
            </div>
        </div>
    )
}


export default PublishForm