import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const BrandBox = () => {
   const navigate = useNavigate();
   const { RatingBox: urlRating } = useParams();
   const { category } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   const [Rating, setRating] = useState(urlRating || "");

   const { data, isLoading, error } = useGetProductsQuery({ category });

   const submitHandler = (e) => {
      e.preventDefault();
      setRating(e.target.value);
      if (e.target.value !== "") {
         navigate(`/Rating/${e.target.value}`);
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
               <Form.Label>Rating {Rating}</Form.Label>
               <Form.Control
                  as="select"
                  value={Rating}
                  className="my-2"
                  onChange={(e) => {
                     submitHandler(e);
                  }}
               >
                  <option value="">All</option>

                  {data.products
                     .map((product) => parseInt(product.rating))
                     .filter(
                        (value, index, self) => self.indexOf(value) === index
                     )
                     .sort()
                     .map((rating, index) => (
                        <option key={index} value={rating}>
                           {rating}
                        </option>
                     ))}
               </Form.Control>
            </Form.Group>
         )}
      </>
   );
};

export default BrandBox;
