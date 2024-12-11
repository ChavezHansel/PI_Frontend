import React from "react";
import ProductTable from "../../../components/tables/ProductTable";
import { useGetProducts } from "../../../hooks/useProductService";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import { OrbitProgress } from "react-loading-indicators";

const ProductsProtected: React.FC = () => {
    const { data, isLoading } = useGetProducts();
    if (isLoading) {
        return (
            <div className="flex flex-1 justify-center mt-4">
                <OrbitProgress
                    size={"medium"}
                    color="#2460E2"
                    text=""
                    textColor=""
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 justify-between flex-col sm:flex-row mb-4">
                <h2 className="text-xl md:text-2xl  font-semibold  text-black">
                    Productos
                </h2>
                <Link
                    to={"create"}
                    className="bg-green-600 max-w-[200px] transition-all duration-300 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full lg:w-auto"
                >
                    <FaBoxes /> Agregar Producto
                </Link>
            </div>
            <ProductTable data={data || []} />
        </div>
    );
};

export default ProductsProtected;
