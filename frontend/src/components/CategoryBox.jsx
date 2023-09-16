import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/filterSlice";
import { useSelector } from "react-redux";
// import Loader from "./Loader";
// import Message from "./Message";

const CategoryBox = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // const { Category: urlCategory } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   // const [category, setCategory] = useState(urlCategory || "");

   // useEffect(() => {}, [urlCategory]);

   const { filter } = useSelector((state) => state.filter);
   const { data } = useGetProductsQuery({});

   const submitCategoryHandler = (e) => {
      e.preventDefault();
      dispatch(setFilter({ category: e.target.value }));
      if (e.target.value !== "") {
         navigate(`/category/${e.target.value}`);
      } else {
         navigate("/");
      }
   };

   return (
      <Form.Group controlId="category">
         <Form.Label>Category {filter.category}</Form.Label>
         <Form.Control
            as="select"
            value={filter.category}
            className="my-2"
            onChange={(e) => {
               submitCategoryHandler(e);
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
