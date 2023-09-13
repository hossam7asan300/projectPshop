import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
   const { shippingAddress } = useSelector((state) => state.cart);
   const [address, setAddress] = useState(shippingAddress?.address || "");
   const [city, setCity] = useState(shippingAddress?.city || "");
   const [postalCode, setPostalCode] = useState(
      shippingAddress?.postalCode || ""
   );
   const [country, setCountry] = useState(shippingAddress?.country || "");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const submitHandler = (e) => {
      e.preventDefault();
      if (!address || !city || !postalCode || !country)
         return alert("Please fill all the fields");
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate("/payment");
   };

   return (
      <>
         <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
               <Form.Group controlId="address" className="my-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId="city" className="my-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter city"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId="postalCode" className="my-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter postal code"
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId="country" className="my-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter country"
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Button type="submit" variant="primary">
                  Continue
               </Button>
            </Form>
         </FormContainer>
      </>
   );
};
export default ShippingScreen;
