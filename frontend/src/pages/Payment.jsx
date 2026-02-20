import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log(paymentMethod);
      alert("Payment Successful (Test Mode)");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Pay ₹500</h2>

      <div style={{ 
        border: "1px solid #555", 
        padding: "12px", 
        borderRadius: "8px", 
        marginBottom: "20px",
        background: "#111"
      }}>
        <CardElement />
      </div>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;