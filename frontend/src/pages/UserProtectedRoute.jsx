import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            return navigate("/userLogin");
        }
    }, [token])
    
    return children;
};

export default UserProtectedRoute;