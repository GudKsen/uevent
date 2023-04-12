import { PayPalButtons } from "@paypal/react-paypal-js";
// import React from "react";
// import ReactDOM from "react-dom"

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
export function PayPalPayment() {

    const serverUrl = "http://localhost:8000";

    const createOrder = (data: any) => {
        // Order is created on the server and the order id is returned
        return fetch(`${serverUrl}/create-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "Ticket for event",
                    cost: "4500",
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
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json());
    };

    return (
        <div>
            <PayPalButtons
                createOrder={(data:any) => createOrder(data)}
                onApprove={(data: any) => onApprove(data)}
            />
        </div>
    )
}