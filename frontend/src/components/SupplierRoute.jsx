import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SupplierRoute = () => {
   const { userInfo } = useSelector((state) => state.auth);
   return userInfo && userInfo.isSupplier ? (
      <Outlet />
   ) : (
      <Navigate to="/login" replace />
   );
};
export default SupplierRoute;
