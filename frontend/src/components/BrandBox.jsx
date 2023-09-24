import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
   setBrand,
   setRating,
   setPage,
   setKeywords,
} from "../slices/filterSlice";
import { useSelector } from "react-redux";

const BrandBox = ({ data }) => {
   const dispatch = useDispatch();
   const filter = useSelector((state) => state.filter);

   const filterCatData = () => {
      if (filter.category === "") return data.products;
      else
         return data.products.filter(
            (product) => product.category === filter.category
         );
   };
   return (
      <Form.Group controlId="Brand">
         <Form.Label>Brand</Form.Label>
         <Form.Control
            as="select"
            value={filter.brand}
            className="my-2"
            onChange={(e) => {
               dispatch(setBrand({ brand: e.target.value }));
               dispatch(
                  setRating({
                     rating: "",
                  })
               );
               dispatch(
                  setPage({
                     pageNumber: 1,
                  })
               );
               dispatch(
                  setKeywords({
                     keywords: "",
                  })
               );
            }}
         >
            <option value="">All</option>
            {filterCatData()
               .map((product) => product.brand)
               .filter((value, index, self) => self.indexOf(value) === index)
               .map((brand, index) => (
                  <option key={index} value={brand}>
                     {brand}
                  </option>
               ))}
         </Form.Control>
      </Form.Group>
   );
};

export default BrandBox;
