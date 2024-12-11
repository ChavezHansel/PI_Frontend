import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { CartItem, Product } from "../types";
import { useUserContext } from "../hooks/useUserContext";
import { updateCartBackend, getCartFromBackend } from "../services/cartService";

interface CartContextType {
    cart: CartItem[];
    addToCart: (
        product: Product,
        quantity: number,
        selectedVariation: CartItem["selectedVariation"]
    ) => void;
    removeFromCart: (productId: string, variationId: string) => void;
    updateQuantity: (
        productId: string,
        variationId: string,
        quantity: number
    ) => void;
}

const initialState = {
    cart: [],
    addToCart: () => null,
    removeFromCart: () => null,
    updateQuantity: () => null,
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext<CartContextType>(initialState);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { user } = useUserContext();
    const [cookies, setCookie] = useCookies(["cartNova"]);
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            return cookies.cartNova ? cookies.cartNova : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        const fetchCartFromBackend = async () => {
            if (user) {
                const cartFromBackend = await getCartFromBackend(user._id);
                setCart(cartFromBackend);
            }
        };

        fetchCartFromBackend();
    }, [user]);

    useEffect(() => {
        if (cart.length > 0) {
            setCookie("cartNova", JSON.stringify(cart), {
                path: "/",
                maxAge: 604800,
            });
        } else {
            setCookie("cartNova", "", { path: "/" });
        }

        if (user && cart.length>0) {
            updateCartBackend(user._id, cart);
        }
    }, [cart, setCookie, user]);

    const addToCart = (
        product: Product,
        quantity: number,
        selectedVariation: CartItem["selectedVariation"]
    ) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) =>
                    item.product._id === product._id &&
                    item.selectedVariation._id === selectedVariation._id
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product._id === product._id &&
                    item.selectedVariation._id === selectedVariation._id
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                          }
                        : item
                );
            } else {
                const {variations,category,...datos} = product;
                return [
                    ...prevCart,
                    {
                        product: { ...datos },
                        quantity,
                        selectedVariation,
                    },
                ];
            }
        });
    };

    const removeFromCart = (productId: string, variationId: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) =>
                    item.product._id !== productId ||
                    item.selectedVariation._id !== variationId
            );

            if (updatedCart.length === 0 && user) {
                setCookie("cartNova", "", { path: "/" });
                updateCartBackend(user._id, updatedCart);
            } else {
                setCookie("cartNova", JSON.stringify(updatedCart), {
                    path: "/",
                    maxAge: 2419200,
                });
            }

            return updatedCart;
        });
    
    };

    const updateQuantity = (
        productId: string,
        variationId: string,
        quantity: number
    ) => {
        setCart((prevCart) => {
            return prevCart.map((item) =>
                item.product._id === productId &&
                item.selectedVariation._id === variationId
                    ? { ...item, quantity }
                    : item
            );
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};
