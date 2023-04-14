import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../sidebar/Header";

import "./style.scss"

export function PayPalPayment(productId: any) {
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${productId.productId}`, {
            params: { token: localStorage.getItem("token") }
        }).then(response => {
            setEvent(response.data[0]);
            console.log(response.data[0]);
        });
    }, [productId])

    const serverUrl = "http://localhost:8000";

    const createOrder = (data: any) => {
        // Order is created on the server and the order id is returned
        return fetch(`${serverUrl}/create-paypal-order`, {
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
                    cost: event.price[0].price_value,
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
        <div className="paypal-payment-page">
            <Header />
            <div className="paypal-buttons-container">
                <PayPalButtons
                    className="paypal-buttons"
                    createOrder={(data: any) => createOrder(data)}
                    onApprove={(data: any) => onApprove(data)}
                />
            </div>
        </div>
    )
}