import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setPage } from "../slices/filterSlice";
import { useDispatch } from "react-redux";
const Paginate2 = ({ refetch, filterData, NumberD }) => {
   const dispatch = useDispatch();

   const filter = useSelector((state) => state.filter);
   const count = filterData().length;

   const pages = Math.ceil(count / NumberD);
   return (
      pages > 1 && (
         <Pagination>
            {[...Array(pages).keys()].map((x) => (
               <Pagination.Item
                  key={x + 1}
                  active={x + 1 === filter.pageNumber}
                  onClick={(e) => {
                     e.preventDefault();
                     dispatch(setPage({ pageNumber: x + 1 }));
                     refetch();
                  }}
               >
                  {x + 1}
               </Pagination.Item>
            ))}
         </Pagination>
      )
   );
};
export default Paginate2;
