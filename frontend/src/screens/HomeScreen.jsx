import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import CategoryBox from "../components/CategoryBox";
// import CategoryCheckBox from "../components/CategoryCheckBox";
import BrandBox from "../components/BrandBox";
import PriceBox from "../components/PriceBox";
import RatingBox from "../components/RatingBox";
import PriceBox2 from "../components/PriceBox2";

const HomeScreen = () => {
   const { pageNumber, keyword, category, brand, rating, priceFrom, priceTo } =
      useParams();

   const { data, isLoading, error } = useGetProductsQuery({
      keyword,
      pageNumber,
      category,
      brand,
      rating,
      priceFrom,
      priceTo,
   });

   return (
      <>
         {!keyword && !category && !brand && !rating ? (
            <ProductCarousel />
         ) : (
            <Link to="/" className="btn btn-light mb-4">
               Go Back
            </Link>
         )}
         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">
               {error?.data?.message || error.error}
            </Message>
         ) : (
            <>
               <Meta />
               <h1>Latest Products</h1>
               <Row className="">
                  <Col md={3}>
                     <CategoryBox />
                  </Col>
                  <Col md={3}>
                     <BrandBox />
                  </Col>
                  <Col md={3}>
                     <PriceBox />
                  </Col>
                  <Col md={3}>
                     <RatingBox />
                  </Col>
               </Row>
               <Row>
                  {data.products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword ? keyword : ""}
               />
            </>
         )}
      </>
   );
};

export default HomeScreen;
