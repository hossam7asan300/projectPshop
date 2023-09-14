import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Col, Row } from "react-bootstrap";

const PriceBox = () => {
   const navigate = useNavigate();
   const { minPriceBox: urlMinPrice } = useParams();
   const { maxPriceBox: urlMaxPrice } = useParams();
   const { category } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined

   const { data, isLoading, error } = useGetProductsQuery({ category });
   const min = Math.min(...data.products.map((product) => product.price));
   const max = Math.max(...data.products.map((product) => product.price));

   const [minPrice, setMinPrice] = useState(urlMinPrice || min);
   const [maxPrice, setMaxPrice] = useState(urlMaxPrice || max);

   useEffect(() => {
      setMinPrice(urlMinPrice || min);
      setMaxPrice(urlMaxPrice || max);
   }, [urlMinPrice, urlMaxPrice, min, max]);
   const submitMinHandler = (e) => {
      e.preventDefault();
      setMinPrice(e.target.value);
      setMaxPrice(e.target.value);
      if (e.target.value !== "") {
         navigate(`/priceFrom/${e.target.value}`);
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
            <Row>
               <Col md={6}>
                  <Form.Group controlId="minPrice">
                     <Form.Label>Price From {minPrice}</Form.Label>

                     <Form.Control
                        type="number"
                        value={minPrice}
                        className="my-2"
                        onChange={(e) => {
                           submitMinHandler(e);
                        }}
                     ></Form.Control>
                  </Form.Group>
               </Col>
               <Col md={6}>
                  <Form.Group controlId="minPrice">
                     <Form.Label>Price To {maxPrice}</Form.Label>

                     <Form.Control
                        type="number"
                        value={maxPrice}
                        className="my-2"
                        onChange={(e) => {
                           submitMinHandler(e);
                        }}
                     ></Form.Control>
                  </Form.Group>
               </Col>
            </Row>
         )}
      </>
   );
};

export default PriceBox;
