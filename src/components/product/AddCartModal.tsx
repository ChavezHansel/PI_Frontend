import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types";

interface ModalProps {
    product: Product;
    closeModal: () => void;
}

const AddCartModal: React.FC<ModalProps> = ({ product, closeModal }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedVariation, setSelectedVariation] = useState(
        product.variations[0] || null
    );

    useEffect(() => {
        const item = cart.find(
            (item) =>
                item.product._id === product._id &&
                item.selectedVariation._id === selectedVariation?._id
        );
        if (item) {
            setQuantity(item.quantity);
        }
    }, [cart, product._id, selectedVariation]);

    const handleAddToCart = () => {
        const existingItem = cart.find(
            (item) =>
                item.product._id === product._id &&
                item.selectedVariation._id === selectedVariation?._id
        );

        if (existingItem) {
            updateQuantity(product._id, selectedVariation?._id, quantity);
        } else {
            addToCart(product, quantity, selectedVariation);
        }
        closeModal();
    };

    const uniqueColors = Array.from(
        new Set(product.variations.map((variation) => variation.color))
    );

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeModal();
                }
            }}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg md:p-6 md:shadow-lg relative
                           w-full h-full flex flex-col justify-center sm:max-w-[300px] sm:h-auto sm:rounded-lg"
            >
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={closeModal}
                >
                    <IoMdClose className="text-3xl hover:text-black transition-all duration-300" />
                </button>
                <div className="text-center">
                    <img
                        src={product.images?.[0] || "/path/to/default/image.jpg"}
                        alt={product.name}
                        className="w-32 h-32 mx-auto"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-500">
                        S/{selectedVariation?.price.toFixed(2)}
                    </p>
                </div>

                <div className="mt-4">
                    <div>
                        <label htmlFor="color" className="block text-sm">
                            Color
                        </label>
                        <select
                            id="color"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={selectedVariation?.color}
                            onChange={(e) => {
                                const newVariation = product.variations.find(
                                    (v) => v.color === e.target.value
                                );
                                setSelectedVariation(newVariation || product.variations[0]);
                                setQuantity(1); 
                            }}
                        >
                            {uniqueColors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="size" className="block text-sm">
                            Tamaño
                        </label>
                        <select
                            id="size"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={selectedVariation?.size}
                            onChange={(e) => {
                                const newVariation = product.variations.find(
                                    (v) =>
                                        v.size === e.target.value &&
                                        v.color === selectedVariation?.color
                                );
                                setSelectedVariation(newVariation || product.variations[0]);
                                setQuantity(1); 
                            }}
                        >
                            {product.variations
                                .filter(
                                    (variation) =>
                                        variation.color === selectedVariation?.color
                                )
                                .map((variation) => (
                                    <option
                                        key={variation._id}
                                        value={variation.size}
                                    >
                                        {variation.size}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Math.max(1, +e.target.value))
                        }
                        className="mx-2 w-12 text-center border rounded-lg"
                    />
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default AddCartModal;

