import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom"

function PrivateRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const location = useLocation()
  const navigate = useNavigate()
  let auth = user.authData?.token ? true : false;


  //update the auth state once reload 
   useEffect(() => {
     if(user.authData === null){
       dispatch({ type: "RELOAD" });
      }
   }, [user, dispatch, navigate]);

 
  return auth ? <Outlet /> : <Navigate to="/" state={{path: location.pathname}} />;
}

export default PrivateRoute;
