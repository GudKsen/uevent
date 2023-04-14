import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalPayment } from "./PayPalPayment";
import { useLocation } from "react-router";

export function PaymentPage() {

    const location = useLocation();
    let productId = location.state.productId;

    const initialOptions = {
        "client-id": "AdyZ9FjloPxZCc12Y1pwk3G1jx5C3Eocrj7rlJgZuEliKDSbHHU88YcB3Ms3NSZ5qxjQWynAEqfOQRo2",
        currency: "USD",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    return (
        <div>
            <PayPalScriptProvider options={{
                 "client-id":
                 "AdyZ9FjloPxZCc12Y1pwk3G1jx5C3Eocrj7rlJgZuEliKDSbHHU88YcB3Ms3NSZ5qxjQWynAEqfOQRo2", intent:"capture"
                    //  "AZ7rafbRTjWXhdItq2Nir7eJ9bbEjwSuonYri4qqY4UkqxjnnMlxQDhbeZpPXL-CpHmZqbWkjSKaM6L3" 
             }}>
                <PayPalPayment productId = {productId}/>
                {/* <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "1.99",
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions!.order!.capture().then((details) => {
                            const name = details!.payer!.name!.given_name;
                            alert(`Transaction completed by ${name}`);
                        });
                    }}
                /> */}
            </PayPalScriptProvider>

            
        </div>
    )
}