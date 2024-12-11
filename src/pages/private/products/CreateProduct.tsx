import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { FaSave, FaBan } from "react-icons/fa";
import { VariationCreate } from "../../../types";
import { TiDelete } from "react-icons/ti";
import { useGetAllCategories } from "../../../hooks/useCategoryService";
import { useCreateProduct } from "../../../hooks/useProductService";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const CreateProduct = () => {
    const navigate = useNavigate();
    const { data: categories } = useGetAllCategories();
    const queryClient = useQueryClient();
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: "",
        images: [] as File[],
        variations: [{ color: "", size: "", price: 0, stock: 0 }],
        discount: 0,
        isActive: true,
        materials: [""] as string[],
        specifications: [{ key: "", value: "" }],
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        category: "",
        images: "",
        variations: "",
        materials: "",
    });
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const newErrors = {
            name: "",
            description: "",
            category: "",
            images: "",
            variations: "",
            materials: "",
        };
        if (!productData.name) newErrors.name = "El nombre es obligatorio.";
        if (!productData.description)
            newErrors.description = "La descripción es obligatoria.";
        if (!productData.category)
            newErrors.category = "Selecciona una categoría.";
        if (productData.images.length === 0)
            newErrors.images = "Agrega al menos una imagen.";
        if (productData.variations.length <= 0) {
            newErrors.variations = "Agrega una variación";
        }
        if (
            productData.variations.some(
                (v) =>
                    v.color == "" ||
                    v.size == "" ||
                    v.price == 0 ||
                    v.stock == 0
            )
        ) {
            newErrors.variations =
                "Todas las variaciones deben tener color, tamaño, precio y stock.";
        }
        if (productData.materials.length === 0)
            newErrors.materials = "Agrega al menos un material.";

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...Array.from(files)],
            }));
        }
    };

    const handleRemoveImage = (index: number) => {
        setProductData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };
    const handleMaterialChange = (index: number, value: string) => {
        const updatedMaterials = [...productData.materials];
        updatedMaterials[index] = value;
        setProductData((prevData) => ({
            ...prevData,
            materials: updatedMaterials,
        }));
    };

    const handleAddMaterial = () => {
        setProductData((prevData) => ({
            ...prevData,
            materials: [...prevData.materials, ""],
        }));
    };
    const handleRemoveMaterial = (index: number) => {
        const updatedMaterials = productData.materials.filter(
            (_, i) => i !== index
        );
        setProductData((prevData) => ({
            ...prevData,
            materials: updatedMaterials,
        }));
    };
    const handleRemoveSpecification = (index: number) => {
        const updatedSpecifications = productData.specifications.filter(
            (_, i) => i !== index
        );
        setProductData((prevData) => ({
            ...prevData,
            specifications: updatedSpecifications,
        }));
    };
    const handleAddSpecification = () => {
        setProductData((prevData) => ({
            ...prevData,
            specifications: [
                ...prevData.specifications,
                { key: "", value: "" },
            ],
        }));
    };
    const handleSpecificationChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: "key" | "value"
    ) => {
        const updatedSpecifications = [...productData.specifications];
        updatedSpecifications[index] = {
            ...updatedSpecifications[index],
            [field]: e.target.value,
        };

        setProductData((prevData) => ({
            ...prevData,
            specifications: updatedSpecifications,
        }));
    };
    const handleVariationChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: keyof VariationCreate
    ) => {
        const updatedVariations: VariationCreate[] = [
            ...productData.variations,
        ];

        updatedVariations[index] = {
            ...updatedVariations[index],
            [field]:
                field === "price" || field === "stock"
                    ? Number(e.target.value)
                    : e.target.value,
        };

        setProductData((prevData) => ({
            ...prevData,
            variations: updatedVariations,
        }));
    };
    const handleAddVariation = () => {
        setProductData((prevData) => ({
            ...prevData,
            variations: [
                ...prevData.variations,
                { color: "", size: "", price: 0, stock: 0 },
            ],
        }));
    };
    const handleRemoveVariation = (index: number) => {
        const updatedVariations = productData.variations.filter(
            (_, i) => i !== index
        );
        setProductData((prevData) => ({
            ...prevData,
            variations: updatedVariations,
        }));
    };
    const { mutate: createProduct } = useCreateProduct();
    const handleSaveProduct = async () => {
        if (!validateFields()) {
            return;
        }
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("category", productData.category);
        formData.append("discount", String(productData.discount));
        formData.append("isActive", String(productData.isActive));

        productData.images.forEach((file) => {
            formData.append("images", file);
        });

        productData.materials.forEach((material, index) => {
            formData.append(`materials[${index}]`, material);
        });

        productData.specifications.forEach((spec, index) => {
            formData.append(`specifications[${index}][key]`, spec.key);
            formData.append(`specifications[${index}][value]`, spec.value);
        });

        productData.variations.forEach((variation, index) => {
            formData.append(`variations[${index}][color]`, variation.color);
            formData.append(`variations[${index}][size]`, variation.size);
            formData.append(
                `variations[${index}][price]`,
                String(variation.price)
            );
            formData.append(
                `variations[${index}][stock]`,
                String(variation.stock)
            );
        });

        createProduct(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["products"] });
                toast.success("Producto creado correctamente.");
                navigate("/protected/products");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };
    return (
        <div className="mx-auto bg-white rounded-lg ">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Agregar Producto
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="mt-1 w-full px-2 py-1 border border-gray-400 outline-none rounded-md"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="mt-1 w-full px-2 py-1 border border-gray-400 outline-none rounded-md"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="min-w-[190px] md:min-w-[270px]">
                        <label className="block text-sm  font-medium text-gray-700">
                            Categoría
                        </label>
                        <select
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-400 outline-none px-2 py-1 rounded-md"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories &&
                                categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm">
                                {errors.category}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estado
                        </label>
                        <div className="flex gap-4">
                            <Button
                                color={productData.isActive ? "green" : "red"}
                                onClick={() =>
                                    setProductData((prevData) => ({
                                        ...prevData,
                                        isActive: !prevData.isActive,
                                    }))
                                }
                            >
                                {productData.isActive ? "Activo" : "Inactivo"}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descuento (%)
                        </label>
                        <input
                            type="number"
                            name="discount"
                            min={0}
                            max={70}
                            value={productData.discount}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-400 outline-none px-2 py-1 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Imágenes
                    </label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1 w-full border  border-gray-400 outline-none px-2 py-1 rounded-md"
                    />
                    {errors.images && (
                        <p className="text-red-500 text-sm">{errors.images}</p>
                    )}

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <TiDelete size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Variaciones
                    </label>

                    {productData.variations.map((variation, index) => (
                        <div
                            key={index}
                            className="w-full mb-4 border md:border-0 border-gray-500 rounded-md p-4 md:p-0"
                        >
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <button
                                    color="red"
                                    className="text-2xl hidden w-2/12 md:flex items-center justify-center  hover:text-red-600 transition-all "
                                    onClick={() => handleRemoveVariation(index)}
                                >
                                    <TiDelete />
                                </button>
                                <Input
                                    type="text"
                                    name="color"
                                    value={variation.color}
                                    onChange={(e) =>
                                        handleVariationChange(e, index, "color")
                                    }
                                    placeholder="Color"
                                    size="md"
                                    label="Color"
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                />
                                <Input
                                    type="text"
                                    name="size"
                                    value={variation.size}
                                    onChange={(e) =>
                                        handleVariationChange(e, index, "size")
                                    }
                                    placeholder="Tamaño"
                                    label="Tamaño"
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                />
                                <Input
                                    type="number"
                                    name="price"
                                    min={0}
                                    value={variation.price}
                                    onChange={(e) =>
                                        handleVariationChange(e, index, "price")
                                    }
                                    placeholder="Precio"
                                    label="Precio"
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                />
                                <Input
                                    type="number"
                                    name="stock"
                                    min={0}
                                    value={variation.stock}
                                    onChange={(e) =>
                                        handleVariationChange(e, index, "stock")
                                    }
                                    placeholder="Stock"
                                    label="Stock"
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                />
                                <button
                                    color="red"
                                    className="text-white py-1.5 md:hidden flex items-center justify-center bg-red-300 border border-red-500 rounded-md duration-300 hover:bg-red-600 transition-all "
                                    onClick={() => handleRemoveVariation(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {errors.variations && (
                        <p className="text-red-500 text-sm">
                            {errors.variations}
                        </p>
                    )}
                    <Button color="blue" size="sm" onClick={handleAddVariation}>
                        Agregar Variación
                    </Button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Materiales
                    </label>
                    {productData.materials.map((material, index) => (
                        <div
                            key={index}
                            className="w-full mb-4 border md:border-0 border-gray-500 rounded-md p-4 md:p-0"
                        >
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <button
                                    color="red"
                                    className="text-2xl hidden md:w-12 md:flex items-center justify-center  hover:text-red-600 transition-all "
                                    onClick={() => handleRemoveMaterial(index)}
                                >
                                    <TiDelete />
                                </button>

                                <Input
                                    type="text"
                                    label="Material"
                                    className="w-full"
                                    value={material}
                                    onChange={(e) =>
                                        handleMaterialChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                    placeholder="Material"
                                />
                                <button
                                    color="red"
                                    className="text-white py-1.5 md:hidden flex items-center justify-center bg-red-300 border border-red-500 rounded-md duration-300 hover:bg-red-600 transition-all "
                                    onClick={() => handleRemoveMaterial(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {errors.materials && (
                        <p className="text-red-500 text-sm">
                            {errors.materials}
                        </p>
                    )}
                    <Button color="blue" size="sm" onClick={handleAddMaterial}>
                        Agregar Material
                    </Button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Especificaciones
                    </label>
                    {productData.specifications.map((spec, index) => (
                        <div
                            key={index}
                            className="w-full mb-4 border md:border-none border-gray-500 rounded-md p-4 md:p-0"
                        >
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <button
                                    color="red"
                                    className="text-2xl hidden md:w-14 md:flex items-center justify-center  hover:text-red-600 transition-all "
                                    onClick={() =>
                                        handleRemoveSpecification(index)
                                    }
                                >
                                    <TiDelete />
                                </button>
                                <Input
                                    type="text"
                                    value={spec.key}
                                    onChange={(e) =>
                                        handleSpecificationChange(
                                            e,
                                            index,
                                            "key"
                                        )
                                    }
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                    label="Especificación"
                                    placeholder="Especificación"
                                />
                                <Input
                                    type="text"
                                    value={spec.value}
                                    label="Valor de Especificación"
                                    onChange={(e) =>
                                        handleSpecificationChange(
                                            e,
                                            index,
                                            "value"
                                        )
                                    }
                                    containerProps={{
                                        className:
                                            "min-w-[190px] md:min-w-[100px]",
                                    }}
                                    placeholder="Valor de Especificación"
                                />
                                <button
                                    color="red"
                                    className="text-white py-1.5 md:hidden flex items-center justify-center bg-red-300 border border-red-500 rounded-md duration-300 hover:bg-red-600 transition-all "
                                    onClick={() =>
                                        handleRemoveSpecification(index)
                                    }
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <Button
                        color="blue"
                        size="sm"
                        onClick={handleAddSpecification}
                    >
                        Agregar Especificación
                    </Button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
                <Button
                    className="flex gap-2 items-center"
                    color="gray"
                    onClick={() => navigate("/protected/products")}
                >
                    <FaBan /> Cancelar
                </Button>
                <Button
                    className="flex gap-2 items-center"
                    onClick={handleSaveProduct}
                    color="green"
                >
                    <FaSave /> Guardar Producto
                </Button>
            </div>
        </div>
    );
};

export default CreateProduct;
