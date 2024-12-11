import { useUserContext } from "../../hooks/useUserContext";
import { FaBoxOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";

const NavBarAdmin: React.FC = () => {
    const { showRighNav } = useUserContext();
    const location = useLocation();

    const isActive = (route: string) =>
        location.pathname.split("/")[2] === route;

    return (
        <div
            className={`min-w-64 absolute pe-6 lg:static min-h-full border-t border-t-primary-400 text-blue-200 bg-primary-600 duration-300 top-0 right-0  z-40 transition-all ease-in-out flex-col ${
                !showRighNav && "hidden lg:flex absolute pr-10"
            }`}
        >
            <p className="ps-4 font-semibold my-4 text-white">Navegación</p>
            <div className="space-y-2">
                {/* <Link
                    to={"dashboard"}
                    className={`h-12 py-2 flex gap-2 px-4 ps-5 items-center font-semibold rounded-e-full cursor-pointer relative ${
                        isActive("dashboard")
                            ? "bg-blue-800 text-white before:content-[''] before:left-0 before:absolute before:h-12 before:w-1 before:bg-deep-orange-400"
                            : "hover:bg-blue-700 hover:text-white"
                    }`}
                >
                    <MdOutlineSpeed className="p-1.5 text-cyan-400 rounded-full bg-blue-900 h-8 w-8" />
                    <span>Dashboard</span>
                </Link>*/}
                <Link
                    to={"categories"}
                    className={`h-12 py-2 flex gap-2 px-4 ps-5 items-center font-semibold rounded-e-full cursor-pointer relative ${
                        isActive("categories")
                            ? "bg-blue-800 text-white before:content-[''] before:left-0 before:absolute before:h-12 before:w-1 before:bg-deep-orange-400"
                            : "hover:bg-blue-700 hover:text-white"
                    }`}
                >
                    <BiSolidCategoryAlt className="p-1.5 text-yellow-300 rounded-full bg-blue-900 h-8 w-8" />
                    <span>Categorias</span>
                </Link>

                <Link
                    to={"products"}
                    className={`h-12 py-2 flex gap-2 px-4 ps-5 items-center font-semibold rounded-e-full cursor-pointer relative ${
                        isActive("products")
                            ? "bg-blue-800 text-white before:content-[''] before:left-0 before:absolute before:h-12 before:w-1 before:bg-deep-orange-400"
                            : "hover:bg-blue-700 hover:text-white"
                    }`}
                >
                    <FaBoxOpen className="p-1.5 text-green-400 rounded-full bg-blue-900 h-8 w-8" />
                    <span>Productos</span>
                </Link>
            </div>
        </div>
    );
};

export default NavBarAdmin;
