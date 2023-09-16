import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/filterSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useEffect } from "react";

const PriceBox2 = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { filter } = useSelector((state) => state.filter);
   const { category, brand, rating } = useParams();
   const { data } = useGetProductsQuery({ category, brand, rating });
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

   // useEffect(() => {
   //    dispatch(
   //       setFilter({
   //          category: category,
   //          brand: brand,
   //          rating: rating,
   //          priceFrom: min,
   //          priceTo: max,
   //       })
   //    );

   // }, [dispatch, category, brand, rating, min, max]);

   const submitMinHandler = (value) => {
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: rating,
            priceFrom: value,
            priceTo: max,
         })
      );
      if (value > min && value < max) {
         navigate(`priceFrom/${value}/priceTo/${max}`);
      }
   };
   const submitMaxHandler = (value) => {
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: rating,
            priceFrom: min,
            priceTo: value,
         })
      );
      if (value > min && value < max) {
         navigate(`priceFrom/${min}/priceTo/${value}`);
      }
   };

   return (
      <div>
         <div>PriceBox2</div>
         <div>
            <div>
               <label>Price From</label>
               <input
                  type="number"
                  value={filter.priceFrom}
                  onChange={(e) => {
                     submitMinHandler(e.target.value);
                  }}
               />
            </div>
            <div>
               <label>Price To</label>
               <input
                  type="number"
                  value={filter.priceTo}
                  onChange={(e) => {
                     submitMaxHandler(e.target.value);
                  }}
               />
            </div>
         </div>
      </div>
   );
};
export default PriceBox2;
