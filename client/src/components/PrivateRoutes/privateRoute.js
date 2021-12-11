import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useLocation } from "react-router-dom";
 
function PrivateRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const location = useLocation()
  let auth = user.authData?.token ? true : false;

  //update the auth state once reload 
   useEffect(() => {
    if(user.authData === null){
      dispatch({ type: "RELOAD" });
     }
  
   }, [location, user, dispatch]);

 
  return auth ? <Outlet /> : <Navigate to="/" state={{path: location.pathname}} />;
}

export default PrivateRoute;
