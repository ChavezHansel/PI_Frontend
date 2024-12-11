import { clientApi } from "./api";

export const updateCartBackend = async (userId: number, cart: any[]) => {
    try {
        await clientApi.post(`/cart/${userId}`, {
            cart,
        });
    } catch (error) {
    }
};
export const getCartFromBackend = async (userId: number) => {
    try {
        const {data} = await clientApi.get(`/cart/${userId}`);
        return data || []
    } catch (error) {
        return []; 
    }
};