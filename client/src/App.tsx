import Event from "./components/event/Event";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
// import dotenv from "dotenv";
// dotenv.config();

// const stripePromise = loadStripe("pk_test_51MucFtAF8QTFWMGcLkImYIWIayttWfXQp1w9EQ7leIc9nz8l10ObMTJpU9gbi52ShrBmiLBI4qigRyfjnflmdaoD00oY5jDt82");
// console.log("🚀 ~ file: App.tsx:6 ~ process:", process.env.STRIPE_PUBLISHABLE_KEY)

function App() {
  return (
    <div className="App">
      {/* <Elements stripe={stripePromise}> */}
        <Event />
      {/* </Elements> */}
    </div>
  );
}

export default App;
