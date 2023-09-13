import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
   Form,
   Row,
   Col,
   Image,
   ListGroup,
   Card,
   Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
   useGetProductDetailsQuery,
   useCreateReviewMutation,
   // useUpdateProductQtyMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";

const ProductScreen = () => {
   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const { id: productId } = useParams();
   const {
      data: product,
      isLoading,
      refetch,
      isError,
   } = useGetProductDetailsQuery(productId);

   const [createReview, { isLoading: loadingProductReview }] =
      useCreateReviewMutation();

   const { userInfo } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const addToCartHandler = async (e) => {
   //    e.preventDefault();
   //    try {
   //       await updateProductQty({
   //          productId,
   //          qty,
   //       });
   //       refetch();
   //       dispatch(addToCart({ ...product, qty: Number(qty) }));
   //       navigate("/cart");
   //       toast.success("updateProductQty");
   //    } catch (err) {
   //       toast.error(err?.data?.message || err.error);
   //    }
   // };
   const addToCartHandler = () => {
      dispatch(addToCart({ ...product, qty: Number(qty) }));
      navigate("/cart");
   };
   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         await createReview({ productId, rating, comment }).unwrap();
         refetch();
         toast.success("Review Added");
         setRating(0);
         setComment("");
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
   };
   return (
      <>
         {isLoading ? (
            <Loader />
         ) : isError ? (
            <Message variant="danger">
               {isError?.data?.message || isError?.error}
            </Message>
         ) : (
            <>
               <Meta title={product.name} />
               <h1>Product Screen</h1>
               <Link className="btn btn-light my-3" to="/">
                  Go Back
               </Link>
               <Row>
                  <Col md={5}>
                     <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col md={4}>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                           Description: {product.description}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col md={3}>
                     <Card>
                        <ListGroup variant="flush">
                           <ListGroup.Item>
                              <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                    <strong>${product.price}</strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Status:</Col>
                                 <Col>
                                    {product.countInStock > 0
                                       ? "In Stock"
                                       : "Out Of Stock"}
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       value={qty}
                                       onChange={(e) => setQty(e.target.value)}
                                    >
                                       {[
                                          ...Array(product.countInStock).keys(),
                                       ].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Button
                                 className="btn-block"
                                 type="button"
                                 disabled={product.countInStock === 0}
                                 onClick={addToCartHandler}
                              >
                                 Add To Cart
                              </Button>
                           </ListGroup.Item>
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
               <Row className="review">
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                     <Message>No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                     {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                           <strong>{review.name}</strong>
                           <Rating value={review.rating} />
                           <p>{review.createdAt.substring(0, 10)}</p>
                           <p>{review.comment}</p>
                        </ListGroup.Item>
                     ))}
                     <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {loadingProductReview && <Loader />}
                        {userInfo ? (
                           <Form onSubmit={submitHandler}>
                              <Form.Group controlId="rating">
                                 <Form.Label>Rating</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                 >
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                 </Form.Control>
                              </Form.Group>
                              <Form.Group controlId="comment" className="my-2">
                                 <Form.Label>Comment</Form.Label>
                                 <Form.Control
                                    as="textarea"
                                    row="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                 ></Form.Control>
                              </Form.Group>
                              <Button
                                 disabled={loadingProductReview}
                                 type="submit"
                                 variant="primary"
                              >
                                 Submit
                              </Button>
                           </Form>
                        ) : (
                           <Message>
                              Please <Link to="/login">sign in</Link> to write a
                              review{" "}
                           </Message>
                        )}
                     </ListGroup.Item>
                  </ListGroup>
               </Row>
            </>
         )}
      </>
   );
};
export default ProductScreen;