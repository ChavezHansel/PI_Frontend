import { isAxiosError } from "axios";
import { Category } from "../types";
import { clientApi } from "./api";

export const createCategory = async (category:Category) :Promise<Category>=>{
    try {
        const { data } = await clientApi.post<Category>(`/categories/`,category);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const deleteCategory = async (id:string) :Promise<string>=>{
    try {
        const { data } = await clientApi.delete<string>(`/categories/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const updateCategory = async (body:Category) :Promise<Category>=>{
    try {
        const { data } = await clientApi.patch<Category>(`/categories/${body._id}`,body);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getCategoryById= async (id:string) :Promise<Category>=>{
    try {
        const { data } = await clientApi.get<Category>(`/categories/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getCategoriesStore = async () :Promise<Category[]>=>{
    try {
        const { data } = await clientApi.get<Category[]>(`/categories/store`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getCategories = async () :Promise<Category[]>=>{
    try {
        const { data } = await clientApi.get<Category[]>(`/categories`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getTopCategoriesStore = async () :Promise<Category[]>=>{
    try {
        const { data } = await clientApi.get<Category[]>(`/categories/top`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}