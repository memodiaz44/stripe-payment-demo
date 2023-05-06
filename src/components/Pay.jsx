import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Logo from "../images/logo.JPG";
import "../styles/Pay.css";

const Key =
  "pk_test_51N3odWEAjO8uMs3f1qBeYu9iZ4g7FFRssNBrsPM8nzEqmqhrmbLA2UkFrRZyumL57BpT1qJliAc5upYExb2t9C8n00VXARfW73";

const Pay = () => {
  const [stripetoken, setstripeToken] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const ontoken = (token) => {
    setstripeToken(token);
  };

  useEffect(() => {
    const makerequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/payment", {
          tokenId: stripetoken,
          amount: 2000,
        });
        if (res.data.success) {
          setPaymentSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (stripetoken) {
      makerequest();
    }
  }, [stripetoken]);

  return (
    <div className="Pay">
      {paymentSuccess ? (
        <div className="success-prompt">
          <p>Payment successful!</p>
        </div>
      ) : (
        <StripeCheckout
          name="payment"
          image={Logo}
          billingAddress
          shippingAddress
          description="your total is $50"
          amount={5000}
          token={ontoken}
          stripeKey={Key}
        >
          <button className="payment">Payment</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;