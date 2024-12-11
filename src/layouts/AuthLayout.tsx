import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const AuthLayout: React.FC = () => {
    const {user} = useUserContext();
    if(user){
        return <Navigate to={'/'}/>
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
