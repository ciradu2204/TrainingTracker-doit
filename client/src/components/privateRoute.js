import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const user = useSelector((state) => state.auth);
   let auth = (user.authData?.token)? true: false;
    return auth ? (
        <Outlet />
    ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
