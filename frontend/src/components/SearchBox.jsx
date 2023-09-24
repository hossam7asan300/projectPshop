import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setKeywords } from "../slices/filterSlice";
const SearchBox = () => {
   const dispatch = useDispatch();
   const [keyword, setKeyword] = useState("");

   const filter = useSelector((state) => state.filter);
   useEffect(() => {
      setKeyword(filter.keywords);
   }, [filter.keywords]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(setKeywords({ keywords: keyword }));
   };

   return (
      <Form onSubmit={submitHandler} className="d-flex">
         <Form.Control
            type="text"
            name="q"
            value={keyword}
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
