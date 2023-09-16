import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/filterSlice";
import { useEffect } from "react";

const PriceBox = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // const { category, brand, rating } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined

   const { category, rating, brand } = useParams();

   const { data, isLoading, error } = useGetProductsQuery({ category });
   const min = Math.min(...data.products.map((product) => product.price));
   const max = Math.max(...data.products.map((product) => product.price));

   useEffect(() => {
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: rating,
            priceFrom: min,
            priceTo: max,
         })
      );
   }, [dispatch, category, brand, rating, min, max]);
   const submitMinHandler = (e) => {
      e.preventDefault();
      navigate("/");
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: rating,
            priceFrom: e.target.value,
            priceTo: max,
         })
      );
      if (e.target.value > min && e.target.value < max) {
         navigate(`priceFrom/${e.target.value}/priceTo/${max}`);
      }
   };
   const submitMaxHandler = (e) => {
      e.preventDefault();
      navigate("/");
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: rating,
            priceFrom: min,
            priceTo: e.target.value,
         })
      );
      if (e.target.value > min && e.target.value < max) {
         navigate(`priceFrom/${min}/priceTo/${e.target.value}`);
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
                     <Form.Label>Price From {min}</Form.Label>
                     <Form.Control
                        type="number"
                        value={min}
                        className="my-2"
                        onChange={(e) => {
                           submitMinHandler(e);
                        }}
                     ></Form.Control>
                  </Form.Group>
               </Col>
               <Col md={6}>
                  <Form.Group controlId="minPrice">
                     <Form.Label>Price To {max}</Form.Label>

                     <Form.Control
                        type="number"
                        value={max}
                        className="my-2"
                        onChange={(e) => {
                           submitMaxHandler(e);
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
