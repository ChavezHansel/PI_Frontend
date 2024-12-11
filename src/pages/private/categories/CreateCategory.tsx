import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateCategory } from "../../../hooks/useCategoryService";
import { Button } from "@material-tailwind/react";
import { FaBan, FaSave } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

const CreateCategory: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: createCategory } = useCreateCategory();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        const newCategory = { name, description };
        createCategory(newCategory, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                toast.success("Categoría creada exitosamente!");
                navigate("/protected/categories");
            },
            onError: (error) => {
                if (error) {
                    toast.error(error.message);
                    return;
                }
                toast.error("Error al crear la categoría");
            },
        });
    };

    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
                Crear Nueva Categoría
            </h2>
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
                        required
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

export default CreateCategory;
