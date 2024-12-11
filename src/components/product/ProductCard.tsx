import React, { useState } from "react";
import AddCartModal from "./AddCartModal";
import { Product } from "../../types";
import { Link } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = () => {
        setShowModal(true);
    };

    const firstVariationPrice =
        product.variations && product.variations[0]?.price;

    return (
        <div className="relative border p-4 rounded-lg shadow-lg">
            <div className="bg-white rounded-lg relative group">
                <img
                    src={product.images?.[0] || "/path/to/default/image.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-lg"
                />

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg opacity-100 group-hover:opacity-100 transition duration-300 md:opacity-0"
                >
                    Agregar al carrito
                </button>
            </div>

            <Link to={`${product._id}`} className="mt-2 hover:underline  text-lg font-semibold">
                {product.name}
            </Link>
            <p className="text-gray-500">{product.description}</p>
            <div className="mt-2">
                {firstVariationPrice ? (
                    <span className="text-xl font-bold">
                        S/{firstVariationPrice.toFixed(2)}
                    </span>
                ) : (
                    <span className="text-xl font-bold">
                        Sin precio disponible
                    </span>
                )}
            </div>

            {showModal && (
                <AddCartModal
                    product={product}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;
