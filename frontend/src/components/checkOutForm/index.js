import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./CheckOut.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
export default function CheckOut({setDone,price}) {
  
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": localStorage.getItem("token") },
      body: JSON.stringify({ price: price}),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      }
        );
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={price} setDone={setDone}/>
        </Elements>
      )}
    </div>
  );
}