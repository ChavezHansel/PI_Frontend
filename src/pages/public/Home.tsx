import React from "react";
import MainSection from "../../components/sections/MainSection";
import { FaTruck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import Img1 from "/src/images/1.png";
import { useGetTopCategories } from "../../hooks/useCategoryService";

const Home: React.FC = () => {
    const { data: topCategories } = useGetTopCategories();
    return (
        <>
            <MainSection
                title="Descanso, estilo y confort"
                description=" Encuentra los mejores muebles, colchones, almohadas y
                        camas para tu hogar, con opciones para recojo en tienda
                        o entrega a domicilio."
            />
            <div className="flex items-center flex-col px-4">
                <section className="my-6 bg-white shadow-sm py-14 max-w-[78rem] 2xl:max-w-[84rem] mx-auto ">
                    <div className="grid grid-rows-4 sm:grid-rows-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 mx-auto">
                        <div className="flex flex-col px-6 items-center relative after:hidden lg:after:block after:content-[''] after:h-[calc(100%+30px)] after:-top-3 after:absolute after:border-r after:border-black/20 after:right-0">
                            <FaTruck className="text-2xl mb-4" />
                            <h3 className="font-semibold">Entrega gratis</h3>
                            <p>En órdenes mayores a S/1000.00</p>
                        </div>
                        <div className="flex flex-col px-6 items-center relative after:hidden lg:after:block after:content-[''] after:h-[calc(100%+30px)] after:-top-3 after:absolute after:border-r after:border-black/20 after:right-0">
                            <FaArrowsRotate className="text-2xl mb-4" />
                            <h3 className="font-semibold">
                                Política de devoluciones
                            </h3>
                            <p>Devoluciones sin complicaciones.</p>
                        </div>
                        <div className="flex flex-col px-6 items-center relative after:hidden lg:after:block after:content-[''] after:h-[calc(100%+30px)] after:-top-3 after:absolute after:border-r after:border-black/20 after:right-0">
                            <FaHeadset className="text-2xl mb-4" />
                            <h3 className="font-semibold">
                                Atención personalizada
                            </h3>
                            <p>Asesoría para una compra ideal.</p>
                        </div>
                        <div className="flex flex-col px-6 items-center">
                            <MdOutlineSecurity className="text-2xl mb-4" />
                            <h3 className="font-semibold">Pago seguro</h3>
                            <p>TransAcciónes protegidas.</p>
                        </div>
                    </div>
                </section>
                <div className="max-w-[78rem] 2xl:max-w-[84rem] mx-auto">
                    <h2 className="text-primary-500 text-center font-semibold text-2xl md:text-4xl">
                        Elaborado con excelente material.
                    </h2>
                    <p className="text-xl mt-4 text-center">
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate velit imperdiet dolor
                        tempor tristique. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Aliquam quam ab suscipit
                        nulla eaque quisquam iusto error id corporis perferendis
                        eligendi, rem quo? Aperiam minima rem, officia est
                        veniam obcaecati!
                    </p>
                    <div className="grid mt-5 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>{" "}
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="py-2">
                                <img src={Img1} alt="Box 1" />
                            </div>
                            <div className="flex flex-col items-center">
                                <a
                                    href="ProductosDetalle.html"
                                    className="text-xl font-semibold "
                                >
                                    Cama Deluxe Para
                                </a>
                                <p className="font-semibold">S/ 1000.00</p>
                                <button className="px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-700 text-white   transition-all duration-500">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section id="productos" className="container mx-auto py-12 px-4">
                <h3 className="text-3xl font-semibold text-center mb-8">
                    Categorías Destacadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {topCategories &&
                        topCategories.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg shadow hover:shadow-lg transition hover:scale-105 overflow-hidden"
                            >
                                <a href={item._id}>
                                    <img
                                        src={item.image || Img1}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-xl font-bold">
                                            {item.name}
                                        </h4>
                                    </div>
                                </a>
                            </div>
                        ))}
                </div>
            </section>

            <section id="ofertas" className="bg-blue-50 py-12 px-4">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-semibold text-blue-600 mb-8">
                        Ofertas Especiales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array(3)
                            .fill(0)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition"
                                >
                                    <h4 className="text-xl font-bold text-blue-600 mb-4">
                                        Oferta {idx + 1}
                                    </h4>
                                    <p className="mb-4">
                                        Descuento exclusivo en nuestra línea
                                        premium de muebles.
                                    </p>
                                    <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
                                        Ver Oferta
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7804.751545660507!2d-76.89112587698494!3d-12.017630841772913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105e9bd9393c10d%3A0x6ce3f066d3184746!2sTOP%20DECOR%20MUEBLES!5e0!3m2!1ses-419!2spe!4v1733269376115!5m2!1ses-419!2spe"
                width="100%"
                height="500"
                loading="lazy"
            ></iframe>
        </>
    );
};

export default Home;
