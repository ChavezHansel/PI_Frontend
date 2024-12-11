import { isAxiosError } from "axios";
import { ChangeAvailability, Product, UpdateProduct } from "../types";
import { clientApi } from "./api";

export const getProductsByCategory = async (id:string) :Promise<Product[]>=>{
    try {
        const { data } = await clientApi.get<Product[]>(`/products/category/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getProductById= async (id:string) :Promise<Product>=>{
    try {
        const { data } = await clientApi.get<Product>(`/products/product/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getProducts = async () :Promise<Product[]>=>{
    try {
        const { data } = await clientApi.get<Product[]>(`/products/`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const changeAvailability = async ({id,isActive}:ChangeAvailability) :Promise<Product>=>{
    try {
        const { data } = await clientApi.patch<Product>(`/products/availability/${id}`,{
            isActive
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const createProduct = async (newProduct:FormData) :Promise<Product>=>{
    try {
        const { data } = await clientApi.post<Product>(`/products`,newProduct,{
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const deleteProduct = async (id:string) :Promise<string>=>{
    try {
        const { data } = await clientApi.delete<string>(`/products/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}

export const updateProduct = async ({updateProduct,id}:UpdateProduct) :Promise<Product>=>{
    try {
        const { data } = await clientApi.patch<Product>(`/products/${id}`,updateProduct,{
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}



