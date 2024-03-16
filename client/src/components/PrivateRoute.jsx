import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />; //Outlet for show children i.e /profile from App.jsx & Navigate for redirecting to /sign-in page
};

export default PrivateRoute;
