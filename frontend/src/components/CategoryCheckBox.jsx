import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const CategoryCheckBox = () => {
   const navigate = useNavigate();
   const { Category: urlCategory } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   const [category, setCategory] = useState(urlCategory || "");

   const { data, isLoading, error } = useGetProductsQuery({});

   const submitHandler = (e) => {
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
            <Form.Group controlId="category">
               <Form.Label>Category {category}</Form.Label>
               <Form.Check
                  type="radio"
                  name="category"
                  label="All"
                  value=""
                  defaultChecked
                  onChange={(e) => {
                     submitHandler(e);
                  }}
               ></Form.Check>
               {data.products
                  .map((product) => product.category)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((category, index) => (
                     <Form.Check
                        key={index}
                        type="radio"
                        name="category"
                        label={category}
                        value={category}
                        onChange={(e) => {
                           submitHandler(e);
                        }}
                     ></Form.Check>
                  ))}
            </Form.Group>
         )}
      </>
   );
};

export default CategoryCheckBox;
