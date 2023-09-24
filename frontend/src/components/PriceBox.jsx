import { Form, Row, Col } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { setPriceFrom, setPriceTo } from "../slices/filterSlice";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
import { useState } from "react";

const PriceBox = ({ filterData }) => {
   // const dispatch = useDispatch();
   // const filter = useSelector((state) => state.filter);
   const min = Math.min(...filterData().map((product) => product.price));
   const max = Math.max(...filterData().map((product) => product.price));
   const [pFrom, setPFrom] = useState("");
   const [pTo, setPTo] = useState("");

   // useEffect(() => {
   //    dispatch(
   //       setPriceFrom({
   //          priceFrom: "",
   //       })
   //    );
   //    dispatch(
   //       setPriceTo({
   //          priceTo: "",
   //       })
   //    );
   // }, [dispatch]);
   // useEffect(() => {
   //    if (filter.priceTo === max)
   //       dispatch(
   //          setPriceTo({
   //             priceTo: max,
   //          })
   //       );
   //    else if (filter.priceTo === 0)
   //       dispatch(
   //          setPriceTo({
   //             priceTo: max,
   //          })
   //       );
   // }, [dispatch, max, filter.priceTo]);

   return (
      <Row>
         <Col md={6}>
            <Form.Group controlId="priceFrom">
               <Form.Label>Price From</Form.Label>
               <Form.Control
                  type="number"
                  placeholder="Enter price from"
                  className="my-2"
                  value={pFrom || min}
                  disabled
                  onChange={(e) => {
                     setPFrom(e.target.value);
                     // dispatch(
                     //    setPriceFrom({
                     //       priceFrom: e.target.value,
                     //    })
                     // );
                  }}
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
                  value={pTo || max}
                  disabled
                  onChange={(e) => {
                     setPTo(e.target.value);
                     // dispatch(
                     //    setPriceTo({
                     //       priceTo: e.target.value,
                     //    })
                     // );
                  }}
               ></Form.Control>
            </Form.Group>
         </Col>
      </Row>
   );
};
export default PriceBox;
