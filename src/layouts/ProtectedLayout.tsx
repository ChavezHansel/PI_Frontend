import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedHeader from "../components/headers/ProtectedHeader";
import NavBarAdmin from "../components/navs/NavBarAdmin";

const ProtectedLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ProtectedHeader />
            <main className="flex flex-1 bg-white relative">
                <NavBarAdmin />
                <div className="border-l border-gray-700 flex-1 w-full overflow-y-auto scroll-thin scrolly max-h-[calc(100vh-72px)] max-w-full p-2 sm:p-4 md:p-6 overflow-auto bg-gradient-to-br  ">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ProtectedLayout;
