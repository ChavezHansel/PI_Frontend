import React, { useState } from "react";
import {  FaHeart, FaBox, FaUser } from "react-icons/fa";
import InformationPersonal from "./profile/InformationPersonal";
import Favorites from "./profile/Favorites";
import Orders from "./profile/Orders";
import { useUserContext } from "../../hooks/useUserContext";
import { Navigate } from "react-router-dom";

const Perfil: React.FC = () => {
    const [activeTab, setActiveTab] = useState("information");
    const { user } = useUserContext();
    const renderTabContent = () => {
        switch (activeTab) {
            case "information":
                return <InformationPersonal />;
            case "favorites":
                return <Favorites />;
            case "orders":
                return <Orders />;
            default:
                return <InformationPersonal />;
        }
    };
    if (!user?._id) return <Navigate to={"/"} />;
    return (
        <div className="flex w-[95%] flex-col md:flex-row  bg-white max-w-[78rem] 2xl:max-w-[84rem] border border-gray-200 mx-auto my-4 justify-between  bg-gradient-to-r shadow-md">
            <div className="flex md:mb-0 flex-col w-full md:w-1/4  border-r border-b md:border-b-0">
                <button
                    className={`flex   items-center space-x-2 p-3 w-full transition-colors ${
                        activeTab === "information"
                            ? "bg-gray-800 text-white"
                            : "text-black hover:bg-primary-500 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("information")}
                >
                    <FaUser className="" />
                    <span>Information Personal</span>
                </button>
                <button
                    className={`flex   items-center border-y space-x-2 p-3 w-full  transition-colors ${
                        activeTab === "favorites"
                            ? "bg-gray-800 text-white"
                            : "text-black hover:bg-primary-500 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("favorites")}
                >
                    <FaHeart />
                    <span>Favoritos</span>
                </button>
                <button
                    className={`flex   items-center space-x-2 p-3 w-full  transition-colors ${
                        activeTab === "orders"
                            ? "bg-gray-800 text-white"
                            : "text-black hover:bg-primary-500 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("orders")}
                >
                    <FaBox />
                    <span>Pedidos</span>
                </button>
            </div>

            <div className="md:w-3/4 w-full h-full p-4 border-gray-200 ">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Perfil;
