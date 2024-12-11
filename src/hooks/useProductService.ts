import { useMutation, useQuery } from '@tanstack/react-query'
import * as     ProductService from '../services/productService'
import { ChangeAvailability, Product, UpdateProduct } from '../types'
export const useGetProducts = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: ProductService.getProducts,
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useGetProductsByCategory = (id:string) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['products-by-category',id],
        queryFn:()=> ProductService.getProductsByCategory(id),
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useGetProductById = (id:string) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['product-by-id',id],
        queryFn:()=> ProductService.getProductById(id),
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useChangeAvailability = () => {
    return useMutation<Product, Error, ChangeAvailability>({
        mutationFn: ProductService.changeAvailability,
    });
};
export const useCreateProduct = () => {
    return useMutation<Product, Error, FormData>({
        mutationFn: ProductService.createProduct,
    });
};
export const useDeleteProduct = () => {
    return useMutation<string, Error, string>({
        mutationFn: ProductService.deleteProduct,
    });
};
export const useUpdateProduct = () => {
    return useMutation<Product, Error, UpdateProduct>({
        mutationFn: ProductService.updateProduct,
    });
};