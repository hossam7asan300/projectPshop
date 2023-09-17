import { Form, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { setKeyword } from "../slices/filterSlice";

const SearchBox = () => {
   // const dispatch = useDispatch();

   // const { filter } = useSelector((state) => state.filter);

   // const { keyword: urlKeyword } = useParams();

   // FIX: uncontrolled input - urlKeyword may be undefined
   // const [keywords] = useState(urlKeyword || "");

   const submitHandler = (e) => {
      // dispatch(setKeyword({ keyword: e.target.value }));
   };

   return (
      <Form onSubmit={submitHandler} className="d-flex">
         <Form.Control
            type="text"
            name="q"
            // value={filter.keyKey}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
         ></Form.Control>
         <Button type="submit" variant="outline-success" className="p-2 mx-2">
            Search
         </Button>
      </Form>
   );
};

export default SearchBox;
