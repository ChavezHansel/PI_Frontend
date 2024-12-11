import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useUserContext } from "../../hooks/useUserContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const ProtectedHeader: React.FC = () => {
    const navigate = useNavigate();
    const { logOut, user, setShowRighNav, showRighNav } = useUserContext();
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleLogOut = () => {
        navigate("/");
        logOut();
    };

    return (
        <header className="flex items-center min-h-[72px] border-gray-300 justify-between w-full px-4 bg-primary-600 text-white ">
            <div className="flex items-center space-x-6">
                <Link
                    to="dashboard"
                    className="text-2xl font-bold text-white hover:text-primary-200 transition-colors"
                >
                    <span className="xs:hidden">MN</span>
                    <span className="hidden xs:block">MueblesNova</span>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative z-50">
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="flex items-center gap-2 text-white hover:bg-primary-700 px-4 py-2 font-medium text-lg transition-all rounded-md"
                    >
                        <span>{user?.name}</span>
                        <IoMdArrowDropdown className="text-xl" />
                    </button>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-48 shadow-lg flex flex-col bg-white text-primary-700 rounded-md z-50">
                            <Link
                                to="profile"
                                className="px-4 py-2 flex gap-2 items-center font-medium hover:bg-gray-300  transition-all duration-300 rounded-md"
                            >
                                <div className="bg-white rounded-full p-2 h-9 w-9 flex items-center justify-center">
                                    <FaUser className="text-primary-500 " />
                                </div>
                                Perfil
                            </Link>
                            <button
                                onClick={handleLogOut}
                                className="px-4 py-2 flex gap-2 items-center font-medium hover:bg-gray-300 transition-all duration-300 rounded-md"
                            >
                                <div className="bg-white rounded-full p-2 h-9 w-9 flex items-center justify-center">
                                    <TbLogout className="text-red-500 text-3xl" />
                                </div>
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>

                <button
                    className="lg:hidden text-3xl hover:text-black transition-all duration-300"
                    onClick={() => setShowRighNav(!showRighNav)}
                >
                    <MdMenu />
                </button>
            </div>
        </header>
    );
};

export default ProtectedHeader;
