import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCategory, setKeywords } from "../slices/filterSlice";
import { useDispatch } from "react-redux";
import {
   setBrand,
   setRating,
   setPage,
   setPriceFrom,
   setPriceTo,
} from "../slices/filterSlice";

const CategoryBox = ({ data, refetch }) => {
   const dispatch = useDispatch();
   const filter = useSelector((state) => state.filter);

   return (
      <Form.Group controlId="category">
         <Form.Label>Category</Form.Label>
         <Form.Control
            as="select"
            value={filter.category}
            className="my-2"
            onChange={(e) => {
               dispatch(
                  setPage({
                     pageNumber: 1,
                  })
               );
               dispatch(
                  setCategory({
                     category: e.target.value,
                  })
               );
               dispatch(
                  setBrand({
                     brand: "",
                  })
               );
               dispatch(
                  setRating({
                     rating: "",
                  })
               );
               dispatch(
                  setKeywords({
                     keywords: "",
                  })
               );
               dispatch(
                  setPriceFrom({
                     priceFrom: "",
                  })
               );
               dispatch(
                  setPriceTo({
                     priceTo: "",
                  })
               );
               refetch();
            }}
         >
            <option value="">All</option>
            {data.products
               .map((product) => product.category)
               .filter((value, index, self) => self.indexOf(value) === index)
               .map((category, index) => (
                  <option key={index} value={category}>
                     {category}
                  </option>
               ))}
         </Form.Control>
      </Form.Group>
   );
};

export default CategoryBox;
