import Sidebar2 from "../sidebar/sidebar2"
import Header from "../sidebar/Header"
// import AllEvents from "../Admin/Events/AllEvents"
import "./createpromocodestyle.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

import "./style.scss";

export function EnterPromocode() {

    const [event, setEvent] = useState<any>([]);

    const [prom, setProm] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [endDate, setEndDate] = useState("");
    const [animate, setAnimate] = useState("");
    const navigate = useNavigate();

    // const [prom, setProm] = useState("");
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${id}`, {
          params: { token: localStorage.getItem("token") }
        }).then(async response => {
          await setEvent(response.data[0]);
        });
    
    
      }, [id])

  async function createprom(){
        
    console.log(prom);
    localStorage.removeItem("promocode");

    axios.post("http://localhost:8000/api/available/promocode",{
      token: localStorage.getItem("token"),
        promo: prom,
        id_event: event.Event_ID
      }).then((response) => {
        if(response.data == "Not available"){
          alert("Promocode is not available");
          return ;
        }else{
          console.log(response);
          let cost = response.data;
          localStorage.setItem("promocode", JSON.stringify({ cost}));
          handleClickButton(event.Event_ID);
        }
    });

    


    // navigate("/events-manage");
}


async function createwithoutprom(){

  const nill = 0;
        
  console.log(prom);
  localStorage.removeItem("promocode");
  localStorage.setItem("promocode", JSON.stringify({ nill}));
  handleClickButton(event.Event_ID);

  // axios.post("http://localhost:8000/api/available/promocode",{
      
  // });
  navigate("/events-manage");
}

    // function

    function handleClickButton(id: any) {
        setAnimate("animate");
        setTimeout(() => {
          setAnimate("");
        }, 8000);
        navigate("/pay", {
          state: {
            productId: id
          }
        });
      }
    
      async function handleClickFreeButton(id: any) {
        setAnimate("animate");
        setTimeout(() => {
          setAnimate("");
        }, 8000);
        await axios.post(`http://localhost:8000/api/event/ticket/free/${id}`, id,{
          headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage!.getItem("token")!
          }
      })
      }
    return (
        <div className="prom-panel">
                                <div className="admin-page-prom">
                                    <div className="pro-content">
                                        <div><h1>Enter promo code</h1></div>
                                        <div className="proms-contaner">
                                            <div className="title-create-event-form input-box-a field">
                                                <div>
                                                    <br/><input type="text" className="tit"
                                                    onChange={(e) => {setProm(e.target.value)}} required
                                                    ></input>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" createpro">
                                            <button onClick={createprom} className="button">Submit</button>
                                            <button onClick={createwithoutprom} className="button">Continue</button>

                                        </div>

                                    </div>

                                </div>
                            </div>
    )
}