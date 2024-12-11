import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/headers/MainHeader";
import MainFooter from "../components/footers/MainFooter";

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <MainHeader />
            <main className="flex-grow bg-gray-100">
                <Outlet />
            </main>
            <MainFooter />
        </div>
    );
};

export default MainLayout;
