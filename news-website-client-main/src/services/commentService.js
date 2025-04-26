import axiosInstance from "./axiosInterceptor";
import { toast } from 'react-toastify';

export const createComment = async ({
    newsId,
    content, 
    replyTo
}) => {
    try {
        const response = await axiosInstance.post(`/comments/${newsId}`, {
            content, 
            replyTo
        });
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
}

export const editComment = async ({
    commentId,
    content, 
}) => {
    try {
        const response = await axiosInstance.put(`/comments/${commentId}`, {
            content, 
        });
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
}

export const deleteComment = async (
    commentId,
) => {
    try {
        const response = await axiosInstance.delete(`/comments/${commentId}`);
        return response;
    } catch (error) {
        toast.error(error?.message);
        console.error(error);
    }
}