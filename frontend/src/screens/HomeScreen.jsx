import { Row, Col, Button } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productsApiSlice";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate2 from "../components/Paginate2";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import PriceBox from "../components/PriceBox";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../slices/filterSlice";
import { useEffect } from "react";
import CategoryBox from "../components/CategoryBox";
import BrandBox from "../components/BrandBox";
import RatingBox from "../components/RatingBox";
// import FilterBy from "../components/FilterBy";

// import PriceTest from "../components/PriceTest";

const HomeScreen = () => {
   const dispatch = useDispatch();

   const { data, refetch, isLoading, error } = useGetProductsQuery({});

   useEffect(() => {
      dispatch(clearFilter());
   }, [dispatch]);

   const filter = useSelector((state) => state.filter);
   const NumberD = 8;
   const fP = () => {
      return filter.pageNumber * NumberD - NumberD;
   };

   const lP = () => {
      return filter.pageNumber * NumberD;
   };

   const filterD1 = () => {
      const temp = data.products;

      if (filter.category === "" && filter.brand === "" && filter.rating === "")
         return temp;
      else if (
         filter.category !== "" &&
         filter.brand === "" &&
         filter.rating === ""
      )
         return temp.filter((product) => product.category === filter.category);
      else if (
         filter.category === "" &&
         filter.brand !== "" &&
         filter.rating === ""
      )
         return temp.filter((product) => product.brand === filter.brand);
      else if (
         filter.category === "" &&
         filter.brand === "" &&
         filter.rating !== ""
      )
         return temp.filter((product) => product.rating >= filter.rating);
      else if (
         filter.category !== "" &&
         filter.brand !== "" &&
         filter.rating === ""
      )
         return temp
            .filter((product) => product.category === filter.category)
            .filter((product) => product.brand === filter.brand);
      else if (
         filter.category !== "" &&
         filter.brand === "" &&
         filter.rating !== ""
      )
         return temp
            .filter((product) => product.category === filter.category)
            .filter((product) => product.rating >= filter.rating);
      else if (
         filter.category === "" &&
         filter.brand !== "" &&
         filter.rating !== ""
      )
         return temp
            .filter((product) => product.brand === filter.brand)
            .filter((product) => product.rating >= filter.rating);
      else if (
         filter.category !== "" &&
         filter.brand !== "" &&
         filter.rating !== ""
      )
         return temp
            .filter((product) => product.category === filter.category)
            .filter((product) => product.brand === filter.brand)
            .filter((product) => product.rating >= filter.rating);
   };

   // const filterD2 = () => {
   //    const temp = filterD2();
   //    if (filter.priceFrom === 0 && filter.priceTo === 0) return temp;
   //    else if (filter.priceFrom !== 0 && filter.priceTo === 0)
   //       return temp.filter((product) => product.price >= filter.priceFrom);
   //    else if (filter.priceFrom === 0 && filter.priceTo !== 0)
   //       return temp.filter((product) => product.price <= filter.priceTo);
   //    else if (filter.priceFrom !== 0 && filter.priceTo !== 0)
   //       return temp
   //          .filter((product) => product.price >= filter.priceFrom)
   //          .filter((product) => product.price <= filter.priceTo);
   // };

   const filterData = () => {
      const temp = filterD1();
      if (filter.keywords === "") return temp;
      else
         return temp.filter((product) =>
            // product.name.toLowerCase().includes(filter.keyword.toLowerCase())
            product.name.toLowerCase().includes(filter.keywords.toLowerCase())
         );
   };

   return (
      <>
         {!filter.keywords &&
         !filter.category &&
         !filter.brand &&
         !filter.rating ? (
            <ProductCarousel />
         ) : (
            <Button
               onClick={() => dispatch(clearFilter())}
               className="btn btn-light"
            >
               Clear Filter
            </Button>
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
               <h1>Products</h1>
               <Row>
                  <Col md={3}>
                     <CategoryBox data={data} refetch={refetch} />
                  </Col>
                  <Col md={3}>
                     <BrandBox data={data} refetch={refetch} />
                  </Col>

                  <Col md={3}>
                     <PriceBox refetch={refetch} filterData={filterData} />
                  </Col>
                  <Col md={3}>
                     <RatingBox data={data} refetch={refetch} />
                  </Col>
               </Row>

               <Row>
                  <h1>Products </h1>
                  {filterData()
                     .slice(fP(), lP())
                     .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                           <Product product={product} />
                        </Col>
                     ))}
               </Row>

               <Paginate2
                  data={data}
                  refetch={refetch}
                  filterData={filterData}
                  NumberD={NumberD}
               />
            </>
         )}
      </>
   );
};

export default HomeScreen;
