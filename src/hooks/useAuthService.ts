import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthResponse, LoginUser, RegisterUser, ChangePassword,  VerifyResponse, User, ChangeCurrentPassword, AccountFormData } from "../types";
import * as AuthService from "../services/authService"

export type FormEmail= {
    email:string
}
export const useRegisterUser = () => {
    return useMutation<AuthResponse, Error, RegisterUser>({
        mutationFn: AuthService.registerUser,
    });
};
export const useAuthenticationUser = () => {
    return useMutation<User, Error, LoginUser>({
        mutationFn: AuthService.authenticateUser,
    });
};
export const useVerifyAccount = () => {
    return useMutation<VerifyResponse, Error, string>({
        mutationFn: AuthService.verifyAccount,
    });
};
export const useRequestVerification = () => {
    return useMutation<VerifyResponse, { verify: boolean, message: string}, string>({
        mutationFn: AuthService.requestVerification,
    });
};
export const useRequestChangePassword = () => {
    return useMutation<VerifyResponse, Error, string>({
        mutationFn: AuthService.requestChangePassword,
    });
};
export const useChangePassword = () => {
    return useMutation<AuthResponse, Error, ChangePassword>({
        mutationFn: AuthService.changePassword,
    });
};
export const useUpdateProfile = () => {
    return useMutation<AuthResponse, Error, AccountFormData>({
        mutationFn: AuthService.updateProfile,
    });
};
export const useChangeCurrentPassword = () => {
    return useMutation<AuthResponse, Error, ChangeCurrentPassword>({
        mutationFn: AuthService.changeCurrentPassword,
    });
};
export const useVerifyToken =( token: string) => {
    return useQuery<VerifyResponse,Error>({
        queryKey: ["token",token],
        queryFn:()=> AuthService.verifyToken(token),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['Nova_User'],
        queryFn: AuthService.getUser,
        retry: 1,   
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}