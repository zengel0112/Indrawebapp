import { Navigate } from "react-router-dom";
import { isAdmin } from "./auth";

const PrivateRoute = ({ children }) => {
    return isAdmin() ? children : <Navigate to="/user" />;
};

export default PrivateRoute;
