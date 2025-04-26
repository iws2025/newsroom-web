import axiosInstance from "./axiosInterceptor";
import { toast } from 'react-toastify';

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
            });
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
};

export const register = async ({ email, username, password, avatar }) => {
    try {
        const response = await axiosInstance.post("/auth/register", {
            email,
            username,
            password,
            avatar
        });
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
};