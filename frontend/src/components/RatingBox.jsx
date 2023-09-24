import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setRating, setPage, setKeywords } from "../slices/filterSlice";
import { useSelector } from "react-redux";

const BrandBox = ({ data }) => {
   const dispatch = useDispatch();
   const filter = useSelector((state) => state.filter);
   const filterData = () => {
      if (filter.category === "" && filter.brand === "") return data.products;
      else if (filter.category !== "" && filter.brand === "")
         return data.products.filter(
            (product) => product.category === filter.category
         );
      else if (filter.category === "" && filter.brand !== "")
         return data.products.filter(
            (product) => product.brand === filter.brand
         );
      else
         return data.products
            .filter((product) => product.category === filter.category)
            .filter((product) => product.brand === filter.brand);
   };
   return (
      <Form.Group controlId="Brand">
         <Form.Label>Rating </Form.Label>
         <Form.Control
            as="select"
            value={filter.rating}
            className="my-2"
            onChange={(e) => {
               dispatch(setRating({ rating: e.target.value }));
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

            {filterData()
               .map((product) => parseInt(product.rating))
               .filter((value, index, self) => self.indexOf(value) === index)
               .sort()
               .map((rating, index) => (
                  <option key={index} value={rating}>
                     {rating}
                  </option>
               ))}
         </Form.Control>
      </Form.Group>
   );
};

export default BrandBox;
