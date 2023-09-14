import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const CategoryBox = () => {
   const navigate = useNavigate();
   const { Category: urlCategory } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   const [category, setCategory] = useState(urlCategory || "");

   const { data, isLoading, error } = useGetProductsQuery({});

   const submitHandler = (e) => {
      e.preventDefault();
      setCategory(e.target.value);
      if (e.target.value !== "") {
         navigate(`/category/${e.target.value}`);
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
            //Select Category Box - START
            <Form.Group controlId="category">
               <Form.Label>Category {category}</Form.Label>
               <Form.Control
                  as="select"
                  value={category}
                  className="my-2"
                  onChange={(e) => {
                     submitHandler(e);
                  }}
               >
                  <option value="">All</option>
                  {data.products
                     .map((product) => product.category)
                     .filter(
                        (value, index, self) => self.indexOf(value) === index
                     )
                     .map((category, index) => (
                        <option key={index} value={category}>
                           {category}
                        </option>
                     ))}
               </Form.Control>
            </Form.Group>
         )}
      </>
   );
};

export default CategoryBox;
