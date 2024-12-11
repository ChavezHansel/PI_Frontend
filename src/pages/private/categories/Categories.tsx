import React from "react";
import { useGetAllCategories } from "../../../hooks/useCategoryService";
import { OrbitProgress } from "react-loading-indicators";
import { TbCategoryPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import CategoryTable from "../../../components/tables/CategoryTable";

const Categories: React.FC = () => {
    const { data, isLoading } = useGetAllCategories();
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
                    Categorias
                </h2>
                <Link
                    to={"create"}
                    className="bg-green-600 max-w-[200px] transition-all duration-300 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full lg:w-auto"
                >
                    <TbCategoryPlus /> Agregar Categoria
                </Link>
            </div>
            <CategoryTable data={data || []} />
        </div>
    );
};

export default Categories;
