import React from "react";
import { Link } from "react-router-dom";
import Fondo from "/src/images/cama-fondo.png";

type MainSectionProps = {
    title: string;
    description: string;
};
const MainSection: React.FC<MainSectionProps> = ({ title, description }) => {
    return (
        <section className="relative bg-primary-600 text-white">
            <div className="max-w-[78rem] 2xl:max-w-[84rem] mx-auto flex flex-col-reverse gap-4 lg:flex-row items-center py-5 md:py-12 px-4">
                <div className="lg:w-1/3 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:text-5xl">
                        {title}
                    </h2>
                    <p className="mb-6 text-base md:text-lg text-white/60">
                        {description}
                    </p>
                    <Link
                        to="/productos"
                        className="px-6 py-3 bg-contrast-500  text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-contrast-600"
                    >
                        Comprar Ahora
                    </Link>
                </div>
                <div className="lg:w-2/3 flex items-center justify-end">
                    <img src={Fondo} alt="Muebles y más" />
                </div>
            </div>
        </section>
    );
};

export default MainSection;
