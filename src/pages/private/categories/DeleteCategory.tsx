import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../../../hooks/useCategoryService";
import { toast } from "react-toastify";

const DeleteCategory: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        mutate: deleteCategory,
        isPending,
        isError,
        isSuccess,
    } = useDeleteCategory();

    const handleDelete = async () => {
        if (id) {
            deleteCategory(id, {
                onSuccess: () => {
                    toast.success("Categoría eliminada exitosamente");
                    navigate("/protected/categories");
                },
                onError: (error) => {
                    if (error) {
                        toast.error(error.message);
                        return;
                    }
                    toast.error("Error al eliminar la categoría");
                },
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Eliminar Categoría</h2>
            <p>¿Estás seguro de que quieres eliminar esta categoría?</p>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => navigate("/protected/categories")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    disabled={isPending}
                >
                    {isPending ? "Eliminando..." : "Eliminar"}
                </button>
            </div>
            {isError && (
                <p className="text-red-500 mt-2">
                    Hubo un error al eliminar la categoría
                </p>
            )}
            {isSuccess && (
                <p className="text-green-500 mt-2">
                    Categoría eliminada exitosamente
                </p>
            )}
        </div>
    );
};

export default DeleteCategory;
