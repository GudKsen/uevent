import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../sidebar/Header";
import Sidebar2 from "../sidebar/sidebar2";

import "./style.scss"

async function ConvertPriceToUSD(to: any, from: any, amount: any, setPrice: any) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Bx9Zhw56PPzWqj1GVTBsQRbER9KHoPwo");
    let value;

    var requestOptions: any = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        .then(async response => {
            // console.log(await response.text());
            let price = JSON.parse(await response.text());
            console.log(price.result);
            await setPrice(price.result);
            value = price.result;
            return await price.result;
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    console.log(value);
    return value;
}

export function PayPalPayment(productId: any) {
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>([]);
    const [price, setPrice] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${productId.productId}`, {
            params: { token: localStorage.getItem("token") }
        }).then(response => {
            setEvent(response.data[0]);
            console.log(response.data[0]);
        });
    }, [productId])

    const serverUrl = "http://localhost:8000";

    const createOrder = async (data: any) => {
        // Order is created on the server and the order id is returned
        let price_value;
        if (event.price[0].currency !== "USD") {
            let pr: number = await ConvertPriceToUSD("USD", event.price[0].currency, event.price[0].price_value, setPrice) ?? 0;

            if (pr !== undefined) {
                price_value = Number(pr.toFixed(2));
            }
        }
        else {
            price_value = event.price[0].price_value;
        }


        return await fetch(`${serverUrl}/create-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage!.getItem("token")!
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: event.description,
                    cost: price_value,
                    currency: "USD"
                }
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data: any) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch(`${serverUrl}/capture-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage!.getItem("token")!
            },
            body: JSON.stringify({
                orderID: data.orderID,
                productId: productId
            })
        })
            .then((response) => {
                console.log("Successfully")
                navigate('/thankyou');
                response.json()
            });
    };

    return (

        <div className="thankyou-page">
            <Sidebar2 />
            <div className="pageall">
                <div className="head">
                    <Header /></div>
                <div className="paypal-buttons-container">
                    <PayPalButtons
                        className="paypal-buttons"
                        createOrder={(data: any) => createOrder(data)}
                        onApprove={(data: any) => onApprove(data)}
                    />
                </div>
            </div>

        </div>
        // <div className="paypal-payment-page">
        //     <div className="head"><Header /></div>
        //     <div className="paypal-buttons-container">
        //         <PayPalButtons
        //             className="paypal-buttons"
        //             createOrder={(data: any) => createOrder(data)}
        //             onApprove={(data: any) => onApprove(data)}
        //         />
        //     </div>
        // </div>
    )
}