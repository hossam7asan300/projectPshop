import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/filterSlice";
import { useSelector } from "react-redux";

const BrandBox = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { filter } = useSelector((state) => state.filter);

   const { category } = useParams();

   const { data } = useGetProductsQuery({ category });
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
         setFilter({ category: category, brand: e.target.value, rating: "" })
      );
      if (e.target.value !== "") {
         if (category > "") {
            navigate(`/category/${category}/brand/${e.target.value}`);
         } else {
            navigate(`/brand/${e.target.value}`);
         }
      } else {
         if (category > "") {
            navigate(`/category/${category}`);
         } else {
            navigate(`/`);
         }
      }
   };

   return (
      <Form.Group controlId="Brand">
         <Form.Label>Brand {filter.brand}</Form.Label>
         <Form.Control
            as="select"
            value={filter.brand}
            className="my-2"
            onChange={(e) => {
               submitHandler(e);
            }}
         >
            <option value="">All</option>
            {data.products
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
