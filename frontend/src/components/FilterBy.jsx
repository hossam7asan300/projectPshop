import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSort } from "../slices/filterSlice";

const FilterBy = ({ data, refetch }) => {
   const dispatch = useDispatch();
   const filter = useSelector((state) => state.filter);

   return (
      <Form.Group controlId="filterBy">
         <Form.Label>FilterBy {filter.sort}</Form.Label>
         <Form.Control
            as="select"
            value={filter.sort}
            className="my-2"
            onChange={(e) => {
               dispatch(setSort({ sortBy: e.target.value }));
            }}
         >
            <option value="">All</option>
            <option value="price">Price</option>
            <option value="rating">rating</option>
            <option value="review">review</option>
         </Form.Control>
      </Form.Group>
   );
};

export default FilterBy;
