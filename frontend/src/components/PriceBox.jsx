import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPriceFrom, setPriceTo } from "../slices/filterSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const PriceBox = ({ filterData }) => {
   const dispatch = useDispatch();
   const filter = useSelector((state) => state.filter);
   const min = Math.min(...filterData().map((product) => product.price));
   const max = Math.max(...filterData().map((product) => product.price));

   useEffect(() => {
      if (filter.priceFrom === "")
         dispatch(
            setPriceFrom({
               priceFrom: min,
            })
         );
   }, [dispatch, min, filter.priceFrom]);

   useEffect(() => {
      if (filter.priceTo === "")
         dispatch(
            setPriceTo({
               priceTo: max,
            })
         );
   }, [dispatch, max, filter.priceTo]);

   const submitMinHandler = (value) => {
      dispatch(
         setPriceFrom({
            priceFrom: value,
         })
      );
   };
   const submitMaxHandler = (value) => {
      dispatch(
         setPriceTo({
            priceTo: value,
         })
      );
   };

   return (
      <Row>
         <Col md={6}>
            <Form.Group controlId="priceFrom">
               <Form.Label>Price From</Form.Label>
               <Form.Control
                  type="number"
                  placeholder="Enter price from"
                  className="my-2"
                  value={filter.priceFrom || min}
                  onChange={(e) => submitMinHandler(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Col>
         <Col md={6}>
            <Form.Group controlId="priceTo">
               <Form.Label>Price To</Form.Label>
               <Form.Control
                  type="number"
                  placeholder="Enter price to"
                  className="my-2"
                  value={filter.priceTo || max}
                  onChange={(e) => submitMaxHandler(e.target.value)}
               ></Form.Control>
            </Form.Group>
         </Col>
      </Row>
   );
};
export default PriceBox;
