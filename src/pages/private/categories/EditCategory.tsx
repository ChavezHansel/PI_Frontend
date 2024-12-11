import React, { useState, useEffect } from "react";
import {
    useGetCategoryById,
    useUpdateCategory,
} from "../../../hooks/useCategoryService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
import { Button } from "@material-tailwind/react";
import { FaBan, FaSave } from "react-icons/fa";

const EditCategory: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetCategoryById(id!);
    const { mutate: updateCategory } = useUpdateCategory();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description || "");
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateCategory(
            { name, description, _id: id! },
            {
                onSuccess: () => {
                    toast.success("Categoría actualizada correctamente!");
                    navigate("/protected/categories");
                },
                onError: (error) => {
                    if (error) {
                        toast.error(error.message);
                        return;
                    }
                    toast.error("Error al actualizar la categoría");
                },
            }
        );
    };

    if (isLoading)
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
    if (isError || !data) return <div>Error al cargar la categoría.</div>;

    return (
        <div className="max-w-md rounded-md ">
            <h2 className="text-2xl font-semibold mb-4">Editar Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={4}
                    />
                </div>

                <div className="flex justify-between gap-4 mt-10">
                    <Button
                        className="flex gap-2 items-center"
                        color="gray"
                        onClick={() => navigate("/protected/categories")}
                    >
                        <FaBan /> Cancelar
                    </Button>
                    <Button
                        className="flex gap-2 items-center"
                        type="submit"
                        color="green"
                    >
                        <FaSave /> Actualizar Categoria
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;
