import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaHeadset, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainFooter: React.FC = () => {
    return (
        <footer className="bg-primary-600 text-white py-8">
            <div className="max-w-[78rem] flex-col 2xl:max-w-[84rem] mx-auto text-center md:flex-row flex items-center justify-around gap-10">
                <div className="text-center py-4">
                    <a
                        href="Index.html"
                        className="text-2xl md:text-3xl nav-link mb-4 font-semibold text-white inline-block"
                    >
                        Dayanara
                    </a>
                    <h4 className="text-xl md:text-2xl mb-0">Redes Sociales</h4>
                    <div className="text-3xl flex gap-2 mt-4 items-center justify-center">
                        <FaFacebookF />
                        <FaXTwitter />
                        <FaInstagram />
                    </div>
                </div>
                <div className=" py-4">
                    <h4 className="text-xl md:text-2xl">
                        Póngase en contacto con nosotros
                    </h4>
                    <div className="flex gap-2 mt-2 flex-col text-start ps-4 font-semibold">
                        <p className="py-1 px-3 m-0 flex gap-2 items-center justify-center md:justify-start">
                            <MdEmail />
                            <span> mueblesnova@gmail.com</span>
                        </p>
                        <p className="py-1 px-3 m-0 flex gap-2 items-center justify-center md:justify-start">
                            <FaPhoneAlt />
                            <span>+51 999 222 111</span>
                        </p>
                        <p className="py-1 px-3 m-0 flex gap-2 items-center justify-center md:justify-start">
                            <FaHeadset />
                            <span>Lun - Vie: 9am a 5pm</span>
                        </p>
                    </div>
                </div>
                <div className="py-4 ">
                    <h4 className="text-xl md:text-2xl">Enlaces Rapidos</h4>
                    <ul className="nav flex gap-2 mt-2 flex-col text-start ps-4 font-semibold">
                        <li>
                            <Link
                                to="/"
                                className="selected nav-link py-1 f-link hover:text-contrast-500 transition-all duration-500  
                                text-secundario"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"productos"}
                                className=" nav-link py-1 f-link hover:text-secundario transition-all duration-500"
                            >
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"nosotros"}
                                className=" nav-link py-1 f-link hover:text-secundario transition-all duration-500"
                            >
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"contactanos"}
                                className=" nav-link py-1 f-link hover:text-secundario transition-all duration-500"
                            >
                                Contáctanos
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
