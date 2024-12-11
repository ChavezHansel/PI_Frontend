import React from "react";
import { Category } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

type CategoryTableProps = {
    data: Category[];
};

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
    const navigate = useNavigate();
    const handleDeleteClick = async (
        categoryId: string,
        productCount: number
    ) => {
        if (productCount > 0) {
            toast.warning(
                "No se puede eliminar la categoría porque tiene productos asociados."
            );
        } else {
            navigate(`delete/${categoryId}`);
        }
    };
    return (
        <div className="w-full overflow-x-hidden">
            <div className="max-h-[600px] overflow-auto y-scroll border border-gray-300">
                <table className="bg-white w-full min-w-[600px] border-collapse shadow-md rounded-lg">
                    <thead className="bg-primary-600 text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">
                                Productos
                            </th>
                            <th className="w-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No se encontraron categorías.
                                </td>
                            </tr>
                        ) : (
                            data.map((category) => (
                                <tr
                                    key={category._id}
                                    className="border-b hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        <Link
                                            to={`/protected/categories/${category._id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {category.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                                        {category.description}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-800">
                                        {category.productCount}
                                    </td>
                                    <td className="w-auto text-sm">
                                        <div className="flex items-center justify-center w-full gap-2">
                                            <Link
                                                to={`edit/${category._id}`}
                                                className="px-0.5 py-1 text-xl"
                                            >
                                                <MdEdit />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        category._id!,
                                                        category.productCount ||
                                                            0
                                                    )
                                                }
                                                className="px-0.5 py-1 text-xl text-red-600"
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryTable;
