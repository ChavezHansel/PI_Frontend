import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Login from "../pages/auth/Login";
import NotFound from "../pages/errors/NotFound";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
            </Route>

            <Route path="protected" element={<ProtectedLayout />}></Route>

            <Route
                path="*"
                element={
                    <div className="flex items-center justify-center h-screen mx-auto w-full max-w-[1200px] p-2 md:p-6 ">
                        <NotFound resource="pagina" />
                    </div>
                }
            />
        </Routes>
    );
};

export default Router;
