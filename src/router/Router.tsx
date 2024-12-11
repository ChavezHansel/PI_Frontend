import { Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import SignIn from "../pages/auth/SignIn";
import NotFound from "../pages/errors/NotFound";
import Profile from "../pages/private/ProfileCustomer";
import Contact from "../pages/public/Contact";
import AboutUs from "../pages/public/AboutUs";
import Products from "../pages/public/Products";
import Cart from "../pages/public/Cart";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import Dashboard from "../pages/private/Dashboard";
import Users from "../pages/private/categories/Categories";
import ProductsProtected from "../pages/private/products/Products";
import EditProduct from "../pages/private/products/EditProduct";
import CreateProduct from "../pages/private/products/CreateProduct";
import DeleteProduct from "../pages/private/products/DeleteProduct";
import DetailsProduct from "../pages/private/products/DetailsProduct";
import ProductDetails from "../pages/public/ProductDetails";
import Categories from "../pages/private/categories/Categories";
import EditCategory from "../pages/private/categories/EditCategory";
import CreateCategory from "../pages/private/categories/CreateCategory";
import DeleteCategory from "../pages/private/categories/DeleteCategory";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Outlet />}>
                    <Route index element={<Products />} />
                    <Route path=":id" element={<ProductDetails />} />
                </Route>
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
            </Route>

            <Route path="auth" element={<AuthLayout />}>
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="new-password/:token" element={<NewPassword />} />
            </Route>

            <Route path="protected" element={<ProtectedLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="categories" element={<Outlet />}>
                    <Route index element={<Categories />} />
                    <Route path="edit/:id" element={<EditCategory />} />
                    <Route path="create" element={<CreateCategory />} />
                    <Route path="delete/:id" element={<DeleteCategory />} />
                    <Route path="view/:id" element={<Users />} />
                </Route>
                <Route path="products" element={<Outlet />}>
                    <Route index element={<ProductsProtected />} />
                    <Route path=":id" element={<DetailsProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="delete/:id" element={<DeleteProduct />} />
                </Route>
            </Route>
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
