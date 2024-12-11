import { isAxiosError } from "axios";
import { AuthResponse, LoginUser, RegisterUser, ChangePassword,  VerifyResponse, User, ChangeCurrentPassword, AccountFormData } from "../types";
import { clientApi } from "./api";

export const registerUser = async (userData: RegisterUser): Promise<AuthResponse> => {
    try {
        const { data } = await clientApi.post<AuthResponse>("/auth/register", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    }
};
export const authenticateUser = async (userData: LoginUser): Promise<User> => {
    try {
        const { data } = await clientApi.post<User>("/auth/login", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    }
};
export const verifyAccount = async (token:string) :Promise<VerifyResponse>=>{
    try {
        const { data } = await clientApi.post<VerifyResponse>(`/auth/verify-email`,{token});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const requestVerification = async (email:string) :Promise<VerifyResponse>=>{
    try {
        const { data } = await clientApi.post<VerifyResponse>(`/auth/resend-verification`,{email});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (isAxiosError(error) && error.response) {
                const { verify, message } = error.response.data;
                throw { verify, message }; 
            }
        }
        throw { verify: false, message: "Error desconocido" }; 
    } 
}
export const requestChangePassword = async (email:string) :Promise<VerifyResponse>=>{
    try {
        const { data } = await clientApi.post<VerifyResponse>(`/auth/forgot-password`,{email});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}

export const changePassword = async ({token,password}:ChangePassword) :Promise<AuthResponse>=>{
    try {
        const { data } = await clientApi.patch<AuthResponse>(`/auth/reset-password/${token}`,{password});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const updateProfile = async (formData:AccountFormData) :Promise<AuthResponse>=>{
    try {
        const { data } = await clientApi.patch<AuthResponse>(`/users/update-profile`,{...formData});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const changeCurrentPassword = async ({currentPassword,newPassword}:ChangeCurrentPassword) :Promise<AuthResponse>=>{
    try {
        const { data } = await clientApi.patch<AuthResponse>(`/auth/update-password`,{currentPassword,newPassword});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const verifyToken = async (token:string) :Promise<VerifyResponse>=>{
    try {
        const { data } = await clientApi.get<VerifyResponse>(`/auth/verify-token/${token}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}
export const getUser = async() :Promise <User> =>{ 
    try {
        const { data } = await clientApi.get<User>(`/auth/user`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    } 
}