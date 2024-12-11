import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../../../hooks/useProductService";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProductById(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin border-t-4 border-blue-600 w-12 h-12 border-solid rounded-full"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                <p>Producto no encontrado.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {data.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{data.description}</p>
            <img
                src={data.images[0]}
                alt={data.name}
                className="w-full max-w-md mx-auto rounded-lg shadow-md mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Variaciones:
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {data.variations.map((variation) => (
                    <li
                        key={variation._id}
                        className="flex justify-between items-center"
                    >
                        <span>
                            {variation.color} ({variation.size})
                        </span>
                        <span className="text-sm text-gray-500">
                            - ${variation.price}
                        </span>
                        <span className="text-sm text-green-600">
                            Stock: {variation.stock}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetails;
