import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const BrandBox = () => {
   const navigate = useNavigate();
   const { BrandBox: urlBrand } = useParams();
   const { category } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   const [Brand, setBrand] = useState(urlBrand || "");

   const { data, isLoading, error } = useGetProductsQuery({ category });

   const submitHandler = (e) => {
      e.preventDefault();
      setBrand(e.target.value);
      if (e.target.value !== "") {
         navigate(`/brand/${e.target.value}`);
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
               <Form.Label>Brand {Brand}</Form.Label>
               <Form.Control
                  as="select"
                  value={Brand}
                  className="my-2"
                  onChange={(e) => {
                     submitHandler(e);
                  }}
               >
                  <option value="">All</option>
                  {data.products
                     .map((product) => product.brand)
                     .filter(
                        (value, index, self) => self.indexOf(value) === index
                     )
                     .map((brand, index) => (
                        <option key={index} value={brand}>
                           {brand}
                        </option>
                     ))}
               </Form.Control>
            </Form.Group>
         )}
      </>
   );
};

export default BrandBox;
