import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; // Importing necessary hooks and components

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // If the current user is there, show the children
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
