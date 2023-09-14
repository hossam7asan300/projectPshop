import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { toast } from "react-toastify";

const PriceBox2 = () => {
   const navigate = useNavigate();
   const { PriceBox: urlRating } = useParams();
   const { category } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   const [price, setPrice] = useState(urlRating || "");

   const { data, isLoading, error } = useGetProductsQuery({ category });

   const submitHandler = (e) => {
      e.preventDefault();
      setPrice(e.target.value);
      if (e.target.value !== 0) {
         toast.success("Price Added");
         navigate(`/price/${e.target.value}`);
      } else {
         navigate("/");
      }
   };

   return (
      <>
         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            //Select Brand Box - START
            <Form.Group controlId="Brand">
               <Form.Label>Price 2 {price}</Form.Label>
               <Form.Control
                  as="select"
                  value={price}
                  className="my-2"
                  onChange={(e) => {
                     submitHandler(e);
                  }}
               >
                  <option value="0">All</option>

                  {data.products
                     .map((product) => product.price)
                     .filter(
                        (value, index, self) => self.indexOf(value) === index
                     )
                     .map((price, index) => (
                        <option key={index} value={price}>
                           {price}
                        </option>
                     ))}
               </Form.Control>
            </Form.Group>
         )}
      </>
   );
};

export default PriceBox2;
