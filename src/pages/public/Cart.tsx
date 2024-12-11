import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";

const Cart: React.FC = () => {
    const cartContext = useContext(CartContext);
    if (!cartContext) return null;
    const { cart, removeFromCart, updateQuantity } = cartContext;

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) =>
                total + item.selectedVariation.price * item.quantity,
            0
        );
    };
    return (
        <div className="max-w-[1200px] mx-auto p-3 md:p-6">
            <h2 className="text-2xl font-semibold mb-6">Carrito de Compras</h2>
            {cart&& cart.length === 0 ? (
                <p className="text-gray-500">No hay productos en el carrito</p>
            ) : (
                <div className="flex gap-2 flex-col lg:flex-row justify-start items-start">
                    <div className="overflow-auto w-full scroll-x">
                        <ul className="w-full min-w-[700px]">
                            <div className="flex items-center text-center font-semibold uppercase text-sm border-y border-black py-1">
                                <p className="w-4/12">Productos</p>
                                <p className="w-1/12">Color</p>
                                <p className="w-2/12">Tamaño</p>
                                <p className="w-2/12">Precio</p>
                                <p className="w-2/12">Cantidad</p>
                                <p className="w-1/12">Total</p>
                                <p className="w-10"></p>
                            </div>
                            {cart.map((item) => (
                                <li
                                    key={item.product._id + item.selectedVariation._id}
                                    className="flex items-center w-full justify-between py-1.5 border-b border-black text-sm"
                                >
                                    <div className="w-4/12 flex items-center gap-2">
                                        <img
                                            src={
                                                item.product.images&&item.product.images[0] ||
                                                "/path/to/default/image.jpg"
                                            }
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded border overflow-hidden"
                                        />
                                        <p className="font-semibold">
                                            {item.product.name}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 w-1/12 text-center">
                                        {item.selectedVariation.color}
                                    </p>
                                    <p className="text-gray-500 w-2/12 text-center">
                                        {item.selectedVariation.size}
                                    </p>
                                    <p className="text-gray-500 w-2/12 text-center">
                                        S/
                                        {item.selectedVariation.price.toFixed(
                                            2
                                        )}
                                    </p>
                                    <div className="flex items-center gap-2 justify-center w-2/12 text-center">
                                        <button
                                            className="w-6 h-6 flex items-center justify-center text-xl disabled:bg-gray-300 bg-gray-300 text-black transition-all duration-300 hover:bg-gray-400 rounded"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product._id,
                                                    item.selectedVariation._id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="w-6 h-6 flex items-center justify-center text-xl bg-gray-300 text-black transition-all duration-300 hover:bg-gray-400 rounded"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product._id,
                                                    item.selectedVariation._id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-gray-500 w-1/12 text-center">
                                        S/
                                        {(
                                            item.selectedVariation.price *
                                            item.quantity
                                        ).toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() =>
                                            removeFromCart(
                                                item.product._id,
                                                item.selectedVariation._id
                                            )
                                        }
                                        className="text-red-500 hover:text-red-700 w-10 text-center flex items-center justify-center"
                                    >
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className=" flex flex-col w-full md:min-w-[280px] lg:max-w-[280px] sm:justify-start sm:items-start bg-gray-200 p-4 rounded-lg">
                        <p className="text-xl font-semibold">Total:</p>
                        <p className="text-2xl font-semibold mt-2 sm:mt-0 sm:text-right">
                            S/{calculateTotal().toFixed(2)}
                        </p>
                        <button className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition mt-4 sm:mt-0">
                            Proceder al pago
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
