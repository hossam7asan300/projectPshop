import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";

import { useDispatch } from "react-redux";
import { setFilter } from "../slices/filterSlice";
import { useSelector } from "react-redux";

const BrandBox = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { filter } = useSelector((state) => state.filter);

   const { category, brand } = useParams();

   const { data } = useGetProductsQuery({ category, brand });
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
         setFilter({
            category: category,
            brand: brand,
            rating: e.target.value,
         })
      );

      if (e.target.value > "") {
         if (category > "") {
            if (brand > "") {
               navigate(
                  `/category/${category}/brand/${brand}/rating/${e.target.value}`
               );
            } else {
               navigate(`/category/${category}/rating/${e.target.value}`);
            }
         } else {
            if (brand > "") {
               navigate(`/brand/${brand}/rating/${e.target.value}`);
            } else {
               navigate(`/rating/${e.target.value}`);
            }
         }
      } else {
         if (category > "") {
            if (brand > "") {
               navigate(`/category/${category}/brand/${brand}`);
            } else {
               navigate(`/category/${category}`);
            }
         } else {
            if (brand > "") {
               navigate(`/brand/${brand}`);
            } else {
               navigate(`/`);
            }
         }
      }
   };

   return (
      <Form.Group controlId="Brand">
         <Form.Label>Rating {filter.rating}</Form.Label>
         <Form.Control
            as="select"
            value={filter.rating}
            className="my-2"
            onChange={(e) => {
               submitHandler(e);
            }}
         >
            <option value="">All</option>

            {data.products
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
