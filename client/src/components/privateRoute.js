import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

function PrivateRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth);
  const pathname = location.pathname
   useEffect(() => {
     dispatch({ type: "RELOAD" });
     navigate(pathname)
  }, [navigate, dispatch, pathname]);

  let auth = user.authData?.token ? true : false;
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
