import { useMutation, useQuery } from '@tanstack/react-query'
import * as CategoryService from '../services/categoryService'
import { Category } from '../types'
export const useGetCategories = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['categories-store'],
        queryFn: CategoryService.getCategoriesStore,
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useGetAllCategories = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: CategoryService.getCategories,
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useGetTopCategories = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['categories-store-top'],
        queryFn: CategoryService.getTopCategoriesStore,
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
export const useGetCategoryById = (id:string) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['category-by-id',id],
        queryFn:()=> CategoryService.getCategoryById(id),
        retry: 1,   
        refetchOnWindowFocus: false,
        enabled: !!id
    })

    return { data, isError, isLoading }
}
export const useUpdateCategory = () => {
    return useMutation<Category, Error, Category>({
        mutationFn: CategoryService.updateCategory,
    });
};
export const useCreateCategory = () => {
    return useMutation<Category, Error, Category>({
        mutationFn: CategoryService.createCategory,
    });
};
export const useDeleteCategory = () => {
    return useMutation<string, Error,string>({
        mutationFn: CategoryService.deleteCategory,
    });
};