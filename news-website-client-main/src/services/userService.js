import axiosInstance from "./axiosInterceptor";
import { toast } from 'react-toastify';

export const getProfile = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
}

export const updateProfile = async ({
    userId,
    username,
    password,
    description,
    avatar
}) => {
    try {
        const response = await axiosInstance.put(`/users/${userId}`, {
            username,
            password,
            description,
            avatar
        });
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
}