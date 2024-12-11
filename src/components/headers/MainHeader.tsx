import React, { useState } from "react";
import { LuUserRound, LuShoppingCart } from "react-icons/lu";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Badge,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import MaterialButton from "../common/MaterialButton";
import { useUserContext } from "../../hooks/useUserContext";
import { useCart } from "../../hooks/useCart";

const MainHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useUserContext();
    const { logOut } = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (route: string) => location.pathname === route;
    const { cart } = useCart();
    return (
        <header className="bg-primary-600 shadow-lg">
            <div className="max-w-[78rem] 2xl:max-w-[84rem] mx-auto flex items-center justify-between p-4">
                <Link
                    to="/"
                    className="text-3xl font-bold text-white hover:text-primary-300 transition-colors duration-300"
                >
                    Muebles Nova
                </Link>

                <button
                    className="block md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(true)}
                >
                    <IoMdMenu className="text-3xl" />
                </button>

                <nav
                    className={`${
                        isOpen ? "flex bg-primary-700 py-10 px-5" : "hidden"
                    } absolute top-0 z-50 max-w-[20rem] md:py-0 md:bg-transparent md:max-w-max flex-col md:flex-row right-0 h-screen md:h-auto w-full shadow-md md:shadow-none md:static md:w-auto md:flex md:items-center md:gap-6 gap-4`}
                >
                    <button
                        className="block md:hidden absolute right-3 top-3 hover:text-primary-300 text-white transition-all duration-300 ease-in-out focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose className="text-3xl" />
                    </button>

                    <Link
                        to="/"
                        className={`transition-all duration-300 ease-in-out font-semibold block px-4 py-2 md:inline md:p-0 ${
                            isActive("/") ? "text-primary-300" : "text-white/50"
                        } hover:text-white`}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/products"
                        className={`transition-all duration-300 ease-in-out font-semibold block px-4 py-2 md:inline md:p-0 ${
                            isActive("/products")
                                ? "text-primary-300"
                                : "text-white/50"
                        } hover:text-white`}
                    >
                        Productos
                    </Link>
                    <Link
                        to="/about-us"
                        className={`transition-all duration-300 ease-in-out font-semibold block px-4 py-2 md:inline md:p-0 ${
                            isActive("/about-us")
                                ? "text-primary-300"
                                : "text-white/50"
                        } hover:text-white`}
                    >
                        Nosotros
                    </Link>
                    <Link
                        to="/contact"
                        className={`transition-all duration-300 ease-in-out font-semibold block px-4 py-2 md:inline md:p-0 ${
                            isActive("/contact")
                                ? "text-primary-300"
                                : "text-white/50"
                        } hover:text-white`}
                    >
                        Contacto
                    </Link>

                    {user && user._id ? (
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <Button className="flex items-center p-2 bg-transparent shadow-none hover:bg-transparent">
                                    <LuUserRound className="text-white text-2xl cursor-pointer" />
                                </Button>
                            </MenuHandler>
                            <MenuList>
                                {user.role == "admin" && (
                                    <MenuItem
                                        onClick={() =>
                                            navigate("/protected/products")
                                        }
                                    >
                                        Dashboard
                                    </MenuItem>
                                )}
                                <MenuItem onClick={() => navigate("/profile")}>
                                    Perfil
                                </MenuItem>
                                <MenuItem onClick={() => logOut()}>
                                    Cerrar Sesión
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <MaterialButton
                            onClick={() => navigate("/auth/sign-in")}
                            className="text-sm font-medium  text-white px-4 py-2 rounded-lg  transition"
                        >
                            Iniciar Sesión
                        </MaterialButton>
                    )}

                    <Link
                        to={"cart"}
                        className="transition-all duration-300 flex items-center flex-col justify-center ease-in-out font-semibold  px-4 py-2 md:inline md:p-0 text-white/50 hover:text-white"
                    >
                        {cart && cart.length > 0 ? (
                            <Badge content={cart.length}>
                                <LuShoppingCart className="text-white text-2xl flex items-center justify-center" />
                            </Badge>
                        ) : (
                            <Badge content={""} className="hidden">
                                <LuShoppingCart className="text-white text-2xl flex items-center justify-center" />
                            </Badge>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default MainHeader;
