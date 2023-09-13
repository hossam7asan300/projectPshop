import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useSelector } from "react-redux";
const PaymentScreen = () => {
   const [paymentMethod, setPaymentMethod] = useState("PayPal");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { shippingAddress } = useSelector((state) => state.cart);

   useEffect(() => {
      if (!shippingAddress) {
         navigate("/shipping");
      }
   }, [shippingAddress, navigate]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeOrder");
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h1>Payment Method</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as="legend">Select Method</Form.Label>
               <Col>
                  <Form.Check
                     type="radio"
                     className="my-2"
                     label="PayPal or Credit Card"
                     id="PayPal"
                     name="paymentMethod"
                     value="PayPal"
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                     type="radio"
                     className="my-2"
                     label="Stripe"
                     id="Stripe"
                     name="paymentMethod"
                     value="Stripe"
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
               </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
               Continue
            </Button>
         </Form>
      </FormContainer>
   );
};
export default PaymentScreen;
