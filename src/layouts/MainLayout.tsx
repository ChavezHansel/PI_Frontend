import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/headers/MainHeader";

const MainLayout: React.FC = () => {
    return (
        <>
            <MainHeader />
            <main className=" ">
                <div className="">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default MainLayout;
